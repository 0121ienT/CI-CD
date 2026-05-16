const slideDefinitions = [
  {
    section: "Workshop",
    kicker: "Docker 101",
    title: "Docker cơ bản cho người mới",
    body: "",
    keyMessage: "Docker là nền tảng đóng gói ứng dụng và môi trường chạy thành một đơn vị triển khai nhất quán.",
    hideKeyMessage: true,
    points: ["Container", "Image", "Dockerfile", "Run app"],
    details: [
      { label: "Mục tiêu", text: "Hiểu Docker giải quyết vấn đề gì và tự chạy được container đầu tiên." },
      { label: "Cách học", text: "Mỗi khái niệm đi kèm một demo ngắn hoặc bài lab nhỏ." },
    ],
    visual: "cover",
    layout: "cover",
    tone: "docker",
  },
  {
    section: "Concept",
    kicker: "Vì sao cần Docker",
    title: "Vấn đề hiện tại",
    body: "Một app có thể chạy tốt trên máy A nhưng lỗi trên máy B vì khác version môi trường chạy, thư viện, biến môi trường hoặc cách cài đặt.",
    keyMessage: "Docker chuẩn hóa môi trường thực thi bằng cách mô tả môi trường chạy và dependency như một phần của package.",
    points: ["Môi trường chạy khác", "Dependency lệch", "Setup lâu", "Khó chia sẻ"],
    details: [
      { label: "Trước Docker", text: "Cài Python, Node, database, package và config trực tiếp lên máy hoặc server." },
      { label: "Sau Docker", text: "Mô tả môi trường bằng file, build thành image, rồi chạy image đó ở nhiều nơi." },
    ],
    visual: "laptop-container",
    layout: "concept",
    tone: "orange",
  },
  {
    section: "Concept",
    kicker: "Khái niệm nền",
    title: "Container là gì",
    body: "Container là một gói chạy app. Bên trong có app và những thứ cần thiết để app chạy, nên dễ mang sang máy khác mà ít bị lỗi do thiếu môi trường.",
    keyMessage: "Container giúp app chạy theo cùng một cách ở nhiều nơi: máy cá nhân, server, môi trường test hoặc pipeline CI/CD.",
    points: ["App", "Đồ cần để chạy", "Dễ mang đi", "Chạy nhất quán"],
    details: [
      { label: "Dễ hình dung", text: "Giống một hộp đồ nghề: mở hộp ra là có đúng dụng cụ cần dùng, không phải cài lại từng món." },
      { label: "Điểm cần nhớ", text: "Container không biến app thành phép màu; mình vẫn cần biết app dùng port nào, dữ liệu lưu ở đâu và cách xem log khi lỗi." },
    ],
    visual: "analogy",
    layout: "concept",
    tone: "docker",
  },
  {
    section: "Comparison",
    kicker: "Docker vs VM",
    title: "Docker nhẹ hơn VM ở điểm nào?",
    body: "Cả Docker và VM đều giúp cô lập môi trường, nhưng cách cô lập khác nhau. VM chạy cả guest OS, còn container chia sẻ kernel với host.",
    keyMessage: "Container cung cấp mức cô lập nhẹ hơn máy ảo bằng cách chia sẻ kernel nhưng tách biệt tiến trình và tài nguyên.",
    points: ["Docker", "Virtual Machine", "Khi dùng Docker", "Khi dùng VM"],
    details: [
      { label: "Docker", text: "Khởi động nhanh, image thường nhỏ hơn, phù hợp đóng gói service và workflow dev." },
      { label: "Virtual Machine", text: "Cô lập mạnh hơn ở mức OS, phù hợp khi cần kernel hoặc hệ điều hành riêng." },
      { label: "Docker", text: "Dùng cho app web, API, worker, database local, demo và pipeline build." },
      { label: "Virtual Machine", text: "Dùng khi cần chạy Windows/Linux riêng, lab hạ tầng hoặc workload có yêu cầu OS đặc biệt." },
    ],
    layout: "comparison",
    tone: "slate",
  },
  {
    section: "Concept",
    kicker: "Ba từ khóa chính",
    title: "Dockerfile, Image, Container",
    body: "Ba khái niệm này là lõi của Docker. Nếu phân biệt được chúng, phần lớn lệnh Docker sẽ dễ hiểu hơn.",
    keyMessage: "Dockerfile, image và container lần lượt đại diện cho mô tả build, artifact đóng gói và thực thể đang chạy.",
    points: ["Dockerfile", "Image", "Container"],
    details: [
      { label: "Dockerfile", text: "File mô tả cách tạo môi trường: base image, copy code, install dependency, command mặc định." },
      { label: "Image", text: "Kết quả sau khi build Dockerfile, có thể push lên registry hoặc dùng để tạo container." },
      { label: "Container", text: "Một instance đang chạy từ image, có log, network, filesystem và lifecycle riêng." },
    ],
    layout: "flow",
    tone: "docker",
  },
  {
    section: "Setup",
    kicker: "Windows",
    title: "Cài Docker trên Windows",
    body: "",
    keyMessage: "Docker Desktop cung cấp môi trường Docker tích hợp trên Windows, bao gồm Docker Engine, CLI, Compose và môi trường chạy Linux container qua WSL 2.",
    points: ["WSL 2", "Docker Desktop", "Start app", "Verify"],
    details: [
      { label: "Official docs", text: "https://docs.docker.com/desktop/setup/install/windows-install/" },
      { label: "Lưu ý", text: "Kiểm tra WSL 2 và virtualization trước khi cài; sau khi cài cần mở Docker Desktop trước khi sử dụng." },
    ],
    commands: [
      { label: "Docs", code: "https://docs.docker.com/desktop/setup/install/windows-install/", result: "Download Docker Desktop Installer.exe" },
      { label: "Verify", code: "docker --version\ndocker run hello-world", result: "Docker CLI chạy được và pull được image đầu tiên" },
    ],
    layout: "command",
    tone: "docker",
  },
  {
    section: "Setup",
    kicker: "Linux",
    title: "Cài Docker trên Linux",
    body: "Với Linux, hãy mở tài liệu Docker, chọn đúng bản Linux đang dùng như Ubuntu, Debian hoặc Fedora, rồi cài theo từng bước.",
    keyMessage: "Docker Engine on Linux là phần lõi chạy container; Docker CLI là lệnh docker; Docker Compose giúp chạy nhiều container cùng lúc.",
    points: ["Chọn bản Linux", "Cài Engine", "Cài CLI", "Verify"],
    details: [
      { label: "Official docs", text: "https://docs.docker.com/engine/install/" },
      { label: "Ghi nhớ", text: "Không copy lệnh giữa các bản Linux; Ubuntu, Debian, Fedora và CentOS có hướng dẫn riêng." },
    ],
    commands: [
      { label: "Docs", code: "https://docs.docker.com/engine/install/", result: "Chọn đúng bản Linux đang dùng" },
      { label: "Verify", code: "docker --version\ndocker compose version\ndocker run hello-world", result: "Engine, Compose plugin và môi trường chạy container hoạt động" },
    ],
    layout: "command",
    tone: "teal",
  },
  {
    section: "Demo",
    kicker: "Example app",
    title: "Bật stack demo bằng Compose",
    body: "Từ repo này, mình dùng ngay Day2/example-app để bật API, Postgres, Redis, Prometheus và Grafana bằng Docker Compose.",
    keyMessage: "Một lệnh Compose có thể build image, tạo network, tạo container và khởi động nhiều service phụ thuộc nhau.",
    points: ["Open folder", "Build", "Start", "Check"],
    details: [
      { label: "Quan sát", text: "Compose đọc docker-compose.yaml, build service api, kéo image Postgres/Redis/Prometheus/Grafana và tạo network chung." },
      { label: "Ghi nhớ", text: "Chạy nền bằng -d để vừa trình chiếu slide vừa mở browser hoặc chạy curl kiểm tra." },
    ],
    commands: [
      { label: "Start stack", code: "cd Day2/example-app\ndocker compose up --build -d", result: "API, Postgres, Redis, Prometheus và Grafana chạy nền" },
      { label: "Check services", code: "cd Day2/example-app\ndocker compose ps", result: "Các service chính ở trạng thái running hoặc healthy" },
      { label: "Open app", code: "http://localhost:3000", result: "Orders App mở trên browser" },
    ],
    layout: "command",
    tone: "docker",
  },
  {
    section: "Demo",
    kicker: "API + Data",
    title: "Gọi API và tạo order",
    body: "Sau khi stack chạy, mình dùng endpoint của example app để kiểm tra health, tạo dữ liệu mới và thấy Redis cache hoạt động qua stats.",
    keyMessage: "Demo API cho thấy container không chạy một mình: request đi qua API, ghi vào Postgres và dùng Redis để cache thống kê.",
    points: ["Health", "Create order", "Stats", "Cache"],
    details: [
      { label: "Health", text: "Endpoint /health xác nhận API kết nối được database và Redis." },
      { label: "Stats", text: "Gọi /api/stats sau khi tạo order để thấy thống kê được tính từ Postgres rồi cache lại trong Redis." },
    ],
    commands: [
      { label: "Health", code: "cd Day2/example-app\ncurl.exe http://localhost:3000/health", result: "JSON status ok, database ok, redis ok" },
      { label: "Create order", code: "cd Day2/example-app\ncurl.exe -X POST http://localhost:3000/api/orders -H \"Content-Type: application/json\" -d \"{\\\"customer\\\":\\\"Demo team\\\",\\\"item\\\":\\\"Docker lab\\\",\\\"quantity\\\":2}\"", result: "API trả về order mới với status created" },
      { label: "Stats", code: "cd Day2/example-app\ncurl.exe http://localhost:3000/api/stats", result: "total_orders và total_items tăng lên" },
    ],
    layout: "command",
    tone: "teal",
  },
  {
    section: "Flow",
    kicker: "Build và chạy app",
    title: "Code → Build → Run → Access",
    body: "Đây là vòng lặp thực hành quan trọng nhất. Mỗi lần sửa app hoặc Dockerfile, mình build image mới rồi chạy container để kiểm tra.",
    keyMessage: "Vòng lặp Docker tách quá trình triển khai thành các pha: chuẩn bị mã nguồn, build artifact, chạy môi trường app và kiểm tra truy cập.",
    points: ["Code", "Build", "Run", "Access"],
    details: [
      { label: "Build", text: "Tạo image từ Dockerfile và context hiện tại." },
      { label: "Run", text: "Tạo container từ image, truyền port, env hoặc volume nếu cần." },
      { label: "Access", text: "Kiểm tra app qua browser, curl, log hoặc health endpoint." },
    ],
    layout: "flow",
    tone: "orange",
  },
  {
    section: "Dockerfile",
    kicker: "Đọc file build",
    title: "Dockerfile tối thiểu cần gì?",
    body: "Dockerfile nên dễ đọc như một checklist build app. Với beginner, chỉ cần nắm vài instruction xuất hiện nhiều nhất.",
    keyMessage: "Dockerfile là đặc tả khai báo cho quá trình tạo image từ môi trường chạy nền, source code, dependency và entry command.",
    points: ["FROM", "WORKDIR", "COPY", "RUN", "CMD"],
    details: [
      { label: "FROM", text: "Chọn base image, ví dụ node:20-alpine hoặc python:3.12-slim." },
      { label: "COPY", text: "Đưa source code hoặc file dependency từ máy host vào image." },
      { label: "RUN", text: "Chạy lệnh trong lúc build, ví dụ npm install hoặc pip install." },
      { label: "CMD", text: "Command mặc định khi container bắt đầu chạy." },
    ],
    commands: [
      {
        label: "Dockerfile",
        code: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD [\"npm\", \"start\"]",
        result: "Image có môi trường chạy Node, dependency và source code",
      },
    ],
    layout: "command",
    tone: "slate",
  },
  {
    section: "Demo",
    kicker: "Observe",
    title: "Xem logs, metrics và dọn stack",
    body: "Phần cuối demo dùng chính container đang chạy để xem logs API, mở metrics cho Prometheus và dọn stack sau buổi học.",
    keyMessage: "Vận hành container cần quan sát được log, metrics, trạng thái service và có lệnh cleanup rõ ràng.",
    points: ["Logs", "Metrics", "Grafana", "Cleanup"],
    details: [
      { label: "Logs", text: "docker compose logs api cho biết request đã đi vào API và lỗi nằm ở service nào nếu demo fail." },
      { label: "Metrics", text: "Endpoint /metrics là dữ liệu Prometheus scrape; Grafana đọc Prometheus để vẽ dashboard." },
    ],
    commands: [
      { label: "Logs", code: "cd Day2/example-app\ndocker compose logs api --tail=40", result: "Log startup và request API gần nhất" },
      { label: "Metrics", code: "cd Day2/example-app\ncurl.exe http://localhost:3000/metrics", result: "Prometheus metrics của API" },
      { label: "Cleanup", code: "cd Day2/example-app\ndocker compose down", result: "Dừng và xóa container/network của stack" },
    ],
    layout: "command",
    tone: "docker",
  },
  {
    section: "Operations",
    kicker: "Debug cơ bản",
    title: "Khi container không chạy",
    body: "Không cần đoán. Docker có vài lệnh giúp nhìn trạng thái, log, command đang chạy và cấu hình port.",
    keyMessage: "Debug container dựa trên việc quan sát trạng thái đang chạy, log tiến trình, cấu hình network và metadata của container.",
    points: ["ps", "logs", "inspect", "exec"],
    details: [
      { label: "docker ps -a", text: "Xem container đang chạy hoặc đã exit." },
      { label: "docker logs", text: "Xem stdout/stderr của app bên trong container." },
      { label: "docker inspect", text: "Xem cấu hình chi tiết như port, env, mount và network." },
      { label: "docker exec", text: "Mở shell trong container đang chạy để kiểm tra nhanh." },
    ],
    commands: [
      { label: "Command", code: "docker ps -a", result: "Xem status Up hoặc Exited" },
      { label: "Command", code: "docker logs <container>", result: "Xem lỗi app hoặc startup log" },
      { label: "Command", code: "docker exec -it <container> sh", result: "Vào shell nếu image có shell" },
    ],
    layout: "command",
    tone: "teal",
  },
  {
    section: "Data",
    kicker: "Volume và env",
    title: "Dữ liệu và cấu hình đi đâu?",
    body: "Container nên dễ tạo lại. Vì vậy dữ liệu cần giữ lâu thường đặt trong volume, còn cấu hình thay đổi theo môi trường nên truyền bằng env.",
    keyMessage: "Image nên giữ tính bất biến; dữ liệu khi app đang chạy và cấu hình môi trường nên được tách khỏi artifact đóng gói.",
    points: ["Volume", "Bind mount", "Env", "Secret"],
    details: [
      { label: "Volume", text: "Nơi Docker quản lý để lưu dữ liệu bền hơn vòng đời container." },
      { label: "Bind mount", text: "Map thư mục từ host vào container, hữu ích khi dev local." },
      { label: "Env", text: "Truyền cấu hình như PORT, NODE_ENV hoặc DATABASE_URL khi run." },
      { label: "Secret", text: "Không hard-code password/token trong Dockerfile hoặc image." },
    ],
    layout: "concept",
    tone: "orange",
  },
  {
    section: "Compose",
    kicker: "Nhiều container",
    title: "Docker Compose để chạy cả stack",
    body: "Khi app cần nhiều container như web, API và database, Compose giúp mô tả tất cả trong một file compose.yaml.",
    keyMessage: "Docker Compose là lớp điều phối cục bộ mô tả nhiều service container và cách chúng chạy cùng nhau.",
    points: ["compose.yaml", "Services", "Network", "Volume"],
    details: [
      { label: "Dùng khi nào", text: "Khi local dev cần nhiều service chạy cùng nhau, ví dụ app + database + cache." },
      { label: "Ghi nhớ", text: "Dockerfile mô tả cách build một image; compose.yaml mô tả cách chạy nhiều container." },
    ],
    commands: [
      {
        label: "compose.yaml",
        code: "services:\n  web:\n    image: nginx:alpine\n    ports:\n      - \"8080:80\"",
        result: "Một service web được mô tả bằng YAML",
      },
      { label: "Command", code: "docker compose up -d", result: "Tạo network và chạy service nền" },
      { label: "Cleanup", code: "docker compose down", result: "Dừng và xóa container/network của stack" },
    ],
    layout: "command",
    tone: "teal",
  },
  {
    section: "Exercise",
    kicker: "Lab 1",
    title: "Checklist: chạy nginx local",
    body: "Bài tập này giúp bạn luyện các thao tác thường dùng: run container, map port, kiểm tra kết quả và dọn dẹp.",
    keyMessage: "Bài lab xác nhận khả năng khởi tạo container, cấu hình network cơ bản và kiểm chứng service từ host.",
    points: ["Run", "Open", "Logs", "Cleanup"],
    details: [
      { label: "Mục tiêu", text: "Chạy một web server trong container và truy cập từ máy host." },
      { label: "Expected output", text: "Browser hiển thị trang welcome của nginx ở localhost:8080." },
    ],
    checklist: [
      "Run nginx:alpine với tên web",
      "Map port 8080 của host vào port 80 của container",
      "Mở browser hoặc curl để kiểm tra",
      "Xem docker ps và docker logs",
      "Cleanup bằng docker rm -f web",
    ],
    commands: [
      { label: "Command", code: "docker run --name web -d -p 8080:80 nginx:alpine", result: "Container Up" },
      { label: "Expected result", code: "http://localhost:8080", result: "Welcome to nginx!" },
    ],
    layout: "exercise",
    tone: "docker",
  },
  {
    section: "Exercise",
    kicker: "Lab 2",
    title: "Checklist: build image app nhỏ",
    body: "Bài tập này nối các phần lại với nhau: đọc Dockerfile, build image, run container và kiểm tra app.",
    keyMessage: "Bài lab củng cố vòng đời image và container thông qua chuỗi build, run và verify.",
    points: ["Read", "Build", "Run", "Verify"],
    details: [
      { label: "Mục tiêu", text: "Build image từ Dockerfile có sẵn và chạy được app local." },
      { label: "Expected output", text: "docker images có tag mới và endpoint local trả về response của app." },
    ],
    checklist: [
      "Đọc Dockerfile và chỉ ra FROM, COPY, RUN, CMD",
      "Build image với tag demo-app:v1",
      "Run container và map port phù hợp",
      "Kiểm tra endpoint bằng browser hoặc curl",
      "Xem log khi app start",
    ],
    commands: [
      { label: "Command", code: "docker build -t demo-app:v1 .", result: "Image demo-app:v1" },
      { label: "Command", code: "docker run --name demo-app -p 3000:3000 demo-app:v1", result: "App reachable from host" },
    ],
    layout: "exercise",
    tone: "teal",
  },
  {
    section: "Exercise",
    kicker: "Lab 3",
    title: "Full stack với example-app",
    body: "Lab này chạy một web app nhỏ có API, Postgres, Redis, Prometheus và Grafana bằng Docker Compose.",
    keyMessage: "Một Compose stack có thể mô tả ứng dụng nhiều service cùng dependency môi trường chạy, network nội bộ và volume dữ liệu.",
    points: ["API", "Postgres", "Redis", "Monitoring"],
    details: [
      { label: "Mục tiêu", text: "Chạy toàn bộ stack trong Day2/example-app và quan sát service qua UI, health check và dashboard." },
      { label: "Expected output", text: "App mở ở localhost:3000, Prometheus ở 9090 và Grafana ở 3001." },
    ],
    checklist: [
      "cd Day2/example-app",
      "Chạy docker compose up --build",
      "Tạo order mới trên web UI",
      "Mở /health và /metrics",
      "Xem dashboard Orders App trong Grafana",
    ],
    commands: [
      { label: "Command", code: "cd Day2/example-app\ndocker compose up --build", result: "API, Postgres, Redis, Prometheus, Grafana cùng chạy" },
      { label: "Expected result", code: "http://localhost:3000", result: "Orders App hiển thị và tạo được order" },
      { label: "Monitoring", code: "http://localhost:3001", result: "Grafana dashboard Orders App" },
    ],
    layout: "exercise",
    tone: "slate",
  },
  {
    section: "Wrap-up",
    kicker: "Sau workshop",
    title: "Sau buổi này bạn đã biết",
    body: "Docker không cần học hết trong một buổi. Mục tiêu hôm nay là có mental model đúng và đủ tự tin thực hành tiếp.",
    keyMessage: "Nền tảng Docker bao gồm khả năng hiểu artifact, môi trường chạy, network, cấu hình và vòng đời container.",
    points: ["Container", "Image", "Dockerfile", "Debug"],
    details: [
      { label: "Bạn đã biết", text: "Docker giải quyết vấn đề môi trường, image khác container thế nào, và port mapping hoạt động ra sao." },
      { label: "Học tiếp", text: "Tập viết Dockerfile tốt hơn, dùng Docker Compose và hiểu registry/publish image." },
    ],
    checklist: [
      "Giải thích Docker dùng để làm gì",
      "Chạy container bằng docker run",
      "Build image từ Dockerfile",
      "Map port và đọc logs",
      "Dọn dẹp container/image local",
    ],
    roadmap: ["Docker Compose", "Multi-stage build", "Docker Hub/Registry", "Security basics"],
    layout: "closing",
    tone: "slate",
  },
];

const setupSlides = slideDefinitions.filter((slide) => slide.section === "Setup");
const nonSetupSlides = slideDefinitions.slice(1).filter((slide) => slide.section !== "Setup");

export const slides = [slideDefinitions[0], ...setupSlides, ...nonSetupSlides];

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

  if (isNext) return getNextSlideIndex(index);
  if (isPrevious) return getPreviousSlideIndex(index);
  if (event.key === "Home") return 0;
  if (event.key === "End") return slides.length - 1;

  return clampSlideIndex(index);
}
