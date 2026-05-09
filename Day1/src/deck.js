const publicAsset = (path) => `${import.meta.env?.BASE_URL ?? "/"}${path.replace(/^\//, "")}`;

const imageMap = {
  architecture: {
    src: "https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_1280.jpg",
    alt: "Nhóm đang thiết kế hệ thống trên bảng trắng",
    source: "Pixabay",
  },
  collaboration: {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
    alt: "Nhóm kỹ thuật cộng tác quanh laptop",
    source: "Unsplash",
  },
  learning: {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    alt: "Buổi học nhóm",
    source: "Unsplash",
  },
  devops: {
    src: "https://cdn.pixabay.com/photo/2018/02/12/14/01/devops-3148408_1280.jpg",
    alt: "Minh họa DevOps workflow",
    source: "Pixabay",
  },
  code: {
    src: "https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg",
    alt: "Màn hình code đại diện cho pipeline configuration",
    source: "Pixabay",
  },
  infrastructure: {
    src: "https://images.unsplash.com/photo-1775519520461-6b6e068d9250?auto=format&fit=crop&w=1600&q=80",
    alt: "Server rack đại diện cho hạ tầng tính toán",
    source: "Unsplash",
  },
  dataCenter: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    alt: "Hạ tầng data center",
    source: "Unsplash",
  },
  jenkins: {
    src: "https://cdn.simpleicons.org/jenkins/D24939",
    alt: "Logo Jenkins",
    source: "Simple Icons",
  },
  github: {
    src: "https://cdn.simpleicons.org/github/181717",
    alt: "Logo GitHub",
    source: "Simple Icons",
  },
  gitlab: {
    src: "https://cdn.simpleicons.org/gitlab/FC6D26",
    alt: "Logo GitLab",
    source: "Simple Icons",
  },
  excalidraw: {
    src: "https://cdn.simpleicons.org/excalidraw/6965DB",
    alt: "Logo Excalidraw",
    source: "Simple Icons",
  },
  planning: {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    alt: "Không gian làm việc với laptop và sổ ghi chú",
    source: "Unsplash",
  },
  team: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    alt: "Nhóm cộng tác quanh laptop",
    source: "Unsplash",
  },
  comparisonTable: {
    src: publicAsset("/images/tool-comparison-table.png"),
    alt: "Bảng so sánh GitLab, Bitbucket, GitHub và Jenkins",
    source: "Ảnh bạn cung cấp",
  },
  basicHighLevelDesign: {
    src: publicAsset("/images/basic-high-level-design.png"),
    alt: "Ví dụ high-level design cơ bản cho hệ thống ML và Data",
    source: "Ảnh bạn cung cấp",
  },
};

export const slides = [
  {
    section: "Khóa học",
    kicker: "Tổng quan",
    title: "CI/CD cho hệ thống ML & Data",
    body: "Một slide deck tối giản để hiểu CI/CD như lớp tự động hóa đứng sau phần mềm, dữ liệu và sản phẩm ML đáng tin cậy.",
    keyMessage: "Mục tiêu không chỉ là chạy được pipeline, mà là thiết kế được high-level ML/Data architecture có thể delivery lặp lại.",
    points: ["High-level design", "Pipeline thinking", "Tool selection", "Operational quality"],
    details: [
      { label: "Mục tiêu", text: "Học viên có thể vẽ hệ thống ML/Data và giải thích automation hỗ trợ ở đâu." },
      { label: "Nguồn nội dung", text: "Nội dung được mở rộng từ giáo trình CI/CD toàn tập." },
    ],
    image: imageMap.architecture,
    layout: "cover",
    tone: "calm",
  },
  {
    section: "Khóa học",
    kicker: "Đích đến",
    title: "Sau lớp học, mình làm được gì?",
    body: "Mục tiêu của lớp là giúp bạn hiểu bức tranh tổng thể, biết cách thiết kế hệ thống và trình bày ý tưởng rõ ràng hơn.",
    keyMessage: "Bạn sẽ biết cách đi từ một bài toán ML/Data đến bản high-level design vẽ bằng Excalidraw và kế hoạch triển khai có thể giải thích được.",
    points: ["Xây dựng hệ thống ML/Data end-to-end", "Vẽ high-level design bằng Excalidraw", "Trình bày hệ thống rõ ràng"],
    details: [
      { label: "Xây dựng", text: "Biết các bước chính để xây dựng và triển khai một hệ thống ML/Data từ đầu đến cuối." },
      { label: "Thiết kế", text: "Biết cách vẽ high-level design để người khác nhìn vào hiểu được hệ thống hoạt động ra sao." },
      { label: "Trình bày", text: "Biết cách nói về hệ thống một cách mạch lạc: mục tiêu, thành phần, luồng dữ liệu và điểm cần lưu ý." },
    ],
    image: imageMap.learning,
    visualImage: imageMap.basicHighLevelDesign,
    layout: "concept",
    tone: "calm",
  },
  {
    section: "Khóa học",
    kicker: "Tool chính",
    title: "Excalidraw để vẽ high-level design",
    body: "Trong khóa học, Excalidraw là công cụ chính để phác thảo kiến trúc hệ thống nhanh, dễ sửa và dễ trình bày.",
    keyMessage: "Không cần vẽ quá đẹp. Quan trọng là người nghe nhìn vào hiểu được hệ thống có những phần nào, dữ liệu đi ra sao và điểm rủi ro nằm ở đâu.",
    points: ["excalidraw.com", "Vẽ nhanh trên browser", "Dễ sửa khi thảo luận", "Export PNG/SVG"],
    details: [
      { label: "Dùng trong lớp", text: "Dùng Excalidraw để vẽ luồng data, pipeline, service, storage, model registry, monitoring và các điểm quality gate." },
      { label: "Đầu ra mong muốn", text: "Mỗi nhóm có một bản high-level design đủ rõ để trình bày bài toán, kiến trúc, luồng dữ liệu và kế hoạch triển khai." },
    ],
    image: imageMap.excalidraw,
    layout: "tool",
    tone: "purple",
  },
  {
    section: "Nền tảng",
    kicker: "Định nghĩa",
    title: "CI/CD trong một câu",
    body: "CI/CD là đường dẫn tự động đưa thay đổi từ commit của developer đến một thay đổi hệ thống đã được kiểm chứng, sẵn sàng release và có thể quan sát.",
    keyMessage: "Giáo trình xem CI/CD là ba thực hành nối với nhau: Continuous Integration, Continuous Delivery và Continuous Deployment.",
    points: ["Continuous Integration", "Continuous Delivery", "Continuous Deployment"],
    details: [
      { label: "CI", text: "Mỗi commit được build và test tự động để lỗi tích hợp xuất hiện sớm." },
      { label: "CD", text: "Build đã pass luôn được giữ ở trạng thái sẵn sàng release có kiểm soát hoặc tự động." },
    ],
    image: imageMap.devops,
    layout: "concept",
    tone: "teal",
  },
  {
    section: "Nền tảng",
    kicker: "Điểm dễ nhầm",
    title: "Delivery khác Deployment",
    body: "Hai thuật ngữ này thường bị dùng lẫn nhau. Khác biệt nằm ở mức độ phê duyệt của con người trước production.",
    keyMessage: "Continuous Delivery nghĩa là luôn sẵn sàng release; Continuous Deployment nghĩa là tự động release sau khi các kiểm tra pass.",
    points: ["Delivery: release-ready", "Deployment: auto-release", "Chọn theo rủi ro", "Hệ thống regulated cần gates"],
    details: [
      { label: "Continuous Delivery", text: "Artifact có thể promote lên production bất cứ lúc nào, nhưng bước cuối có thể cần người phê duyệt." },
      { label: "Continuous Deployment", text: "Mọi commit pass pipeline sẽ được deploy mà không cần thao tác thủ công." },
    ],
    image: imageMap.code,
    layout: "matrix",
    tone: "navy",
  },
  {
    section: "Nền tảng",
    kicker: "Vì sao ra đời",
    title: "Từ integration hell đến DevOps",
    body: "CI/CD ra đời vì tích hợp muộn, release thủ công và feedback loop dài khiến delivery chậm và rủi ro.",
    keyMessage: "Delivery hiện đại ưu tiên thay đổi nhỏ, phản hồi nhanh, kiểm chứng tự động và trách nhiệm chung giữa Dev và Ops.",
    points: ["Waterfall tạo rủi ro muộn", "XP phổ biến CI", "DevOps nối Dev và Ops", "GitOps mở rộng automation sang hạ tầng"],
    details: [
      { label: "Vấn đề cũ", text: "Release lớn che giấu quá nhiều thay đổi nên lỗi đắt và khó cô lập." },
      { label: "Cách tiếp cận mới", text: "Tự động hóa đường đi, version pipeline và làm mỗi release đủ nhỏ để hiểu được." },
    ],
    image: imageMap.collaboration,
    layout: "concept",
    tone: "orange",
  },
  {
    section: "DevOps",
    kicker: "Văn hóa",
    title: "CALMS: khung nhìn DevOps",
    body: "Giáo trình nhấn mạnh CI/CD là phần kỹ thuật nằm trong một văn hóa DevOps rộng hơn.",
    keyMessage: "DevOps không phải một chức danh. Đó là mô hình làm việc dựa trên culture, automation, lean flow, measurement và sharing.",
    points: ["Culture", "Automation", "Lean", "Measurement", "Sharing"],
    details: [
      { label: "CALMS", text: "Culture phá silo; Automation giảm việc lặp lại; Lean giảm lãng phí; Measurement dẫn quyết định; Sharing lan tỏa học hỏi." },
      { label: "Sai lầm phổ biến", text: "Tuyển một DevOps engineer không tạo ra DevOps nếu tổ chức vẫn giữ cách bàn giao cũ." },
    ],
    image: imageMap.team,
    layout: "matrix",
    tone: "teal",
  },
  {
    section: "CI Practice",
    kicker: "Continuous Integration",
    title: "Những thực hành CI quan trọng",
    body: "CI chỉ có giá trị khi nó tạo feedback nhanh và đáng tin cậy trên các thay đổi nhỏ.",
    keyMessage: "Giáo trình nhấn mạnh tích hợp thường xuyên, build/test tự động, feedback nhanh, môi trường test gần production và sửa build đỏ ngay.",
    points: ["Single mainline", "Automated build", "Self-testing build", "Fast feedback", "Fix red builds first"],
    details: [
      { label: "Định nghĩa chặt", text: "Thành viên tích hợp ít nhất mỗi ngày, và mỗi lần tích hợp được xác minh bằng build và tests tự động." },
      { label: "Testing Pyramid", text: "Ưu tiên nhiều unit tests, ít integration tests hơn, và chỉ một số E2E tests cho happy path quan trọng." },
    ],
    image: imageMap.code,
    layout: "flow",
    tone: "navy",
  },
  {
    section: "Pipeline",
    kicker: "Cấu trúc",
    title: "Từ commit đến release có quan sát",
    body: "Pipeline là bản đồ thực thi cho biết một thay đổi trở nên an toàn để release như thế nào.",
    keyMessage: "Pipeline as Code nghĩa là build, test, package và deploy được version cùng source code thay vì ẩn trong UI.",
    points: ["Commit", "Build", "Test", "Package", "Deploy", "Observe"],
    details: [
      { label: "Nguyên tắc artifact", text: "Build một lần, rồi promote cùng artifact qua các môi trường với khác biệt cấu hình." },
      { label: "Quality gate", text: "Stage fail phải chặn thay đổi không an toàn trước khi tới người dùng hoặc hệ thống downstream." },
    ],
    image: imageMap.devops,
    layout: "flow",
    tone: "orange",
  },
  {
    section: "Pipeline",
    kicker: "Hệ thống hiện đại",
    title: "Một hệ thống CI/CD gồm những gì",
    body: "Pipeline không đứng một mình. Nó phối hợp source control, CI/CD server, build tools, test frameworks, artifact stores, registry, deployment tools và observability.",
    keyMessage: "Thiết kế CI/CD tốt phải chỉ ra artifact đi đâu, ai chạy job, môi trường nào nhận deploy và tín hiệu nào chứng minh release ổn.",
    points: ["Source Control", "CI/CD Server", "Build Tools", "Test Frameworks", "Artifact Repository", "Container Registry"],
    details: [
      { label: "Artifact Repository", text: "Nexus, Artifactory, Harbor hoặc npm registry lưu output như .jar, report, package hoặc model artifact." },
      { label: "Observability", text: "Prometheus, Grafana, ELK hoặc Datadog giúp theo dõi health, log, metrics và rollback signal." },
    ],
    image: imageMap.infrastructure,
    layout: "matrix",
    tone: "teal",
  },
  {
    section: "CI Practice",
    kicker: "Branching",
    title: "Branching strategy quyết định lead time",
    body: "Giáo trình so sánh GitFlow, GitHub Flow và Trunk-Based Development như các trade-offs giữa tốc độ tích hợp và kiểm soát release.",
    keyMessage: "Nhánh ngắn hạn giảm merge pain; Trunk-Based Development phổ biến ở nhóm delivery elite vì rút ngắn feedback loop.",
    points: ["GitFlow", "GitHub Flow", "Trunk-Based", "Feature flags"],
    details: [
      { label: "GitFlow", text: "Phù hợp chu kỳ release dài và nhiều version song song, nhưng nặng cho CI/CD hiện đại." },
      { label: "Trunk-Based", text: "Tích hợp vào mainline với nhánh ngắn; phần chưa xong được ẩn sau feature flags." },
    ],
    image: imageMap.collaboration,
    layout: "matrix",
    tone: "purple",
  },
  {
    section: "Đo lường",
    kicker: "DORA Metrics",
    title: "Đo tốc độ và độ ổn định cùng lúc",
    body: "Giáo trình dùng DORA metrics làm khung đo hiệu quả delivery.",
    keyMessage: "Nhóm elite không nhanh bằng cách hy sinh ổn định; thực hành kỹ thuật tốt cải thiện cả hai.",
    points: ["Deployment Frequency", "Lead Time for Changes", "Change Failure Rate", "Mean Time to Recovery"],
    details: [
      { label: "Tốc độ", text: "Deployment Frequency và Lead Time cho biết giá trị đến production nhanh đến đâu." },
      { label: "Ổn định", text: "Change Failure Rate và Mean Time to Recovery cho biết chất lượng release và khả năng phục hồi." },
    ],
    image: imageMap.planning,
    layout: "matrix",
    tone: "green",
  },
  {
    section: "ML Delivery",
    kicker: "ML/Data Systems",
    title: "CI/CD cho ML không chỉ là code",
    body: "ML và data delivery thêm data validation, model evaluation, artifact versioning và monitoring vào pipeline phần mềm thông thường.",
    keyMessage: "ML pipeline phải kiểm chứng code, giả định dữ liệu, model metrics và hành vi deployment trước khi release.",
    points: ["Code tests", "Data validation", "Training", "Evaluation", "Model registry", "Monitoring"],
    details: [
      { label: "Data gate", text: "Kiểm tra schema, freshness, nulls, drift và feature expectations trước training hoặc scoring." },
      { label: "Model gate", text: "So sánh metrics với baseline trước khi register hoặc deploy model artifact." },
    ],
    image: imageMap.infrastructure,
    layout: "flow",
    tone: "purple",
  },
  {
    section: "Công cụ",
    kicker: "Jenkins",
    title: "Jenkins: automation server linh hoạt",
    body: "Jenkins mạnh khi team cần self-hosted control, hạ tầng tùy biến và hệ sinh thái plugin lớn.",
    keyMessage: "Chọn Jenkins khi cần linh hoạt, nhưng phải tính đến bảo trì server, rủi ro plugin, credentials và operational ownership.",
    points: ["Jenkinsfile", "Agents", "Plugins", "Credentials", "Custom runners"],
    hidePoints: true,
    details: [
      { label: "Phù hợp", text: "Môi trường enterprise phức tạp, private network, legacy integrations và self-managed runners." },
      { label: "Cần chú ý", text: "Plugin maintenance, upgrades, permissions và giữ pipelines dễ đọc theo thời gian." },
    ],
    image: imageMap.jenkins,
    layout: "tool",
    tone: "navy",
  },
  {
    section: "Công cụ",
    kicker: "GitHub Actions",
    title: "GitHub Actions: workflow gắn với repo",
    body: "GitHub Actions phù hợp với team đã review, merge và release từ GitHub.",
    keyMessage: "Nó kết hợp event triggers, jobs, steps, hosted runners và marketplace actions ngay trong repository workflow.",
    points: ["Events", "Workflow YAML", "Jobs", "Steps", "Marketplace actions"],
    details: [
      { label: "Phù hợp", text: "Pull request checks, GitHub-hosted repositories, deployment đơn giản và community actions tái sử dụng." },
      { label: "Cần chú ý", text: "Độ tin cậy của third-party actions, runner limits, secret scope và workflow sprawl." },
    ],
    image: imageMap.github,
    layout: "tool",
    tone: "navy",
  },
  {
    section: "Công cụ",
    kicker: "GitLab CI/CD",
    title: "GitLab CI/CD: DevOps tích hợp",
    body: "GitLab CI/CD tích hợp trong GitLab và nối source code, pipelines, runners, environments, approvals và releases.",
    keyMessage: "Đây là lựa chọn mạnh khi team muốn source control và delivery governance trong cùng một platform.",
    points: [".gitlab-ci.yml", "Stages", "Jobs", "Runners", "Environments"],
    details: [
      { label: "Phù hợp", text: "Team dùng GitLab muốn pipeline visibility, environments, approvals và integrated DevOps flow." },
      { label: "Cần chú ý", text: "Runner capacity, YAML complexity, cache strategy và permission boundaries." },
    ],
    image: imageMap.gitlab,
    layout: "tool",
    tone: "orange",
  },
  {
    section: "Công cụ",
    kicker: "Lựa chọn",
    title: "Chọn công cụ theo operating model",
    body: "Giáo trình đặt việc chọn công cụ trong bối cảnh platform fit, security needs, runner ownership, governance và kỹ năng team.",
    keyMessage: "Công cụ đúng không phải công cụ nhiều tính năng nhất, mà là công cụ team vận hành ổn định nhất.",
    points: ["Repository platform", "Runner model", "Security boundary", "Release governance", "Team maturity"],
    details: [
      { label: "Self-hosted control", text: "Jenkins cho độ linh hoạt cao nhất khi team chấp nhận operational ownership." },
      { label: "Platform-native speed", text: "GitHub Actions và GitLab CI/CD nhanh hơn khi source platform đã sở hữu workflow." },
    ],
    image: imageMap.code,
    visualImage: imageMap.comparisonTable,
    layout: "matrix",
    tone: "navy",
  },
  {
    section: "Nâng cao",
    kicker: "DevSecOps",
    title: "Security phải nằm trong pipeline",
    body: "Giáo trình mô tả DevSecOps như việc shift-left security checks vào pipeline thay vì đợi audit cuối kỳ.",
    keyMessage: "Quét dependencies, containers, secrets, code quality và policies sớm để lỗi rẻ hơn khi sửa.",
    points: ["SAST", "Dependency scan", "Container scan", "Secret scan", "Policy gate"],
    details: [
      { label: "Shift-left", text: "Phát hiện vulnerabilities trong development và CI, không chỉ ngay trước production." },
      { label: "Công cụ", text: "Ví dụ gồm SonarQube, Snyk, Trivy, OWASP ZAP và repository secret controls." },
    ],
    image: imageMap.planning,
    layout: "matrix",
    tone: "green",
  },
  {
    section: "Nâng cao",
    kicker: "Cloud-Native Delivery",
    title: "Docker, Kubernetes và GitOps",
    body: "CI/CD hiện đại thường gồm container images, Kubernetes deployment và GitOps systems như ArgoCD hoặc FluxCD.",
    keyMessage: "GitOps xem Git là source of truth cho code, infrastructure, policy và deployment state.",
    points: ["Docker image", "Registry", "Kubernetes", "Helm", "Blue-Green / Canary", "Observability"],
    details: [
      { label: "Build once", text: "Tạo một image hoặc artifact, lưu trong registry rồi promote qua các môi trường." },
      { label: "Progressive delivery", text: "Dùng rolling, Blue-Green hoặc Canary khi production risk cần kiểm soát." },
    ],
    image: imageMap.dataCenter,
    layout: "flow",
    tone: "teal",
  },
  {
    section: "Thực hành",
    kicker: "Best Practices",
    title: "Giữ pipelines nhỏ, nhanh và observable",
    body: "Pipeline tốt phải dễ đọc, deterministic, secure và đủ nhanh cho công việc hằng ngày.",
    keyMessage: "CI/CD là vòng lặp cải tiến liên tục: đo lường, học hỏi, đơn giản hóa và cải thiện delivery path khi sản phẩm thay đổi.",
    points: ["Short stages", "Fast feedback", "Deterministic artifacts", "Safe secrets", "Clear logs", "DORA review"],
    details: [
      { label: "Engineering quality", text: "Tách stages, cache dependencies, parallelize tests và giữ lỗi dễ đọc." },
      { label: "Bài tập / Capstone", text: "Thiết kế pipeline end-to-end cho một service: build, test, scan, package, deploy, monitor và đo DORA metrics." },
    ],
    image: imageMap.planning,
    layout: "closing",
    tone: "calm",
  },
];

export function clampSlideIndex(index) {
  return Math.min(Math.max(index, 0), slides.length - 1);
}

export function getNextSlideIndex(index) {
  return clampSlideIndex(index + 1);
}

export function getPreviousSlideIndex(index) {
  return clampSlideIndex(index - 1);
}

export function getSlideIndexForKey(index, event) {
  const isSpace = event.key === " " || event.key === "Spacebar" || event.code === "Space";
  const isNext = isSpace || event.key === "ArrowRight" || event.key === "PageDown";
  const isPrevious = event.key === "ArrowLeft" || event.key === "PageUp";

  if (isNext) {
    return getNextSlideIndex(index);
  }

  if (isPrevious) {
    return getPreviousSlideIndex(index);
  }

  if (event.key === "Home") {
    return 0;
  }

  if (event.key === "End") {
    return slides.length - 1;
  }

  return clampSlideIndex(index);
}
