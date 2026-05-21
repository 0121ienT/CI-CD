export const meta = {
  title: "Mở rộng tính năng & CI/CD Auto-Deploy",
  intro:
    "Có 4 đề tài để chọn. Mỗi nhóm chọn 1 đề tài, bổ sung 3 tính năng mới và thiết kế CI/CD pipeline tự động deploy lên cloud được cấp.",
};

export const pipelineStages = [
  {
    stage: "Lint & format",
    requirement: "Black hoặc Ruff cho Python, ESLint cho JS/TS",
    failFast: "code không đúng style",
  },
  {
    stage: "Unit test",
    requirement: "Coverage tối thiểu 60% cho module logic chính",
    failFast: "test fail hoặc coverage tụt",
  },
  {
    stage: "Build image",
    requirement: "Multi-stage Dockerfile, image gọn và không chứa secret",
    failFast: "image quá lớn hoặc có secret",
  },
  {
    stage: "Security scan",
    requirement: "Quét CVE bằng trivy hoặc grype; chặn nếu có CVE HIGH chưa fix",
    failFast: "có CVE HIGH/CRITICAL",
  },
  {
    stage: "Push registry",
    requirement: "Push image lên registry với 2 tag git-sha và latest",
    failFast: "credential sai",
  },
  {
    stage: "Integration test",
    requirement: "Compose lên DB và cache giả lập, gọi smoke test API thật",
    failFast: "smoke test không 200",
  },
  {
    stage: "Deploy staging",
    requirement: "Pull image về EC2 staging và khởi động bằng docker compose",
    failFast: "health check fail trong 60s",
  },
  {
    stage: "Manual gate",
    requirement: "Approval qua GitHub Environment hoặc Jenkins input",
    failFast: "không có ai approve",
  },
  {
    stage: "Deploy prod",
    requirement: "Rolling update hoặc blue-green, có rollback tự động",
    failFast: "health check prod fail",
  },
  {
    stage: "Notify",
    requirement: "Gửi message khi deploy xong hoặc fail",
    failFast: "—",
  },
];

export const deliverables = [
  "Sơ đồ pipeline chỉ rõ stage, artifact đi qua từng bước và nơi lưu secret.",
  "File THREAT-MODEL.md ngắn với tối thiểu 3 mối đe doạ chính và biện pháp giảm thiểu.",
  "File ROLLBACK.md với lệnh cụ thể để rollback về tag cũ trong vài phút.",
];

export const cloudResources = [
  "1 EC2 t3.large cho app prod; đề tài cần GPU đăng ký để được cấp g4dn.xlarge.",
  "1 EC2 t3.medium làm staging.",
  "1 ECR private repo cho mỗi nhóm.",
  "1 S3 bucket cho mỗi nhóm để lưu model, log và backup.",
  "RDS Postgres db.t3.micro cho đề tài có database.",
  "ElastiCache Redis cache.t3.micro cho đề tài có cache.",
  "Domain test gắn vào IP và port của EC2 qua Security Group.",
];

export const cloudNote =
  "Tài nguyên gắn tag để theo dõi chi phí. Nhóm phải tự stop EC2 ngoài giờ làm bài và đính kèm script tắt trong phần Notify.";

export const groups = [
  {
    id: "nhom-1",
    number: 1,
    name: "Phân loại cảm xúc",
    tone: "violet",
    summary:
      "Hệ thống nhận diện cảm xúc từ ảnh và video bằng mô hình phân loại trên khuôn mặt, có backend HTTP và frontend web cho upload ảnh cùng livestream camera.",
    features: [
      {
        title: "Multi-modal Emotion Fusion: Khuôn mặt + Giọng nói",
        description:
          "Thêm nhánh xử lý âm thanh song song với khuôn mặt. Stream micro vào một mô hình Speech Emotion Recognition trên window 2 giây có overlap. Sau đó fusion với output video stream để cho ra một emotion score chung kèm độ tin cậy.",
        constraints: [
          "Đồng bộ timestamp audio và video frame trong khoảng vài trăm ms.",
          "Khi 1 trong 2 modality bị thiếu, pipeline vẫn trả kết quả thay vì crash.",
          "Latency end-to-end dưới 1 giây ở P95.",
        ],
      },
      {
        title: "Emotion Drift Monitoring + Online Retraining",
        description:
          "Mỗi prediction được log kèm confidence. Có dashboard theo dõi phân phối kết quả theo tuần. Khi có dấu hiệu lệch nhiều so với lúc train thì trích sample khó ra storage, mở UI cho người gắn nhãn lại và retrain.",
        constraints: [
          "Có sơ đồ data flow từ inference log đến retrain và promote, có điểm dừng (kill-switch).",
          "Schema feedback DB ghi nhận ai gắn nhãn và khi nào.",
          "Model mới chỉ promote khi accuracy trên holdout không tụt quá 3% so với bản hiện tại.",
        ],
      },
      {
        title: "Multi-tenant Analytics Dashboard",
        description:
          "Mỗi tổ chức đăng ký 1 workspace riêng. Mỗi workspace có RBAC, heatmap cảm xúc theo lớp hoặc ca, biểu đồ xu hướng theo ngày và alert khi tỷ lệ negative vượt threshold.",
        constraints: [
          "Privacy: không lưu ảnh khuôn mặt raw quá 14 ngày, chỉ giữ embedding kèm metadata.",
          "Mỗi tenant có dữ liệu riêng và có RBAC cơ bản.",
          "Có test kiểm tra 2 tenant không thấy được dữ liệu của nhau.",
        ],
      },
    ],
  },
  {
    id: "nhom-2",
    number: 2,
    name: "Hệ thống nhận diện biển số xe thông minh",
    tone: "amber",
    summary:
      "Hệ thống detect xe và slot trống bằng object detection, có dynamic calibration theo độ phân giải camera, backend HTTP và dashboard hiển thị trạng thái bãi.",
    features: [
      {
        title: "Nhận diện biển số + Vehicle Registry + Billing",
        description:
          "Sau khi detect xe, crop biển số rồi đưa vào OCR phù hợp biển Việt Nam. Match kết quả vào DB xe đăng ký, ghi log entry và exit, tính phí gửi theo bảng giá có thể cấu hình.",
        constraints: [
          "Hậu xử lý OCR bằng whitelist ký tự và so khớp với danh sách xe đã đăng ký.",
          "Cùng xe trong nhiều khung liên tiếp chỉ tạo 1 session, tránh ghi trùng phí.",
          "Báo cáo thử nghiệm tối thiểu 10 ảnh tự chụp với điều kiện khó như ánh sáng yếu hoặc xe khuất một phần biển.",
        ],
      },
      {
        title: "Multi-camera Fusion + Cross-frame Tracking",
        description:
          "Nhiều camera quay cùng 1 bãi từ các góc khác nhau. Stream qua message queue thay vì HTTP trực tiếp. Track xuyên khung và xuyên camera, không đếm trùng khi xe di chuyển giữa các zone.",
        constraints: [
          "Có cơ chế đồng bộ frame giữa các camera và mô tả cách bù khi 1 camera mất kết nối tạm thời.",
          "Map pixel của frame về sơ đồ 2D của bãi để biết xe đang ở zone nào.",
          "Throughput tối thiểu 2 camera ở 5 FPS xử lý song song.",
        ],
      },
      {
        title: "Predictive Availability + Slot Recommendation",
        description:
          "Một model time-series dự đoán độ trống của bãi ở các mốc 15, 30 và 60 phút tới dựa trên lịch sử và thời tiết. User hỏi tới sau bao nhiêu phút thì bãi còn không, hệ thống trả về xác suất kèm slot gợi ý.",
        constraints: [
          "Feature engineering với các yếu tố thời gian và thời tiết, có giải thích lựa chọn feature.",
          "Có dashboard so sánh prediction với thực tế để theo dõi sai số theo tuần.",
          "Latency query phía user dưới 500 ms khi cache hit.",
        ],
      },
    ],
  },
  {
    id: "nhom-3",
    number: 3,
    name: "Hand Gesture",
    tone: "crimson",
    summary:
      "Hệ thống nhận diện và sử dụng cử chỉ tay từ webcam. Đề tài này không có codebase nền sẵn nên cần đầu tư nhiều hơn cho phần thiết kế trước khi triển khai.",
    features: [
      {
        title: "Vietnamese Sign Language Translator dạng streaming",
        description:
          "Stream webcam đi qua một mô hình trích keypoint cơ thể, sau đó đưa vào một temporal model để dịch sang câu tiếng Việt có ngữ pháp đúng. Có thể thêm TTS nếu còn thời gian.",
        constraints: [
          "Streaming với sliding window có overlap, không xử lý theo từng đoạn rời.",
          "Latency dưới 1 giây ở P95 từ kết thúc cử chỉ đến hiển thị câu dịch.",
          "Dataset tự thu tối thiểu 50 câu của 1 đến 2 người ký, kèm annotation guideline.",
        ],
      },
      {
        title: "Multi-user Gesture Collaborative 3D Workspace",
        description:
          "Nhiều user mỗi người 1 webcam cùng vào 1 phòng, dùng cử chỉ xoay, scale, di chuyển hoặc vẽ trên đối tượng 3D chung trong browser. Không truyền video, chỉ truyền pose keypoint giữa các client.",
        constraints: [
          "Có cơ chế xử lý khi 2 user cùng thao tác với 1 object cùng lúc.",
          "UX cho người dùng biết tay nào của ai đang điều khiển object nào.",
          "Scale test với 2 user cùng phòng, FPS tối thiểu 15.",
        ],
      },
      {
        title: "Adaptive Gesture Authentication",
        description:
          "User đăng ký gesture passphrase là chuỗi 3 đến 5 cử chỉ trong không gian 3D. Model học pattern theo người. Mỗi lần đăng nhập: kiểm tra liveness, so với template trong DB và cập nhật template khi có drift nhẹ.",
        constraints: [
          "Threat model với tối thiểu 2 kịch bản tấn công và biện pháp giảm thiểu tương ứng.",
          "Khi auth fail nhiều lần liên tiếp, có cơ chế lock và fallback an toàn.",
          "Performance một lần auth end-to-end dưới 3 giây.",
        ],
      },
    ],
  },
  {
    id: "nhom-4",
    number: 4,
    name: "Fashion Visual Search Engine",
    tone: "teal",
    summary:
      "Hệ thống tìm sản phẩm thời trang bằng ảnh: sinh embedding cho ảnh và lưu vào vector database, có e-commerce features như giỏ hàng, brand dashboard và phân quyền.",
    features: [
      {
        title: "Hybrid Text + Image Search bằng mô hình đa modal",
        description:
          "Cho phép user kết hợp ảnh và text trong cùng 1 query. Swap mô hình embedding sang một mô hình đa modal, reindex toàn bộ vector database. Hỗ trợ weighting giữa image và text.",
        constraints: [
          "Có feature flag để A/B test giữa model cũ và model mới trước khi cắt hẳn sang.",
          "Latency search end-to-end dưới 1 giây ở P95.",
          "Evaluation Recall@10 trên tập đánh giá tối thiểu 50 query có ground-truth tự build.",
        ],
      },
      {
        title: "Federated Learning Personalized Recommendation",
        description:
          "Lịch sử người dùng train một model nhỏ trên thiết bị. Client gửi update đã thêm noise về server, server tổng hợp thành model toàn cục. Không lưu raw behavior trên server.",
        constraints: [
          "Model client-side có dung lượng nhỏ và chạy được trên thiết bị thông thường.",
          "Có cơ chế thêm noise vào update để bảo vệ thông tin cá nhân.",
          "Server có cơ chế kiểm tra cơ bản với client update bất thường.",
        ],
      },
      {
        title: "Inventory-aware Re-ranking + Sponsored Slot",
        description:
          "Khi user search, kết quả được re-rank theo stock, margin, brand bid, mùa và độ đa dạng thương hiệu. Brand dashboard mới hiển thị CTR, conversion theo slot và lịch sử bid.",
        constraints: [
          "Learning-to-rank cơ bản dựa trên click log đã được làm sạch.",
          "Feature store cập nhật stock, margin và bid trong vòng vài giây.",
          "Latency tổng của similarity search, rerank và auction dưới 500 ms ở P95.",
        ],
      },
    ],
  },
];

export const timeline = [
  { week: "1", goal: "Design doc", deliverable: "DESIGN.md cho mỗi tính năng, sơ đồ và threat model" },
  { week: "2", goal: "Setup CI cơ bản và repo skeleton", deliverable: "Lint và unit test pass trên hệ thống CI đã chọn" },
  { week: "3–4", goal: "Implement 3 tính năng", deliverable: "Code và unit test, mỗi feature 1 PR" },
  { week: "5", goal: "CI/CD hoàn chỉnh và deploy staging", deliverable: "Pipeline đầy đủ stage, deploy thành công lên staging" },
  { week: "6", goal: "Deploy prod và demo", deliverable: "Live demo, báo cáo và retrospective" },
];

export const folderStructure = `/docs
  DESIGN.md
  THREAT-MODEL.md
  ROLLBACK.md
  pipeline-diagram.png
/ci
  .github/workflows/  hoặc Jenkinsfile
/src
  ...
/scripts
  bootstrap-ec2.sh
  rollback.sh
/tests
  unit/
  integration/
README.md`;

export const grading = [
  { item: "CI/CD pipeline đủ stage, có manual gate và rollback chứng minh được", weight: "25%", criteria: "Demo deploy thành công lên cloud được cấp và rollback trong vài phút" },
  { item: "3 tính năng mới hoạt động đúng spec", weight: "45%", criteria: "Có test, có demo và đáp ứng ràng buộc thiết kế" },
  { item: "Chất lượng thiết kế: design doc, threat model, sơ đồ, schema", weight: "15%", criteria: "Design doc đủ chi tiết, có alternatives kèm lý do chọn" },
  { item: "Báo cáo và demo", weight: "10%", criteria: "Slide ngắn cộng demo 15 phút, trả lời được Q&A về bottleneck" },
  { item: "Vận hành sạch: cost, tag, tự stop EC2, không leak secret", weight: "5%", criteria: "Không có secret trong git history, EC2 ngoài giờ đã stop" },
];

export const bonusItems = [
  "Triển khai infra-as-code bằng Terraform hoặc CloudFormation thay vì click console.",
  "Có observability stack tự host với Prometheus và Grafana, dashboard live.",
  "Có chaos test: kill 1 service ngẫu nhiên trong demo, hệ thống vẫn lên.",
];

export const generalNotes = [
  {
    label: "Mô phỏng production",
    text: "Mọi ràng buộc về latency, throughput và privacy mô phỏng tình huống production. Nếu thấy ràng buộc nào không khả thi, đề xuất relax trong design doc và bảo vệ lựa chọn.",
  },
  {
    label: "Nêu rõ giả định",
    text: "Nếu một tính năng có giả định mạnh, ghi rõ trong README. Sự thành thật về giới hạn được đánh giá cao trong phần thiết kế.",
  },
];

export const sections = [
  { id: "tong-quan", label: "Tổng quan", kind: "overview" },
  { id: "ci-cd", label: "CI/CD chung", kind: "cicd" },
  { id: "cloud", label: "Cloud được cấp", kind: "cloud" },
  ...groups.map((group) => ({ id: group.id, label: `Nhóm ${group.number}`, kind: "group", groupId: group.id })),
  { id: "nop-bai", label: "Nộp bài & chấm", kind: "submission" },
];
