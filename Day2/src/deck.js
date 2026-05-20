const slideDefinitions = [
  {
    section: "Khóa học",
    kicker: "Tổng quan",
    title: "Docker cơ bản cho người mới",
    body: "",
    keyMessage: "Docker là nền tảng giúp build, chạy và chia sẻ ứng dụng bằng container để môi trường triển khai nhất quán hơn.",
    hideKeyMessage: true,
    hideEyebrow: true,
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
    body: "Container là một gói chạy app, bên trong có app và những thứ cần thiết để app chạy ổn định ở nhiều môi trường, nhưng không mang cả hệ điều hành đầy đủ.",
    keyMessage: "Container gói app, dependency và cấu hình chạy vào cùng một đơn vị, nhờ vậy app dễ mang sang máy khác và chạy nhất quán hơn.",
    hideKeyMessage: true,
    points: ["App", "Dependency", "Cấu hình", "Chạy nhất quán"],
    details: [
      { label: "Tóm tắt", text: "Container là cách đóng gói app cùng dependency và cấu hình chạy, để app dễ mang sang máy khác và ít lỗi do thiếu môi trường, container nhẹ hơn vì không mang cả hệ điều hành đầy đủ." },
    ],
    visual: "analogy",
    layout: "concept",
    tone: "docker",
  },
  {
    section: "Concept",
    kicker: "Ba từ khóa chính",
    title: "Dockerfile, Image, Container",
    body: "Ba khái niệm này thường đi theo một dòng: viết Dockerfile, build hoặc tải Image, rồi chạy Image thành Container.",
    keyMessage: "Dockerfile mô tả cách build, Image là gói bất biến có thể build từ Dockerfile hoặc tải từ registry, Container là bản đang chạy từ image.",
    hideKeyMessage: true,
    points: ["Dockerfile", "Image", "Container"],
    details: [
      { label: "Dockerfile", text: "File hướng dẫn Docker cách tạo image, gồm base image, copy code, cài dependency và command mặc định." },
      { label: "Image", text: "Gói bất biến dùng để tạo container, có thể build từ Dockerfile hoặc tải từ registry như Docker Hub." },
      { label: "Container", text: "Bản đang chạy từ image, có trạng thái, log, port, env và vòng đời riêng." },
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
      { label: "Lưu ý", text: "Cần mở Docker Desktop trước khi sử dụng để start engine." },
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
    keyMessage: "Docker Engine on Linux là phần lõi chạy container, Docker CLI là lệnh docker, Docker Compose giúp chạy nhiều container cùng lúc.",
    points: ["Chọn bản Linux", "Cài Engine", "Cài CLI", "Verify"],
    details: [
      { label: "Official docs", text: "https://docs.docker.com/engine/install/" },
      { label: "Ghi nhớ", text: "Không copy lệnh giữa các bản Linux, Ubuntu, Debian, Fedora và CentOS có hướng dẫn riêng." },
    ],
    commands: [
      { label: "Docs", code: "https://docs.docker.com/engine/install/", result: "Chọn đúng bản Linux đang dùng" },
      { label: "Verify", code: "docker --version\ndocker compose version\ndocker run hello-world", result: "Engine, Compose plugin và môi trường chạy container hoạt động" },
    ],
    layout: "command",
    tone: "teal",
  },
  {
    section: "Docker CLI",
    kicker: "Image & container",
    title: "Docker CLI",
    body: "",
    keyMessage: "Các lệnh Docker CLI cơ bản giúp kiểm tra phiên bản, tải image, build image, chạy container và quản lý tài nguyên local.",
    hideKeyMessage: true,
    commandReference: true,
    points: ["Kiểm tra", "Image", "Run", "Lifecycle"],
    details: [
      { label: "Image", text: "Image là gói bất biến có thể build hoặc tải từ registry, dùng làm khuôn để tạo container." },
      { label: "Container", text: "Container là bản đang chạy từ image, có tên, trạng thái, port và log riêng." },
    ],
    commands: [
      { label: "Version", code: "docker --version", resultLabel: "Chức năng", result: "Kiểm tra Docker CLI đã được cài và xem version đang dùng." },
      { label: "Compose version", code: "docker compose version", resultLabel: "Chức năng", result: "Kiểm tra Docker Compose plugin đã sẵn sàng để chạy nhiều service." },
      { label: "Pull image", code: "docker pull nginx:alpine", resultLabel: "Chức năng", result: "Tải image có sẵn từ registry về máy local." },
      { label: "List images", code: "docker images", resultLabel: "Chức năng", result: "Liệt kê image local, gồm repository, tag, image id và dung lượng." },
      { label: "Build image", code: "docker build -t demo-api .", resultLabel: "Chức năng", result: "Build image mới từ Dockerfile trong thư mục hiện tại." },
      { label: "Run container", code: "docker run --name web -p 8080:80 nginx:alpine", resultLabel: "Chức năng", result: "Tạo container từ image và map port container ra máy host, lệnh này chạy foreground." },
      { label: "Run background", code: "docker run -d --name api -p 3000:3000 demo-api", resultLabel: "Chức năng", result: "Chạy container ở chế độ nền để tiếp tục dùng terminal." },
      { label: "Stop/remove", code: "docker stop web\ndocker rm web", resultLabel: "Chức năng", result: "Dừng container đang chạy rồi xóa container khi không cần nữa." },
      { label: "Remove image", code: "docker rmi demo-api", resultLabel: "Chức năng", result: "Xóa image local sau khi container dùng image đó đã được dừng và xóa." },
    ],
    layout: "command",
    tone: "docker",
  },
  {
    section: "Docker CLI",
    kicker: "Debug & cleanup",
    title: "Docker debug",
    body: "",
    keyMessage: "Các lệnh debug giúp xem trạng thái container, đọc log, kiểm tra cấu hình, vào shell và dọn network, volume hoặc system cache.",
    hideKeyMessage: true,
    commandReference: true,
    points: ["Trạng thái", "Logs", "Inspect", "Compose"],
    details: [
      { label: "Debug", text: "Bắt đầu bằng trạng thái và log, sau đó mới vào container hoặc inspect cấu hình chi tiết." },
      { label: "Cleanup", text: "Dọn container, image, network hoặc volume khi môi trường local bị rối." },
    ],
    commands: [
      { label: "Running containers", code: "docker ps", resultLabel: "Chức năng", result: "Xem các container đang chạy và port đang được publish." },
      { label: "All containers", code: "docker ps -a", resultLabel: "Chức năng", result: "Xem cả container đã dừng, exited hoặc lỗi khi start." },
      { label: "Logs", code: "docker logs <container>", resultLabel: "Chức năng", result: "Đọc stdout và stderr của app bên trong container." },
      { label: "Follow logs", code: "docker logs -f <container>", resultLabel: "Chức năng", result: "Theo dõi log realtime khi đang gửi request hoặc debug lỗi." },
      { label: "Shell", code: "docker exec -it <container> sh", resultLabel: "Chức năng", result: "Mở shell trong container để kiểm tra file, env hoặc network, nếu image có shell." },
      { label: "Inspect", code: "docker inspect <container>", resultLabel: "Chức năng", result: "Xem chi tiết cấu hình container như port, env, mount và network." },
      { label: "Stats", code: "docker stats", resultLabel: "Chức năng", result: "Theo dõi CPU, memory và network của container đang chạy." },
      { label: "Volumes", code: "docker volume ls", resultLabel: "Chức năng", result: "Liệt kê volume Docker đang quản lý trên máy local." },
      { label: "Networks", code: "docker network ls", resultLabel: "Chức năng", result: "Liệt kê network Docker, hữu ích khi kiểm tra kết nối giữa container." },
      { label: "Prune", code: "docker system prune", resultLabel: "Chức năng", result: "Dọn tài nguyên Docker không còn dùng, cần đọc prompt trước khi xác nhận vì có thể xóa cache, network hoặc image không dùng." },
    ],
    layout: "command",
    tone: "teal",
  },
  {
    section: "Docker CLI",
    kicker: "Compose",
    title: "Docker Compose",
    body: "",
    keyMessage: "Docker Compose dùng cho app nhiều service, ví dụ API, database, cache và monitoring, tất cả được điều khiển từ compose.yaml.",
    hideKeyMessage: true,
    commandReference: true,
    points: ["Start", "Status", "Logs", "Cleanup"],
    details: [
      { label: "Service", text: "Một service là một thành phần trong compose.yaml, ví dụ api, postgres, redis hoặc grafana." },
      { label: "Compose project", text: "Một Compose project là bộ service chạy cùng network, volume và cấu hình trong compose.yaml." },
    ],
    commands: [
      { label: "Validate config", code: "docker compose config", resultLabel: "Chức năng", result: "Kiểm tra compose.yaml sau khi merge biến môi trường và default." },
      { label: "Build", code: "docker compose build", resultLabel: "Chức năng", result: "Build image cho các service có khai báo build context." },
      { label: "Start services", code: "docker compose up -d", resultLabel: "Chức năng", result: "Tạo network, volume, container và chạy các service Compose ở chế độ nền." },
      { label: "Rebuild start", code: "docker compose up --build -d", resultLabel: "Chức năng", result: "Build lại image rồi start các service Compose, hữu ích sau khi sửa code." },
      { label: "Status", code: "docker compose ps", resultLabel: "Chức năng", result: "Xem trạng thái container thuộc Compose project hiện tại." },
      { label: "Logs", code: "docker compose logs api --tail=40", resultLabel: "Chức năng", result: "Xem log service api với số dòng gần nhất để debug nhanh." },
      { label: "Exec", code: "docker compose exec api sh", resultLabel: "Chức năng", result: "Vào shell của service api đang chạy, nếu image của service có shell." },
      { label: "Restart", code: "docker compose restart api", resultLabel: "Chức năng", result: "Restart một service mà không cần dừng toàn bộ Compose project." },
      { label: "Stop", code: "docker compose stop", resultLabel: "Chức năng", result: "Dừng container của Compose project nhưng giữ lại container và network." },
      { label: "Down", code: "docker compose down", resultLabel: "Chức năng", result: "Dừng và xóa container, network của Compose project." },
      { label: "Down volumes", code: "docker compose down -v", resultLabel: "Chức năng", result: "Dừng Compose project và xóa cả volume, chỉ dùng khi muốn reset dữ liệu local." },
    ],
    layout: "command",
    tone: "docker",
  },
  {
    section: "Demo",
    kicker: "Example app",
    title: "Bật demo bằng Compose",
    body: "",
    keyMessage: "Một lệnh Compose có thể build image, tạo network, tạo container và khởi động nhiều service phụ thuộc nhau.",
    points: ["Open folder", "Build", "Start", "Check"],
    details: [],
    commands: [
      { label: "Start services", code: "cd Day2/example-app\ndocker compose up --build -d", result: "API, Postgres, Redis, Prometheus và Grafana chạy nền" },
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
    body: "Sau khi các service chạy, mình dùng endpoint của example app để kiểm tra health, tạo dữ liệu mới và thấy Redis cache hoạt động qua stats.",
    keyMessage: "Demo API cho thấy container không chạy một mình: request đi qua API, ghi vào Postgres và dùng Redis để cache thống kê.",
    points: ["Health", "Create order", "Stats", "Cache"],
    details: [],
    commands: [
      { label: "Health", code: "cd Day2/example-app\ncurl.exe http://localhost:3000/health\n# Linux/macOS: curl http://localhost:3000/health", result: "JSON status ok, database ok, redis ok" },
      { label: "Create order", code: "cd Day2/example-app\ncurl.exe -X POST http://localhost:3000/api/orders -H \"Content-Type: application/json\" -d \"{\\\"customer\\\":\\\"Demo team\\\",\\\"item\\\":\\\"Docker lab\\\",\\\"quantity\\\":2}\"\n# Linux/macOS: dùng curl thay cho curl.exe", result: "API trả về order mới với status created" },
      { label: "Stats", code: "cd Day2/example-app\ncurl.exe http://localhost:3000/api/stats\n# Linux/macOS: curl http://localhost:3000/api/stats", result: "total_orders và total_items tăng lên" },
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
    title: "Xem logs, metrics và cleanup",
    body: "Phần cuối demo dùng chính container đang chạy để xem logs API, mở metrics cho Prometheus và dọn các service Compose sau buổi học.",
    keyMessage: "Vận hành container cần quan sát được log, metrics, trạng thái service và có lệnh cleanup rõ ràng.",
    points: ["Logs", "Metrics", "Grafana", "Cleanup"],
    details: [
      { label: "Logs", text: "docker compose logs api cho biết request đã đi vào API và lỗi nằm ở service nào nếu demo fail." },
      { label: "Metrics", text: "Endpoint /metrics là dữ liệu Prometheus scrape, Grafana đọc Prometheus để vẽ dashboard." },
    ],
    commands: [
      { label: "Logs", code: "cd Day2/example-app\ndocker compose logs api --tail=40", result: "Log startup và request API gần nhất" },
      { label: "Metrics", code: "cd Day2/example-app\ncurl.exe http://localhost:3000/metrics\n# Linux/macOS: curl http://localhost:3000/metrics", result: "Prometheus metrics của API" },
      { label: "Cleanup", code: "cd Day2/example-app\ndocker compose down", result: "Dừng và xóa container/network của Compose project" },
    ],
    layout: "command",
    tone: "docker",
  },
  {
    section: "Operations",
    kicker: "Debug cơ bản",
    title: "Khi container không chạy",
    body: "",
    keyMessage: "Debug container dựa trên việc quan sát trạng thái đang chạy, log tiến trình, cấu hình network và metadata của container.",
    points: ["ps", "logs", "inspect", "exec"],
    details: [
      { label: "docker ps -a", text: "Xem container đang chạy hoặc đã exit." },
      { label: "docker logs", text: "Xem stdout/stderr của app bên trong container." },
      { label: "docker inspect", text: "Xem cấu hình chi tiết như port, env, mount và network." },
      { label: "docker exec", text: "Mở shell trong container đang chạy để kiểm tra nhanh, nếu image có shell." },
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
    keyMessage: "Image nên giữ tính bất biến, dữ liệu khi app đang chạy và cấu hình môi trường nên được tách khỏi artifact đóng gói.",
    points: ["Volume", "Bind mount", "Env", "Secret"],
    details: [
      { label: "Volume", text: "Nơi Docker quản lý để lưu dữ liệu bền hơn vòng đời container." },
      { label: "Bind mount", text: "Map thư mục từ host vào container, hữu ích khi dev local." },
      { label: "Env", text: "Truyền cấu hình như PORT, NODE_ENV hoặc DATABASE_URL khi run." },
      { label: "Secret", text: "Không hard-code password/token trong Dockerfile hoặc image, production nên dùng secret store của platform thay vì lưu thẳng trong code." },
    ],
    visual: "analogy",
    layout: "concept",
    tone: "orange",
  },
  {
    section: "Compose",
    kicker: "Nhiều container",
    title: "Docker Compose chạy nhiều service",
    body: "Khi app cần nhiều container như web, API và database, Compose giúp mô tả tất cả trong một file compose.yaml.",
    keyMessage: "Docker Compose là lớp điều phối cục bộ mô tả nhiều service container và cách chúng chạy cùng nhau.",
    points: ["compose.yaml", "Services", "Network", "Volume"],
    details: [
      { label: "Dùng khi nào", text: "Khi local dev cần nhiều service chạy cùng nhau, ví dụ app + database + cache." },
      { label: "Ghi nhớ", text: "Dockerfile mô tả cách build một image, compose.yaml mô tả cách chạy nhiều container." },
    ],
    commands: [
      {
        label: "compose.yaml",
        code: "services:\n  web:\n    image: nginx:alpine\n    ports:\n      - \"8080:80\"",
        result: "Một service web được mô tả bằng YAML",
      },
      { label: "Command", code: "docker compose up -d", result: "Tạo network và chạy service nền" },
      { label: "Cleanup", code: "docker compose down", result: "Dừng và xóa container/network của Compose project" },
    ],
    layout: "command",
    tone: "teal",
  },
];

const setupSlides = slideDefinitions.filter((slide) => slide.section === "Setup");
const demoSlides = slideDefinitions.filter((slide) => slide.section === "Demo");
const coreSlides = slideDefinitions
  .slice(1)
  .filter((slide) => slide.section !== "Setup" && slide.section !== "Demo");

export const slides = [slideDefinitions[0], ...setupSlides, ...coreSlides, ...demoSlides];

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
