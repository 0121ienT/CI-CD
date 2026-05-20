# Bài tập lớn — Mở rộng tính năng & CI/CD Auto-Deploy

> **Bối cảnh.** Mỗi nhóm tiếp tục đề tài học kỳ trước. Buổi học CI/CD + Docker giao thêm **3 tính năng mới** cho từng đề tài, và yêu cầu **chung** là phải thiết kế được CI/CD pipeline tự động deploy lên cloud được cung cấp.
>
> **Tiêu chí then chốt:** không chỉ "chạy được", mà phải **thiết kế cẩn thận** — chỉ rõ giả định, ràng buộc, threat model, latency budget, cách rollback, cách scale.

---

## 1. Yêu cầu CI/CD chung cho cả 4 nhóm

Pipeline được trigger trên mỗi `push` vào branch `main` của repo nhóm. Pipeline phải có đủ các bước sau (gợi ý dùng GitHub Actions hoặc Jenkins — chọn 1 và bảo vệ được lựa chọn):

| Stage | Yêu cầu | Fail-fast khi |
|---|---|---|
| **Lint & format** | Black/Ruff cho Python, ESLint cho JS/TS | code không đúng style |
| **Unit test** | Coverage ≥ 70% cho module logic chính | test fail hoặc coverage tụt |
| **Build image** | Multi-stage Dockerfile, image cuối < 800 MB, không chứa secret | image quá lớn / có secret |
| **Security scan** | `trivy image` hoặc `grype` quét CVE; chặn nếu có CVE HIGH chưa fix | có CVE HIGH/CRITICAL |
| **Push registry** | Push lên ECR (hoặc Docker Hub) với 2 tag: `:<git-sha>` và `:latest` | credential sai |
| **Integration test** | Compose lên DB/cache giả lập, gọi smoke test API thật | smoke test không 200 |
| **Deploy staging** | SSH/SSM vào EC2 staging, pull image, `docker compose up -d` | health check fail trong 60s |
| **Manual gate** | Approval qua GitHub Environment hoặc Jenkins `input` | không có ai approve |
| **Deploy prod** | Blue-green hoặc rolling update, có rollback tự động | health check prod fail |
| **Notify** | Gửi message (Discord/Slack/Telegram) khi deploy xong hoặc fail | — |

**Bắt buộc nộp kèm code:**

- Sơ đồ pipeline vẽ bằng **Excalidraw** (PNG/SVG) — chỉ rõ stage, artifact đi qua từng bước, secret store nằm ở đâu.
- File `THREAT-MODEL.md` ngắn: tối thiểu 5 mối đe doạ (vd token leak, image tampering, supply chain, DoS, data poisoning) + biện pháp giảm thiểu.
- File `ROLLBACK.md`: lệnh cụ thể để rollback về tag cũ trong < 2 phút.

---

## 2. Cloud được cung cấp

Mỗi nhóm được cấp:

- **1 EC2** `t3.large` (2 vCPU / 8 GB) — chạy app prod; nếu nhóm cần GPU (vd Hand Gesture realtime) → đăng ký trước để được cấp `g4dn.xlarge`.
- **1 EC2** `t3.medium` riêng làm staging.
- **ECR** private repo `<group>/app`.
- **S3 bucket** `<group>-artifacts` để lưu model `.pt`, log, backup.
- **RDS Postgres** `db.t3.micro` (nhóm 1, 2, 4) — nhóm 3 nếu cần thì xin thêm.
- **ElastiCache Redis** `cache.t3.micro` (nhóm 2, 4).
- **Domain test**: `<group>.<base-domain>` hoặc `IP:port` mở qua Security Group.

Tất cả tài nguyên gắn tag `Owner=<group>`, `Course=HIT-PYTHON-2026`. Nhóm phải tự stop EC2 ngoài giờ làm bài (có script kèm phần Notify).

---

## 3. Nhóm 1 — Phân loại cảm xúc (BTL-Nhom1)

**Repo hiện tại:** https://github.com/HIT-PYTHON-2026/BTL-Nhom1

**Hiện trạng tóm tắt:** ResNet (PyTorch) phân loại cảm xúc khuôn mặt + YOLOv8-nano detect mặt; FastAPI backend; frontend HTML/CSS/JS; có chế độ upload ảnh, livestream camera và mini-game.

### Tính năng 1 — Multi-modal Emotion Fusion (Face + Voice)

Bổ sung nhánh xử lý **âm thanh** song song với khuôn mặt: stream micro qua WebRTC → mô hình Speech Emotion Recognition (SER) — ví dụ `wav2vec2-emotion` — chạy trên window 2 giây có overlap 0.5 giây. Sau đó **fusion** với output của video stream để cho ra một "emotion score" hợp nhất kèm độ tin cậy.

**Ràng buộc bắt buộc thiết kế:**

- Đồng bộ timestamp giữa audio frame và video frame ≤ 100 ms (NTP-style hoặc theo wall clock client) — phải mô tả cách xử lý drift.
- So sánh **early fusion** (concat features trước classifier) với **late fusion** (weighted softmax) — chọn 1, giải thích pros/cons cho lớp.
- Khi 1 trong 2 modality bị thiếu (vd mic mute), pipeline vẫn phải trả kết quả với confidence điều chỉnh xuống — không crash.
- Latency end-to-end (mic input → fused emotion hiển thị) < **400 ms** ở P95.

### Tính năng 2 — Emotion Drift Monitoring + Online Retraining Loop

Mỗi prediction được log kèm confidence và embedding 128-d. Build **dashboard drift detection** (PSI hoặc KL-divergence theo tuần) so với phân phối lúc train. Khi PSI > ngưỡng → tự động:

1. Trích các sample confidence thấp vào `S3://<group>-artifacts/feedback/`.
2. Mở **review UI** cho người gắn nhãn lại.
3. Khi đủ N nhãn mới → trigger pipeline retrain (Airflow / GitHub Actions cron), train xong → push model lên **model registry** (MLflow self-host hoặc DVC).
4. Deploy **shadow** trên 10% traffic, so sánh metric với prod, nếu tốt hơn → promote.

**Ràng buộc bắt buộc thiết kế:**

- Vẽ data flow Excalidraw: từ inference log → drift score → retrain → shadow → promote. Có rõ điểm kill-switch.
- Schema feedback DB phải có audit trail: ai gắn nhãn, khi nào, lý do (chống poisoning).
- Phải có **canary metric** rõ: model mới chỉ promote khi accuracy không tụt > 1% trên holdout cố định.

### Tính năng 3 — Multi-tenant Analytics Dashboard

Cho phép tổ chức (trường, doanh nghiệp) đăng ký 1 **workspace**. Mỗi workspace có:

- Người dùng riêng (Admin / Member) với RBAC.
- Heatmap cảm xúc theo lớp / phòng / ca làm việc.
- Time-series xu hướng theo ngày / tuần với khả năng so sánh workspace của mình với benchmark ẩn danh toàn hệ thống.
- **Alert engine**: khi tỷ lệ "negative" trong 1 giờ vượt threshold do workspace tự cấu hình → gửi webhook.

**Ràng buộc bắt buộc thiết kế:**

- **Privacy:** không lưu ảnh khuôn mặt raw quá 7 ngày, chỉ giữ embedding đã hash + metadata. Mô tả cách xoá tự động (S3 lifecycle policy + cron).
- **Multi-tenancy:** chọn pattern (shared DB + tenant_id vs schema-per-tenant vs DB-per-tenant), bảo vệ lựa chọn theo chi phí và data isolation.
- Phải có integration test giả lập **2 workspace** truy vấn cùng lúc, đảm bảo không leak dữ liệu chéo.

---

## 4. Nhóm 2 — Hệ thống nhận diện biển số xe thông minh (Team2_Parking_Detection)

**Repo hiện tại:** https://github.com/HIT-PYTHON-2026/Team2_Parking_Detection

**Hiện trạng tóm tắt:** YOLOv8 detect xe + slot trống, dynamic calibration theo độ phân giải, FastAPI + Streamlit dashboard, có /health /detect /stream.

### Tính năng 1 — License Plate OCR + Vehicle Registry + Billing

Sau khi YOLOv8 detect xe, crop bounding box biển số → preprocess (perspective transform, deskew, denoise) → OCR (PaddleOCR hoặc EasyOCR fine-tune trên tập biển VN). Match kết quả vào DB xe đăng ký, tự động ghi log entry/exit, tính phí gửi theo bảng giá có thể cấu hình.

**Ràng buộc bắt buộc thiết kế:**

- Biển số VN có cả nhiều ký tự đặc thù (dấu chấm/gạch); phải có post-processing whitelist + Levenshtein đến top-K candidate trong DB.
- Chống **double-billing**: cùng xe quét nhiều khung liên tiếp chỉ tạo **1 session**. Mô tả state machine `ENTER → INSIDE → EXIT` với timeout và idempotency key.
- Phải xử lý ca khó: xe khuất một phần biển, biển hai hàng, ban đêm. Báo cáo thử nghiệm 50 ảnh khó tự chụp.
- Schema billing: `vehicle`, `session`, `rate_card`, `transaction` — kèm migration script.

### Tính năng 2 — Multi-camera Fusion + Cross-frame Vehicle Tracking

Nhiều camera quay cùng 1 bãi từ các góc khác nhau. Stream qua **message queue** (Redis Stream hoặc Kafka) thay vì gọi HTTP trực tiếp. Áp DeepSORT/ByteTrack để **track xuyên khung và xuyên camera**, không đếm trùng khi xe di chuyển giữa các zone.

**Ràng buộc bắt buộc thiết kế:**

- Đồng bộ camera qua NTP, sai số timestamp giữa các stream ≤ 50 ms; mô tả cách bù khi camera mất kết nối tạm thời.
- Calibration **world-coordinate**: map frame pixel về sơ đồ 2D của bãi (homography). Lập trình tool calibration ban đầu (click 4 điểm gốc).
- Backpressure: nếu downstream model chậm, queue không được phình > 5000 message → drop frame cũ nhất với policy rõ ràng.
- Throughput tối thiểu: 4 camera × 15 FPS xử lý song song trên 1 GPU `g4dn.xlarge`.

### Tính năng 3 — Predictive Availability + Slot Recommendation

Model time-series (XGBoost / Prophet / LSTM — chọn 1 và giải thích) dự đoán **độ trống của bãi** ở các mốc 15 / 30 / 60 phút tới, dựa trên lịch sử + thời tiết (API openweather) + sự kiện lân cận. App user query "Tôi đến sau X phút, bãi này còn không?" → trả về **xác suất + slot gợi ý gần lối ra**.

**Ràng buộc bắt buộc thiết kế:**

- Feature engineering: hour-of-day, day-of-week, holiday, rain, temperature, gần khu sự kiện không. Vẽ tầm quan trọng của feature.
- Model deployment có **versioning rõ**: nếu model mới predict lệch > 20% MAE trên 1 tuần đầu → tự rollback.
- Online evaluation: log mọi prediction kèm `predicted_at`, sau đó so với thực tế khi tới mốc → MAE chart trên dashboard.
- Latency query user < **150 ms** (cache hit), < 400 ms (cache miss).

---

## 5. Nhóm 3 — Hand Gesture (chưa có repo)

**Yêu cầu cốt lõi:** vì chưa có repo, nhóm phải bắt đầu từ Day 0 và bị chấm khắt khe hơn về **design doc** (`DESIGN.md` ≥ 8 trang) trước khi viết dòng code đầu tiên. Mỗi tính năng dưới đây phải có sơ đồ kiến trúc Excalidraw, bảng API, schema dữ liệu và threat model riêng.

### Tính năng 1 — Real-time Vietnamese Sign Language Translator (streaming)

Stream webcam → MediaPipe Holistic (hand + body + face keypoints) → temporal model (Transformer hoặc TCN encoder) → decoder dịch sang câu **tiếng Việt có ngữ pháp đúng** (không phải gloss từng từ) → optional TTS.

**Ràng buộc bắt buộc thiết kế (cố ý khó):**

- **Streaming, không phải batch:** dùng sliding window có overlap, beam search decoder. Phải định nghĩa "câu kết thúc khi nào" (boundary detection) — có thể dùng pause + chuyển trạng thái neutral pose.
- **Latency P95 < 300 ms** từ kết thúc gesture đến hiển thị câu dịch.
- **OOV & ambiguity:** khi confidence < ngưỡng, hiển thị top-3 candidate kèm câu mẫu, cho user xác nhận.
- **Đồng bộ multi-stream:** hand keypoint nhanh hơn face/body do nhẹ hơn → phải có buffer + alignment trước khi đưa vào temporal model.
- **Dataset:** không có dataset tiếng Việt chuẩn → bắt buộc tự thu ≥ 200 câu × 3 người ký + augment (rotation, time warp). Mô tả annotation guideline.
- **Evaluation:** ngoài accuracy phải báo BLEU-2 và **user study** ≥ 10 người không quen ngôn ngữ ký hiệu, đánh giá độ hiểu của câu dịch.

### Tính năng 2 — Multi-user Gesture Collaborative 3D Workspace (WebRTC + CRDT)

Nhiều user (mỗi người 1 webcam) cùng vào 1 phòng, dùng gesture để **xoay, scale, di chuyển, vẽ** trên các đối tượng 3D chung trong browser. KHÔNG truyền video — chỉ truyền **pose keypoint** giữa các client qua WebRTC DataChannel để tiết kiệm băng thông và bảo vệ riêng tư.

**Ràng buộc bắt buộc thiết kế (cố ý khó):**

- **Conflict resolution:** khi 2 user cùng "grab" 1 object cùng lúc, ai thắng? Phải dùng CRDT (Yjs/Automerge) hoặc OT, mô tả lý do chọn và minh hoạ ví dụ.
- **Gesture FSM:** mỗi tay có state machine `idle → tracking → engaged-pinch → drag → release`. Mô tả full state diagram, transition guard, debounce time.
- **UX rõ ràng:** user phải nhìn được tay nào của ai đang điều khiển object nào — thiết kế ghosted cursor 3D có màu theo user.
- **Network resilience:** khi 1 client lag > 200 ms, các client khác vẫn dùng được, state hội tụ trong < 1 giây sau khi client lag quay lại.
- **Scale test:** demo 4 user cùng phòng, FPS ≥ 30, RTT < 150 ms (LAN).
- **Security:** signed room token, gesture event có sequence number để chống replay.

### Tính năng 3 — Adaptive Gesture Authentication (Behavioral Biometrics + Anti-spoofing)

User "đăng ký gesture passphrase" cá nhân — chuỗi gesture 3–5 bước trong không gian 3D. Model học pattern theo người (Siamese network / metric learning, few-shot). Mỗi lần đăng nhập:

1. Liveness check chống ảnh / video replay (kiểm tra micro-motion, depth cue, blink).
2. Trích sequence keypoint → so với template lưu trong DB.
3. Nếu match nhưng có drift nhẹ → cập nhật template (continual learning, weighted average).

**Ràng buộc bắt buộc thiết kế (cố ý khó):**

- **Threat model rõ:** liệt kê ≥ 6 attacker scenario (replay video, deepfake, shoulder-surfing, đánh cắp template, model inversion, brute-force gesture phổ thông). Với mỗi scenario, có biện pháp giảm thiểu.
- **Template aging:** mô tả khi nào template được cập nhật, ai có quyền revoke, audit trail.
- **Fallback:** khi authentication thất bại 3 lần liên tiếp → lock + gửi cảnh báo qua email, mở fallback bằng OTP.
- **Fairness:** đánh giá False Acceptance Rate / False Rejection Rate trên ít nhất 3 nhóm người (giới tính, độ tuổi, tay thuận trái/phải).
- **Privacy:** template lưu **chỉ embedding đã encrypt at rest** (AES-256), key trong AWS KMS. Mô tả key rotation policy.
- **Performance:** một lần auth end-to-end < **1.5 giây**.

> **Note cho nhóm Hand Gesture:** vì 3 tính năng trên cố ý phức tạp, nhóm được phép **chọn 2/3** để làm sâu — nhưng phải **viết design doc cho cả 3**. Quyết định bỏ tính năng nào phải có lý do kỹ thuật rõ, không phải "thiếu thời gian".

---

## 6. Nhóm 4 — Fashion Visual Search Engine (image_retrieval)

**Repo hiện tại:** https://github.com/HIT-PYTHON-2026/image_retrieval (tên "VOGUE FIND")

**Hiện trạng tóm tắt:** ResNet50 → 2048-dim embedding → Milvus; PostgreSQL + MinIO; React frontend; có e-commerce features (cart, brand dashboard, RBAC).

### Tính năng 1 — Hybrid Text + Image Search bằng CLIP (Multi-modal)

User được phép kết hợp **ảnh + text** trong cùng 1 query, vd "ảnh áo này + 'màu xanh navy, ngắn tay hơn'". Swap ResNet50 → CLIP (ViT-B/32 hoặc lớn hơn), reindex toàn bộ Milvus với embedding mới. Hỗ trợ **weighting** giữa image và text, hỗ trợ **negation** ("không quá đắt") chuyển sang filter SQL.

**Ràng buộc bắt buộc thiết kế:**

- Migration: vì đổi model là đổi vector space → phải migrate Milvus collection mới song song với cũ, có cờ feature flag để A/B test trước khi cắt sang.
- Re-ranking pass 2: sau khi Milvus trả về top-100, áp **cross-encoder** rerank top-100 → top-10 (chậm hơn nhưng chính xác hơn).
- Latency: search end-to-end < **350 ms** ở P95, kể cả với rerank.
- Evaluation: report Recall@10, MRR trên một tập đánh giá ≥ 200 query có ground-truth tự build.
- Cost: ước tính chi phí mỗi 1000 request (embedding model + Milvus + rerank), trình bày ở DESIGN.md.

### Tính năng 2 — Federated Learning Personalized Recommendation

Lịch sử người dùng (browse, like, add-to-cart) train một **model nhỏ trên thiết bị** (ONNX runtime trên browser hoặc app). Client gửi **gradient/delta đã DP-noise** về server, server **federated average** thành model toàn cục. Không lưu raw behavior trên server.

**Ràng buộc bắt buộc thiết kế:**

- Model nhỏ: distill từ teacher (collaborative filtering hoặc two-tower) xuống student ≤ 5 MB.
- DP-SGD: chọn ε (privacy budget) cụ thể, giải thích trade-off accuracy vs privacy.
- **Anti-poisoning:** client update phải có chữ ký, server áp **Krum / Trimmed Mean** thay vì FedAvg thuần để chống malicious client.
- **Communication efficiency:** chỉ gửi top-k delta, dùng quantization int8.
- Evaluation: so AB-test recommendation từ federated model với baseline collaborative filtering tập trung trên ≥ 1 tuần.

### Tính năng 3 — Inventory-aware Re-ranking + Sponsored Slot Auction

Khi user search, ngoài similarity score, kết quả phải được **re-rank** theo:

- **Stock**: item gần hết được boost (tránh sold-out).
- **Margin**: profit cao hơn được boost vừa phải.
- **Brand bid**: slot 1, 3, 5 dành cho brand đấu giá; second-price auction.
- **Seasonal**: phù hợp mùa / sự kiện.
- **Diversity**: không hiển thị quá 3 item cùng brand trong top-10.

Đồng thời mở **brand dashboard** mới: brand thấy CTR, conversion theo slot, bid history minh bạch.

**Ràng buộc bắt buộc thiết kế:**

- Learning-to-rank: chọn LightGBM `LambdaRank` hoặc neural ranker; train trên click log có **counterfactual correction** (IPS hoặc DR).
- Feature store online: Redis hoặc Feast — features (stock, margin, bid) cập nhật < 1 giây từ khi đổi.
- Latency budget: similarity search + rerank + auction phải gói trong **200 ms** P95.
- Fairness: small brand (< 100 sales) phải được guaranteed exposure tối thiểu (vd 10% slot mỗi ngày).
- Explainability: hiển thị badge "Sponsored" rõ ràng + chi tiết "Vì sao lên top" trong brand dashboard.
- Revenue tracking: số tiền brand bid → DB billing → reconcile cuối tháng. Đảm bảo không double-charge khi user F5.

---

## 7. Quy trình làm việc & nộp bài

### Mốc thời gian (6 tuần)

| Tuần | Mục tiêu | Sản phẩm |
|---|---|---|
| 1 | Design doc | `DESIGN.md` mỗi tính năng, sơ đồ Excalidraw, threat model |
| 2 | Setup CI cơ bản + repo skeleton | Lint + unit test pass trên GitHub Actions/Jenkins |
| 3–4 | Implement 3 tính năng | Code + unit test, mỗi feature 1 PR |
| 5 | CI/CD hoàn chỉnh + deploy staging | Pipeline đầy đủ stage, deploy thành công lên staging |
| 6 | Deploy prod + demo | Live demo + báo cáo + retro |

### Cấu trúc nộp

Mỗi nhóm trên repo của mình:

```
/docs
  DESIGN.md
  THREAT-MODEL.md
  ROLLBACK.md
  pipeline-diagram.png
/ci
  .github/workflows/  hoặc Jenkinsfile
/src
  ... (code)
/scripts
  bootstrap-ec2.sh   (user-data setup cloud)
  rollback.sh
/tests
  unit/
  integration/
README.md (cập nhật)
```

PR cuối cùng mở từ `release/v1` → `main`, gắn label `[final-submission]`.

---

## 8. Tiêu chí chấm

| Hạng mục | Trọng số | Đạt khi |
|---|---|---|
| CI/CD pipeline đủ stage, có manual gate và rollback chứng minh được | 25% | Demo deploy thành công lên cloud được cấp + rollback < 2 phút |
| 3 tính năng mới hoạt động đúng spec | 45% (mỗi feature 15%) | Có test + demo + đáp ứng ràng buộc thiết kế |
| Chất lượng thiết kế (design doc, threat model, sơ đồ, schema) | 15% | Design doc đủ chi tiết, có alternatives + lý do chọn |
| Báo cáo & demo live | 10% | Slide ngắn + demo 15 phút, trả lời được Q&A về bottleneck |
| Vận hành sạch (cost, tag, tự stop EC2, no secret leak) | 5% | Không có secret trong git history, EC2 ngoài giờ đã stop |

**Cộng điểm bonus tối đa 10%** nếu:

- Triển khai infra-as-code (Terraform / CloudFormation) thay vì click console.
- Có observability stack (Prometheus + Grafana) tự host và dashboard live.
- Có chaos test (kill 1 service ngẫu nhiên trong demo, hệ thống vẫn lên).

---

## 9. Lưu ý chung

- **"Khó nhưng có lý do":** Mọi ràng buộc latency / throughput / privacy ở trên không phải để làm khó các bạn cho vui — chúng là tình huống thực tế production. Nếu thấy ràng buộc nào không khả thi, hãy đề xuất relax trong design doc và bảo vệ.
- **Đừng giấu rủi ro:** Nếu một tính năng có giả định mạnh (vd "chỉ chạy với ánh sáng tốt"), ghi rõ trong README. Giảng viên đánh giá cao sự thành thật về giới hạn.
- **Hỏi sớm, hỏi nhiều:** Mỗi tuần có 1 slot 30 phút Q&A với giảng viên — nhóm nào không tận dụng sẽ bị đánh giá thấp về kỷ luật làm việc.
