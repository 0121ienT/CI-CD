export const meta = {
  title: "Bài tập lớn — Mở rộng tính năng & CI/CD Auto-Deploy",
  intro:
    "Mỗi nhóm tiếp tục đề tài học kỳ trước, được giao thêm 3 tính năng mới và phải thiết kế CI/CD pipeline tự động deploy lên cloud được cung cấp.",
  emphasis:
    "Tiêu chí then chốt: không chỉ chạy được, mà phải thiết kế cẩn thận — chỉ rõ giả định, ràng buộc, threat model, latency budget, cách rollback, cách scale.",
};

export const pipelineStages = [
  {
    stage: "Lint & format",
    requirement: "Black/Ruff cho Python, ESLint cho JS/TS",
    failFast: "code không đúng style",
  },
  {
    stage: "Unit test",
    requirement: "Coverage ≥ 70% cho module logic chính",
    failFast: "test fail hoặc coverage tụt",
  },
  {
    stage: "Build image",
    requirement: "Multi-stage Dockerfile, image cuối < 800 MB, không chứa secret",
    failFast: "image quá lớn / có secret",
  },
  {
    stage: "Security scan",
    requirement: "trivy image hoặc grype quét CVE; chặn nếu có CVE HIGH chưa fix",
    failFast: "có CVE HIGH/CRITICAL",
  },
  {
    stage: "Push registry",
    requirement: "Push lên ECR (hoặc Docker Hub) với 2 tag: :<git-sha> và :latest",
    failFast: "credential sai",
  },
  {
    stage: "Integration test",
    requirement: "Compose lên DB/cache giả lập, gọi smoke test API thật",
    failFast: "smoke test không 200",
  },
  {
    stage: "Deploy staging",
    requirement: "SSH/SSM vào EC2 staging, pull image, docker compose up -d",
    failFast: "health check fail trong 60s",
  },
  {
    stage: "Manual gate",
    requirement: "Approval qua GitHub Environment hoặc Jenkins input",
    failFast: "không có ai approve",
  },
  {
    stage: "Deploy prod",
    requirement: "Blue-green hoặc rolling update, có rollback tự động",
    failFast: "health check prod fail",
  },
  {
    stage: "Notify",
    requirement: "Gửi message (Discord/Slack/Telegram) khi deploy xong hoặc fail",
    failFast: "—",
  },
];

export const deliverables = [
  "Sơ đồ pipeline vẽ bằng Excalidraw (PNG/SVG) — chỉ rõ stage, artifact đi qua từng bước, secret store nằm ở đâu.",
  "File THREAT-MODEL.md ngắn: tối thiểu 5 mối đe doạ (token leak, image tampering, supply chain, DoS, data poisoning) + biện pháp giảm thiểu.",
  "File ROLLBACK.md: lệnh cụ thể để rollback về tag cũ trong < 2 phút.",
];

export const cloudResources = [
  "1 EC2 t3.large (2 vCPU / 8 GB) — chạy app prod; nếu nhóm cần GPU (vd Hand Gesture realtime) → đăng ký trước để được cấp g4dn.xlarge.",
  "1 EC2 t3.medium riêng làm staging.",
  "ECR private repo <group>/app.",
  "S3 bucket <group>-artifacts để lưu model .pt, log, backup.",
  "RDS Postgres db.t3.micro (nhóm 1, 2, 4) — nhóm 3 nếu cần thì xin thêm.",
  "ElastiCache Redis cache.t3.micro (nhóm 2, 4).",
  "Domain test: <group>.<base-domain> hoặc IP:port mở qua Security Group.",
];

export const cloudNote =
  "Tất cả tài nguyên gắn tag Owner=<group>, Course=HIT-PYTHON-2026. Nhóm phải tự stop EC2 ngoài giờ làm bài (có script kèm phần Notify).";

export const groups = [
  {
    id: "nhom-1",
    number: 1,
    name: "Phân loại cảm xúc",
    codename: "BTL-Nhom1",
    tone: "violet",
    repo: "https://github.com/HIT-PYTHON-2026/BTL-Nhom1",
    summary:
      "ResNet (PyTorch) phân loại cảm xúc khuôn mặt + YOLOv8-nano detect mặt; FastAPI backend; frontend HTML/CSS/JS; có chế độ upload ảnh, livestream camera và mini-game.",
    features: [
      {
        title: "Multi-modal Emotion Fusion (Face + Voice)",
        description:
          "Bổ sung nhánh xử lý âm thanh song song khuôn mặt: stream micro qua WebRTC → mô hình Speech Emotion Recognition (wav2vec2-emotion) chạy trên window 2 giây overlap 0.5 giây. Sau đó fusion với output video stream để cho ra một emotion score hợp nhất kèm độ tin cậy.",
        constraints: [
          "Đồng bộ timestamp audio frame và video frame ≤ 100 ms (NTP-style hoặc theo wall clock client) — mô tả cách xử lý drift.",
          "So sánh early fusion (concat features trước classifier) với late fusion (weighted softmax) — chọn 1, giải thích pros/cons.",
          "Khi 1 modality bị thiếu (vd mic mute), pipeline vẫn trả kết quả với confidence điều chỉnh xuống — không crash.",
          "Latency end-to-end (mic input → fused emotion hiển thị) < 400 ms ở P95.",
        ],
      },
      {
        title: "Emotion Drift Monitoring + Online Retraining Loop",
        description:
          "Mỗi prediction được log kèm confidence và embedding 128-d. Build dashboard drift detection (PSI/KL-divergence theo tuần) so với phân phối lúc train. Khi PSI vượt ngưỡng → trích sample khó vào S3, mở review UI, retrain, deploy shadow 10% traffic, so metric, promote.",
        constraints: [
          "Vẽ data flow Excalidraw: từ inference log → drift score → retrain → shadow → promote. Có rõ điểm kill-switch.",
          "Schema feedback DB phải có audit trail: ai gắn nhãn, khi nào, lý do (chống poisoning).",
          "Canary metric rõ: model mới chỉ promote khi accuracy không tụt > 1% trên holdout cố định.",
        ],
      },
      {
        title: "Multi-tenant Analytics Dashboard",
        description:
          "Cho phép tổ chức (trường, doanh nghiệp) đăng ký 1 workspace. Mỗi workspace có RBAC, heatmap cảm xúc theo lớp/ca, time-series, alert engine khi tỷ lệ negative vượt threshold.",
        constraints: [
          "Privacy: không lưu ảnh khuôn mặt raw quá 7 ngày, chỉ giữ embedding đã hash + metadata. Mô tả cách xoá tự động (S3 lifecycle + cron).",
          "Multi-tenancy: chọn pattern (shared DB + tenant_id vs schema-per-tenant vs DB-per-tenant), bảo vệ lựa chọn theo chi phí và data isolation.",
          "Integration test giả lập 2 workspace truy vấn cùng lúc, đảm bảo không leak dữ liệu chéo.",
        ],
      },
    ],
  },
  {
    id: "nhom-2",
    number: 2,
    name: "Hệ thống nhận diện biển số xe thông minh",
    codename: "Team2_Parking_Detection",
    tone: "amber",
    repo: "https://github.com/HIT-PYTHON-2026/Team2_Parking_Detection",
    summary:
      "YOLOv8 detect xe + slot trống, dynamic calibration theo độ phân giải, FastAPI + Streamlit dashboard, có /health /detect /stream.",
    features: [
      {
        title: "License Plate OCR + Vehicle Registry + Billing",
        description:
          "Sau khi YOLOv8 detect xe, crop bounding box biển số → preprocess (perspective transform, deskew, denoise) → OCR (PaddleOCR/EasyOCR fine-tune trên biển VN). Match vào DB xe đăng ký, ghi log entry/exit, tính phí theo bảng giá cấu hình.",
        constraints: [
          "Biển VN nhiều ký tự đặc thù (dấu chấm/gạch); post-processing whitelist + Levenshtein đến top-K candidate trong DB.",
          "Chống double-billing: cùng xe quét nhiều khung liên tiếp chỉ tạo 1 session. Mô tả state machine ENTER → INSIDE → EXIT với timeout và idempotency key.",
          "Xử lý ca khó: xe khuất một phần biển, biển hai hàng, ban đêm. Báo cáo thử nghiệm 50 ảnh khó tự chụp.",
          "Schema billing: vehicle, session, rate_card, transaction — kèm migration script.",
        ],
      },
      {
        title: "Multi-camera Fusion + Cross-frame Vehicle Tracking",
        description:
          "Nhiều camera quay cùng 1 bãi từ các góc khác nhau. Stream qua message queue (Redis Stream/Kafka) thay vì HTTP trực tiếp. DeepSORT/ByteTrack track xuyên khung và xuyên camera, không đếm trùng khi xe di chuyển giữa zone.",
        constraints: [
          "Đồng bộ camera qua NTP, sai số timestamp giữa stream ≤ 50 ms; mô tả cách bù khi camera mất kết nối tạm.",
          "Calibration world-coordinate: map frame pixel về sơ đồ 2D của bãi (homography). Lập trình tool calibration (click 4 điểm gốc).",
          "Backpressure: queue không phình > 5000 message → drop frame cũ nhất với policy rõ ràng.",
          "Throughput tối thiểu: 4 camera × 15 FPS xử lý song song trên 1 GPU g4dn.xlarge.",
        ],
      },
      {
        title: "Predictive Availability + Slot Recommendation",
        description:
          "Model time-series (XGBoost/Prophet/LSTM — chọn 1 và giải thích) dự đoán độ trống của bãi ở mốc 15/30/60 phút tới, dựa trên lịch sử + thời tiết + sự kiện lân cận. User query: 'tôi đến sau X phút, bãi còn không?' → xác suất + slot gợi ý gần lối ra.",
        constraints: [
          "Feature engineering: hour-of-day, day-of-week, holiday, rain, temperature, gần khu sự kiện không. Vẽ tầm quan trọng của feature.",
          "Versioning rõ: nếu model mới predict lệch > 20% MAE trên 1 tuần đầu → tự rollback.",
          "Online evaluation: log mọi prediction kèm predicted_at, so với thực tế khi tới mốc → MAE chart trên dashboard.",
          "Latency query user < 150 ms (cache hit), < 400 ms (cache miss).",
        ],
      },
    ],
  },
  {
    id: "nhom-3",
    number: 3,
    name: "Hand Gesture (chưa có repo)",
    codename: "no-repo-yet",
    tone: "crimson",
    repo: null,
    summary:
      "Vì chưa có repo, nhóm bắt đầu từ Day 0 và bị chấm khắt khe hơn về design doc (DESIGN.md ≥ 8 trang) trước khi viết dòng code đầu tiên. Mỗi tính năng phải có sơ đồ kiến trúc Excalidraw, bảng API, schema dữ liệu và threat model riêng.",
    note: "Vì 3 tính năng cố ý phức tạp, nhóm được phép chọn 2/3 để làm sâu — nhưng phải viết design doc cho cả 3. Quyết định bỏ tính năng nào phải có lý do kỹ thuật rõ, không phải 'thiếu thời gian'.",
    features: [
      {
        title: "Real-time Vietnamese Sign Language Translator (streaming)",
        description:
          "Stream webcam → MediaPipe Holistic (hand + body + face keypoints) → temporal model (Transformer/TCN) → decoder dịch sang câu tiếng Việt có ngữ pháp đúng (không phải gloss từng từ) → optional TTS.",
        hardLabel: "Cố ý khó",
        constraints: [
          "Streaming, không batch: sliding window có overlap, beam search decoder. Định nghĩa 'câu kết thúc khi nào' (boundary detection) — pause + neutral pose.",
          "Latency P95 < 300 ms từ kết thúc gesture đến hiển thị câu dịch.",
          "OOV & ambiguity: khi confidence < ngưỡng, hiển thị top-3 candidate kèm câu mẫu, cho user xác nhận.",
          "Đồng bộ multi-stream: hand keypoint nhanh hơn face/body → buffer + alignment trước khi đưa vào temporal model.",
          "Dataset: không có dataset tiếng Việt chuẩn → tự thu ≥ 200 câu × 3 người ký + augment (rotation, time warp). Mô tả annotation guideline.",
          "Evaluation: accuracy, BLEU-2 và user study ≥ 10 người không quen ngôn ngữ ký hiệu đánh giá độ hiểu của câu dịch.",
        ],
      },
      {
        title: "Multi-user Gesture Collaborative 3D Workspace (WebRTC + CRDT)",
        description:
          "Nhiều user (mỗi người 1 webcam) cùng vào 1 phòng, dùng gesture xoay/scale/di chuyển/vẽ trên đối tượng 3D chung trong browser. KHÔNG truyền video — chỉ truyền pose keypoint giữa client qua WebRTC DataChannel.",
        hardLabel: "Cố ý khó",
        constraints: [
          "Conflict resolution: 2 user cùng grab 1 object cùng lúc, ai thắng? Dùng CRDT (Yjs/Automerge) hoặc OT, mô tả lý do chọn và minh hoạ ví dụ.",
          "Gesture FSM: mỗi tay state machine idle → tracking → engaged-pinch → drag → release. Mô tả full state diagram, transition guard, debounce time.",
          "UX rõ ràng: user nhìn được tay nào của ai đang điều khiển object nào — thiết kế ghosted cursor 3D có màu theo user.",
          "Network resilience: 1 client lag > 200 ms, client khác vẫn dùng được; state hội tụ trong < 1 giây sau khi client lag quay lại.",
          "Scale test: demo 4 user cùng phòng, FPS ≥ 30, RTT < 150 ms (LAN).",
          "Security: signed room token, gesture event có sequence number để chống replay.",
        ],
      },
      {
        title: "Adaptive Gesture Authentication (Behavioral Biometrics + Anti-spoofing)",
        description:
          "User đăng ký gesture passphrase cá nhân — chuỗi 3–5 gesture trong không gian 3D. Model học pattern theo người (Siamese, few-shot). Mỗi lần auth: liveness check, so template trong DB, drift nhẹ → update template (continual learning).",
        hardLabel: "Cố ý khó",
        constraints: [
          "Threat model rõ: ≥ 6 attacker scenario (replay video, deepfake, shoulder-surfing, đánh cắp template, model inversion, brute-force gesture phổ thông). Mỗi scenario có biện pháp giảm thiểu.",
          "Template aging: khi nào template được cập nhật, ai có quyền revoke, audit trail.",
          "Fallback: auth fail 3 lần liên tiếp → lock + cảnh báo email, fallback OTP.",
          "Fairness: FAR/FRR trên ít nhất 3 nhóm người (giới tính, độ tuổi, tay thuận trái/phải).",
          "Privacy: template lưu chỉ embedding đã encrypt at rest (AES-256), key trong AWS KMS. Mô tả key rotation policy.",
          "Performance: một lần auth end-to-end < 1.5 giây.",
        ],
      },
    ],
  },
  {
    id: "nhom-4",
    number: 4,
    name: "Fashion Visual Search Engine",
    codename: "image_retrieval / VOGUE FIND",
    tone: "teal",
    repo: "https://github.com/HIT-PYTHON-2026/image_retrieval",
    summary:
      "ResNet50 → 2048-dim embedding → Milvus; PostgreSQL + MinIO; React frontend; có e-commerce features (cart, brand dashboard, RBAC).",
    features: [
      {
        title: "Hybrid Text + Image Search bằng CLIP (Multi-modal)",
        description:
          "User kết hợp ảnh + text trong cùng 1 query, vd 'ảnh áo này + màu xanh navy, ngắn tay hơn'. Swap ResNet50 → CLIP (ViT-B/32 hoặc lớn hơn), reindex Milvus với embedding mới. Hỗ trợ weighting image/text, support negation chuyển sang filter SQL.",
        constraints: [
          "Migration: đổi model là đổi vector space → migrate Milvus collection mới song song với cũ, có cờ feature flag để A/B test trước khi cắt sang.",
          "Re-ranking pass 2: sau khi Milvus trả top-100, áp cross-encoder rerank top-100 → top-10.",
          "Latency search end-to-end < 350 ms ở P95, kể cả với rerank.",
          "Evaluation: Recall@10, MRR trên tập đánh giá ≥ 200 query có ground-truth tự build.",
          "Cost: ước tính chi phí mỗi 1000 request (embedding + Milvus + rerank), trình bày ở DESIGN.md.",
        ],
      },
      {
        title: "Federated Learning Personalized Recommendation",
        description:
          "Lịch sử người dùng train model nhỏ trên thiết bị (ONNX runtime trên browser/app). Client gửi gradient/delta đã DP-noise về server, server federated average thành model toàn cục. Không lưu raw behavior trên server.",
        constraints: [
          "Model nhỏ: distill từ teacher (CF hoặc two-tower) xuống student ≤ 5 MB.",
          "DP-SGD: chọn ε (privacy budget) cụ thể, giải thích trade-off accuracy vs privacy.",
          "Anti-poisoning: client update có chữ ký, server áp Krum / Trimmed Mean thay vì FedAvg thuần để chống malicious client.",
          "Communication efficiency: chỉ gửi top-k delta, dùng quantization int8.",
          "Evaluation: AB-test recommendation từ federated model với baseline CF tập trung trên ≥ 1 tuần.",
        ],
      },
      {
        title: "Inventory-aware Re-ranking + Sponsored Slot Auction",
        description:
          "Khi user search, re-rank kết quả theo stock (gần hết → boost), margin (profit cao → boost), brand bid (slot 1/3/5 đấu giá, second-price), seasonal, diversity (≤ 3 item cùng brand trong top-10). Brand dashboard mới: CTR, conversion theo slot, bid history minh bạch.",
        constraints: [
          "Learning-to-rank: LightGBM LambdaRank hoặc neural ranker; train trên click log có counterfactual correction (IPS/DR).",
          "Feature store online: Redis hoặc Feast — features (stock, margin, bid) cập nhật < 1 giây.",
          "Latency budget: similarity search + rerank + auction phải gói trong 200 ms P95.",
          "Fairness: small brand (< 100 sales) được guaranteed exposure ≥ 10% slot mỗi ngày.",
          "Explainability: badge 'Sponsored' rõ ràng + chi tiết 'Vì sao lên top' trong brand dashboard.",
          "Revenue tracking: bid → DB billing → reconcile cuối tháng. Không double-charge khi user F5.",
        ],
      },
    ],
  },
];

export const timeline = [
  { week: "1", goal: "Design doc", deliverable: "DESIGN.md mỗi tính năng, sơ đồ Excalidraw, threat model" },
  { week: "2", goal: "Setup CI cơ bản + repo skeleton", deliverable: "Lint + unit test pass trên GitHub Actions/Jenkins" },
  { week: "3–4", goal: "Implement 3 tính năng", deliverable: "Code + unit test, mỗi feature 1 PR" },
  { week: "5", goal: "CI/CD hoàn chỉnh + deploy staging", deliverable: "Pipeline đầy đủ stage, deploy thành công lên staging" },
  { week: "6", goal: "Deploy prod + demo", deliverable: "Live demo + báo cáo + retro" },
];

export const folderStructure = `/docs
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
README.md (cập nhật)`;

export const grading = [
  { item: "CI/CD pipeline đủ stage, có manual gate và rollback chứng minh được", weight: "25%", criteria: "Demo deploy thành công lên cloud được cấp + rollback < 2 phút" },
  { item: "3 tính năng mới hoạt động đúng spec", weight: "45%", criteria: "Có test + demo + đáp ứng ràng buộc thiết kế (mỗi feature 15%)" },
  { item: "Chất lượng thiết kế (design doc, threat model, sơ đồ, schema)", weight: "15%", criteria: "Design doc đủ chi tiết, có alternatives + lý do chọn" },
  { item: "Báo cáo & demo live", weight: "10%", criteria: "Slide ngắn + demo 15 phút, trả lời được Q&A về bottleneck" },
  { item: "Vận hành sạch (cost, tag, tự stop EC2, no secret leak)", weight: "5%", criteria: "Không có secret trong git history, EC2 ngoài giờ đã stop" },
];

export const bonusItems = [
  "Triển khai infra-as-code (Terraform / CloudFormation) thay vì click console.",
  "Có observability stack (Prometheus + Grafana) tự host và dashboard live.",
  "Có chaos test (kill 1 service ngẫu nhiên trong demo, hệ thống vẫn lên).",
];

export const generalNotes = [
  {
    label: "Khó nhưng có lý do",
    text: "Mọi ràng buộc latency / throughput / privacy ở trên không phải để làm khó các bạn cho vui — chúng là tình huống thực tế production. Nếu thấy ràng buộc nào không khả thi, hãy đề xuất relax trong design doc và bảo vệ.",
  },
  {
    label: "Đừng giấu rủi ro",
    text: "Nếu một tính năng có giả định mạnh (vd chỉ chạy với ánh sáng tốt), ghi rõ trong README. Giảng viên đánh giá cao sự thành thật về giới hạn.",
  },
  {
    label: "Hỏi sớm, hỏi nhiều",
    text: "Mỗi tuần có 1 slot 30 phút Q&A với giảng viên — nhóm nào không tận dụng sẽ bị đánh giá thấp về kỷ luật làm việc.",
  },
];

export const sections = [
  { id: "tong-quan", label: "Tổng quan", kind: "overview" },
  { id: "ci-cd", label: "CI/CD chung", kind: "cicd" },
  { id: "cloud", label: "Cloud được cấp", kind: "cloud" },
  ...groups.map((group) => ({ id: group.id, label: `Nhóm ${group.number}`, kind: "group", groupId: group.id })),
  { id: "nop-bai", label: "Nộp bài & chấm", kind: "submission" },
];
