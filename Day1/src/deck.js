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
    source: "",
  },
  testingPyramid: {
    src: publicAsset("/images/testing-pyramid.png"),
    alt: "Testing pyramid minh họa các tầng kiểm thử",
    source: "",
  },
};

const glossarySlides = [
  {
    section: "Glossary",
    kicker: "Thuật ngữ nền tảng",
    title: "Những từ tiếng Anh cần nắm",
    body: "Các thuật ngữ này xuất hiện nhiều trong slide và khi đọc tài liệu CI/CD. Chỉ cần hiểu đúng ý chính để dùng khi thiết kế và trình bày hệ thống.",
    keyMessage: "Glossary giúp cả lớp dùng chung một ngôn ngữ: nói cùng một thuật ngữ, hiểu cùng một ý nghĩa.",
    points: ["CI/CD", "Pipeline", "Artifact", "Quality gate", "Release", "Rollback"],
    details: [
      { label: "CI/CD", text: "Cách tự động build, test và đưa thay đổi đến trạng thái sẵn sàng release hoặc deploy." },
      { label: "Pipeline", text: "Chuỗi bước tự động như build, test, scan, package, deploy và observe." },
      { label: "Artifact", text: "Sản phẩm đầu ra của build: package, container image, report hoặc model file." },
      { label: "Quality gate", text: "Điểm kiểm tra bắt buộc. Nếu không đạt, pipeline dừng để tránh đưa lỗi đi tiếp." },
    ],
    image: imageMap.planning,
    layout: "matrix",
    tone: "calm",
  },
  {
    section: "Glossary",
    kicker: "Tools & Operations",
    title: "Thuật ngữ khi nói về công cụ",
    body: "Khi chọn Jenkins, GitHub Actions hoặc GitLab CI/CD, các từ này giúp mình nói rõ ai chạy job, cấu hình nằm ở đâu và hệ thống được vận hành thế nào.",
    keyMessage: "Chọn tool không chỉ là chọn UI. Cần hiểu runner, workflow, credential, registry và observability để vận hành được.",
    points: ["Runner / Agent", "Workflow YAML", "Jenkinsfile", "Credential", "Registry", "Observability"],
    details: [
      { label: "Runner / Agent", text: "Máy hoặc container thực thi job trong pipeline. GitHub/GitLab thường gọi là runner; Jenkins thường gọi là agent." },
      { label: "Workflow YAML / Jenkinsfile", text: "File mô tả pipeline bằng code để review, version và tái sử dụng cùng source code." },
      { label: "Credential", text: "Thông tin bí mật như token, password hoặc key dùng để đăng nhập registry, cloud hoặc server." },
      { label: "Observability", text: "Khả năng theo dõi hệ thống qua logs, metrics, traces và alert để biết release có ổn không." },
    ],
    image: imageMap.code,
    layout: "matrix",
    tone: "navy",
  },
  {
    section: "Glossary",
    kicker: "ML/Data",
    title: "Thuật ngữ cho hệ thống ML/Data",
    body: "Các từ này giúp mình nối CI/CD với bài toán ML/Data: dữ liệu, model, kiểm thử và theo dõi sau khi deploy.",
    keyMessage: "Với ML/Data, pipeline không chỉ kiểm tra code. Nó còn kiểm tra data, model metrics, model artifact và tín hiệu production.",
    points: ["Data validation", "Model evaluation", "Model registry", "Feature", "Drift", "High-level design"],
    details: [
      { label: "Data validation", text: "Kiểm tra dữ liệu có đúng schema, đủ mới, ít lỗi null và phù hợp giả định trước khi dùng." },
      { label: "Model evaluation", text: "Đánh giá model bằng metrics và so sánh với baseline trước khi đưa vào registry hoặc deploy." },
      { label: "Model registry", text: "Nơi lưu model artifact, version, metadata và trạng thái như staging hoặc production." },
      { label: "High-level design", text: "Bản vẽ tổng thể cho thấy thành phần chính, luồng dữ liệu, điểm kiểm soát và cách vận hành." },
    ],
    image: imageMap.infrastructure,
    layout: "matrix",
    tone: "purple",
  },
];

export const slides = [
  {
    section: "Khóa học",
    kicker: "Tổng quan",
    title: "CI/CD cho hệ thống ML & Data",
    body: "",
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
  ...glossarySlides,
  {
    section: "Khóa học",
    kicker: "Đích đến",
    title: "Sau lớp học, mình làm được gì?",
    body: "Mục tiêu của lớp là giúp bạn hiểu bức tranh tổng thể, biết cách thiết kế hệ thống và trình bày ý tưởng rõ ràng hơn.",
    keyMessage: "Bạn sẽ biết cách đi từ một bài toán ML/Data đến bản high-level design vẽ bằng Excalidraw và kế hoạch triển khai có thể giải thích được.",
    points: ["Xây dựng hệ thống ML/Data end-to-end", "Vẽ high-level design bằng Excalidraw", "Trình bày hệ thống rõ ràng"],
    hidePoints: true,
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
    body: "CI/CD là cách để mỗi thay đổi trong code được kiểm tra tự động trước khi đưa đến người dùng hoặc môi trường chạy thật.",
    keyMessage: "CI/CD gồm ba ý chính: tự động kiểm tra thay đổi, chuẩn bị bản release và có thể deploy theo quy trình rõ ràng.",
    hideKeyMessage: true,
    points: ["Continuous Integration", "Continuous Delivery", "Continuous Deployment"],
    details: [
      { label: "Continuous Integration", text: "Mỗi thay đổi được gộp vào code chung và kiểm tra tự động để phát hiện lỗi sớm." },
      { label: "Continuous Delivery", text: "Bản build đã kiểm tra xong luôn ở trạng thái sẵn sàng release khi team quyết định." },
      { label: "Continuous Deployment", text: "Nếu mọi kiểm tra đều pass, hệ thống có thể tự deploy mà không cần thao tác thủ công." },
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
      { label: "Chọn theo rủi ro", text: "Sản phẩm rủi ro thấp có thể tự động hơn; hệ thống quan trọng nên giữ bước duyệt rõ ràng." },
      { label: "Hệ thống regulated", text: "Ngành tài chính, y tế hoặc dữ liệu nhạy cảm thường cần audit, approval và rollback plan." },
    ],
    image: imageMap.code,
    layout: "matrix",
    tone: "navy",
  },
  {
    section: "Nền tảng",
    kicker: "Vì sao ra đời",
    title: "Từ integration hell đến DevOps",
    body: "Trước đây, nhiều team gom thay đổi trong thời gian dài rồi mới ghép lại. Khi đó lỗi thường xuất hiện muộn, khó tìm nguyên nhân và release rất căng thẳng.",
    keyMessage: "CI/CD giúp chia việc lớn thành các thay đổi nhỏ, kiểm tra sớm hơn và giảm rủi ro khi đưa sản phẩm ra môi trường thật.",
    points: ["Gộp sớm", "Kiểm tra tự động", "Release nhỏ", "Dev và Ops cùng chịu trách nhiệm"],
    details: [
      { label: "Vấn đề cũ", text: "Một release chứa quá nhiều thay đổi nên khi lỗi xảy ra, team khó biết lỗi đến từ đâu." },
      { label: "Cách tiếp cận mới", text: "Mỗi thay đổi đi qua cùng một đường kiểm tra, có log rõ ràng và có thể sửa sớm hơn." },
    ],
    image: imageMap.collaboration,
    layout: "concept",
    tone: "orange",
  },
  {
    section: "DevOps",
    kicker: "Văn hóa",
    title: "CALMS: khung nhìn DevOps",
    body: "CI/CD là phần tự động hóa. DevOps là cách team cùng làm việc để sản phẩm đi từ ý tưởng đến vận hành ổn định hơn.",
    keyMessage: "DevOps không phải một chức danh. Đó là cách phối hợp dựa trên văn hóa chia sẻ, tự động hóa, làm việc gọn, đo được kết quả và học cùng nhau.",
    points: ["Culture", "Automation", "Lean", "Measurement", "Sharing"],
    details: [
      { label: "CALMS", text: "Culture là cùng chịu trách nhiệm; Automation giảm việc lặp lại; Lean bỏ bước thừa; Measurement giúp nhìn sự thật; Sharing giúp team học nhanh hơn." },
      { label: "Hiểu đơn giản", text: "Không phải chỉ một người làm DevOps. Cả team cần thống nhất cách build, test, deploy và xử lý sự cố." },
    ],
    image: imageMap.team,
    layout: "matrix",
    tone: "teal",
  },
  {
    section: "CI Practice",
    kicker: "Continuous Integration",
    title: "Những thực hành CI quan trọng",
    body: "CI giúp team biết sớm thay đổi mới có làm hỏng hệ thống hay không. Mỗi lần đưa code lên, pipeline sẽ tự build và chạy test.",
    keyMessage: "Mục tiêu của CI là feedback nhanh: nếu có lỗi, team biết ngay để sửa trước khi lỗi đi xa hơn.",
    points: ["Unit tests", "Integration tests", "Smoke tests", "Manual tests"],
    details: [
      { label: "Tích hợp thường xuyên", text: "Đưa code lên nhánh chính thường xuyên với thay đổi nhỏ để lỗi dễ tìm và dễ sửa." },
      { label: "Testing Pyramid", text: "Nên có nhiều test nhỏ, nhanh ở tầng dưới; càng lên cao test càng ít hơn vì chạy lâu và tốn công hơn." },
    ],
    image: imageMap.code,
    visualImage: imageMap.testingPyramid,
    layout: "concept",
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
      { label: "Source Control", text: "Nơi lưu code và lịch sử thay đổi, ví dụ GitHub hoặc GitLab." },
      { label: "CI/CD Server", text: "Nơi nhận tín hiệu từ repo và điều phối các job trong pipeline." },
      { label: "Build Tools", text: "Công cụ biến source code thành sản phẩm chạy được, ví dụ package, image hoặc model artifact." },
      { label: "Test Frameworks", text: "Công cụ kiểm tra code và hệ thống để phát hiện lỗi trước khi release." },
      { label: "Artifact Repository", text: "Nơi lưu output sau build như package, report, container image hoặc model file." },
      { label: "Container Registry", text: "Nơi lưu Docker image để các môi trường dev, staging, production cùng dùng một bản build." },
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
    title: "So sánh công cụ CI/CD",
    body: "Không có công cụ tốt nhất cho mọi team. Hãy chọn theo nơi code đang nằm, ai vận hành runner, mức kiểm soát cần có và độ quen thuộc của nhóm.",
    keyMessage: "Ưu tiên công cụ team có thể vận hành đều đặn: dễ đọc pipeline, dễ quản lý quyền, dễ debug lỗi và phù hợp cách release hiện tại.",
    points: ["Nơi lưu code", "Ai chạy job", "Mức kiểm soát", "Chi phí vận hành", "Độ quen thuộc"],
    details: [
      { label: "Jenkins", text: "Phù hợp khi cần self-hosted control, private network, nhiều tích hợp legacy và team chấp nhận tự vận hành server." },
      { label: "GitHub Actions", text: "Phù hợp khi repo ở GitHub, workflow gắn với pull request, release đơn giản và muốn tận dụng marketplace actions." },
      { label: "GitLab CI/CD", text: "Phù hợp khi team dùng GitLab và muốn source code, pipeline, runner, environment, approval nằm trong cùng platform." },
      { label: "Cách chọn", text: "Bắt đầu từ platform team đang dùng, sau đó kiểm tra runner model, secret management, permission và khả năng debug." },
    ],
    image: imageMap.code,
    visualImage: imageMap.comparisonTable,
    layout: "matrix",
    tone: "navy",
  },
  {
    section: "Thực hành",
    kicker: "Best Practices",
    title: "Checklist cho pipeline dễ vận hành",
    body: "Best practices không phải là thêm thật nhiều stage. Mục tiêu là pipeline dễ hiểu, chạy ổn định và giúp team phát hiện lỗi sớm.",
    keyMessage: "Một pipeline tốt trả lời được ba câu hỏi: lỗi nằm ở đâu, artifact nào đang được release và cần làm gì tiếp theo.",
    points: ["Dễ đọc", "Feedback nhanh", "Build một lần", "Logs rõ", "Rollback được", "Có người chịu trách nhiệm"],
    details: [
      { label: "Khi thiết kế", text: "Tách stage theo mục đích: install, test, build, package, deploy. Đừng để một stage làm quá nhiều việc." },
      { label: "Khi vận hành", text: "Giữ logs ngắn và rõ, cache dependency hợp lý, không hard-code secret, luôn biết artifact nào đang chạy." },
      { label: "Bài tập / Capstone", text: "Thiết kế pipeline end-to-end cho một service: test, build image, lưu artifact, deploy và quan sát kết quả." },
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
