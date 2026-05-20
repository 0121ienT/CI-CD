# Đề bài thực hành — CI/CD, Docker & Jenkins cho ML/Data

Hai bài tập dưới đây được dùng cho toàn bộ các nhóm trong buổi học. Mỗi nhóm sẽ chạy cả hai bài trên một EC2 riêng (gợi ý `t3.large`, 8 GB RAM, 40 GB EBS gp3, Ubuntu 22.04 hoặc Amazon Linux 2023, đã cài sẵn Docker + Docker Compose plugin + git).

- **Thời lượng đề xuất:** Bài 1 khoảng 60–75 phút, Bài 2 khoảng 90–120 phút.
- **Thứ tự khuyến nghị:** làm Bài 1 trước để quen với Docker, sau đó qua Bài 2.
- **Hình thức nộp:** xem mục [Sản phẩm cần nộp](#sản-phẩm-cần-nộp) ở cuối file.

---

## Yêu cầu môi trường chung

| Hạng mục | Yêu cầu |
|---|---|
| OS | Linux x86_64 (Ubuntu 22.04 / Amazon Linux 2023) hoặc Windows + WSL 2 |
| Docker | Docker Engine ≥ 24, Docker Compose plugin v2 |
| Tài khoản | GitHub (để push code), Docker Hub miễn phí (để push image ở Bài 2) |
| Port mở | 22 (SSH), 3000 (App), 3001 (Grafana), 8081 (Jenkins), 9090 (Prometheus) |
| Repo | Đã `git clone` repo `ml-data-engineering` về máy/EC2 |

Mỗi nhóm nên tạo một branch riêng: `git checkout -b group-XX` để tránh đụng lịch sử của nhau.

---

## Bài 1 — Docker Compose Orders App (Day 2)

Thư mục bài tập: `Day2/example-app/`. App có 5 service: `api` (Node + Express), `postgres`, `redis`, `prometheus`, `grafana`.

### Mục tiêu

- Khởi động được một hệ thống multi-container bằng một lệnh Compose duy nhất.
- Hiểu luồng request đi qua API → Postgres để ghi dữ liệu → Redis để cache.
- Quan sát được metrics của API trong Prometheus và Grafana.
- Biết cách đọc log, exec vào container và cleanup sau khi xong.

### Phần phải làm (must-do)

1. `cd Day2/example-app` rồi `docker compose up --build -d`.
2. Kiểm tra trạng thái: `docker compose ps`. Đảm bảo `postgres` và `redis` ở trạng thái `healthy`, `api` đang `running`.
3. Mở `http://<host>:3000` trong browser, tạo thử 2–3 order qua UI.
4. Gọi API bằng `curl` (hoặc `curl.exe` trên Windows):
   - `GET /health` → kết quả mong đợi: `status: ok`, `database: ok`, `redis: ok`.
   - `POST /api/orders` với body JSON gồm `customer`, `item`, `quantity` → trả về order vừa tạo.
   - `GET /api/stats` → `total_orders` và `total_items` tăng dần.
5. Xem log của service api: `docker compose logs api --tail=40`. Tìm dòng tương ứng với các request bạn vừa gửi.
6. Vào shell của postgres: `docker compose exec postgres psql -U app -d orders_app -c "SELECT * FROM orders;"`. Đối chiếu với output của `/api/stats`.
7. Mở Grafana (`http://<host>:3001`, tài khoản `admin / admin`), tìm dashboard "Orders app" và quan sát biểu đồ request rate, latency.
8. Cleanup: `docker compose down`. Nếu muốn reset cả dữ liệu, dùng `docker compose down -v`.

### Câu hỏi cần trả lời (ghi vào báo cáo)

- Service nào phải healthy trước thì `api` mới start được? Vì sao Compose biết điều đó?
- Khi `docker compose down` (không có `-v`), dữ liệu order còn không? Vì sao?
- Endpoint `/metrics` trả về dạng gì, ai là người consume nó?
- Nếu bạn thay đổi code trong `src/server.js`, lệnh nào cần chạy để image có code mới?

### Mở rộng (nếu còn thời gian)

- Đổi cổng public của API từ 3000 sang 3010 trong `docker-compose.yaml` và verify lại.
- Thêm một biến môi trường mới (vd `APP_GREETING`) vào service `api`, log nó ra khi khởi động.
- Viết một dashboard Grafana đơn giản hiển thị số order tạo mới trong 5 phút gần nhất.

---

## Bài 2 — Pipeline Jenkins cho House Price Prediction (Day 1)

Thư mục bài tập: `exercise/jenkins_tutorial/`. App là FastAPI phục vụ một model `scikit-learn / lightgbm` để dự đoán giá nhà.

### Mục tiêu

- Hiểu cách Jenkins chạy pipeline gồm 3 stage: Test → Build → Deploy.
- Build được Docker image cho app FastAPI và push lên Docker Hub.
- Tự sửa được `Jenkinsfile` để map đúng tài khoản Docker Hub của mình.
- Quan sát được vai trò của credentials và Docker-in-Docker trong Jenkins.

### Phần phải làm (must-do)

1. **Khởi động Jenkins**
   - `cd exercise/jenkins_tutorial`
   - `docker compose -f docker-compose.yaml up -d`
   - Chờ ~30 giây, sau đó truy cập `http://<host>:8081`.
   - Lấy initial admin password: `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`.
   - Unlock, chọn "Install suggested plugins", tạo user admin của nhóm.

2. **Cấu hình credentials Docker Hub**
   - Manage Jenkins → Credentials → System → Global → Add Credentials.
   - Kind: Username with password. Username = tài khoản Docker Hub. Password = access token (tạo ở Docker Hub → Account Settings → Security → New Access Token).
   - **ID phải đặt đúng là `dockerhub`** (vì `Jenkinsfile` đang đọc đúng id này).

3. **Sửa `Jenkinsfile`**
   - Mở file `Jenkinsfile`, đổi `registry = 'quandvrobusto/house-price-prediction-api'` thành `<docker-hub-user-cua-nhom>/house-price-prediction-api`.
   - Commit và push lên branch của nhóm.

4. **Tạo Jenkins Pipeline**
   - New Item → tên `house-price-pipeline` → Pipeline.
   - Pipeline → Definition: "Pipeline script from SCM" → SCM: Git → URL repo của nhóm, branch `group-XX`, script path `exercise/jenkins_tutorial/Jenkinsfile`.
   - Save → Build Now.

5. **Quan sát pipeline**
   - Stage Test: cài `requirements.txt` và chạy `pytest tests/test_model_correctness.py`. Pass khi model trả ra giá đúng `157551.3761237591`.
   - Stage Build: `docker build` + push image với 2 tag (`$BUILD_NUMBER` và `latest`).
   - Stage Deploy: hiện tại chỉ `echo`, không deploy thật.

6. **Verify trên Docker Hub**
   - Vào Docker Hub, xác nhận repo `house-price-prediction-api` đã có 2 tag mới.

7. **Chạy thử app từ image vừa build**
   - `docker run -d -p 30001:30000 --name house-api <docker-hub-user>/house-price-prediction-api:latest`
   - Chạy `python client.py` (cần `pip install requests` trước) → expect JSON `{"price": ...}`.
   - Cleanup: `docker rm -f house-api`.

### Câu hỏi cần trả lời

- Vì sao `docker-compose.yaml` của Jenkins mount `/var/run/docker.sock` và chạy với `privileged: true`? Rủi ro là gì?
- Nếu pipeline fail ở stage Test, image có được push lên Docker Hub không? Vì sao?
- Trong `Jenkinsfile`, đoạn `agent { docker { image 'python:3.8' } }` của stage Test khác gì so với `agent any`?
- Nếu credential `dockerhub` cấu hình sai password, stage nào sẽ fail trước, lỗi xuất hiện ở đâu?

### Mở rộng (nếu còn thời gian)

- Thử chạy `Jenkinsfile-helloworld` để xem stage `input "Approve?"` hoạt động ra sao (manual gate trước khi deploy).
- Thử `Jenkinsfile-parallel` để xem 2 job test chạy song song trên cùng stage.
- Bổ sung stage `Notify` gửi message khi build fail (ví dụ in ra log với `currentBuild.result`).

---

## Bài tập nhỏ trong slide (Day 1)

Trên slide cuối Day 1 ("Checklist"), mỗi nhóm dành ~5 phút trả lời nhanh dựa trên `Jenkinsfile` ở Bài 2:

- Pipeline có những stage nào, mỗi stage làm gì?
- Nếu stage Test fail, log sẽ hiển thị gì để giúp bạn debug nhanh?
- Artifact cuối cùng được tạo ra là gì, lưu ở đâu?

---

## Sản phẩm cần nộp

Mỗi nhóm tạo một thư mục `submissions/group-XX/` trong branch của nhóm và bỏ vào:

1. `report.md` — trả lời các câu hỏi của Bài 1 và Bài 2 (ngắn gọn, gạch đầu dòng được).
2. `screenshots/` — chụp lại:
   - `docker compose ps` của Bài 1 lúc tất cả service healthy.
   - Dashboard Grafana sau khi tạo order.
   - Pipeline Jenkins ở trạng thái pass cả 3 stage.
   - Trang Docker Hub có image của nhóm.
3. `Jenkinsfile-final` — Jenkinsfile cuối cùng nhóm đã sửa (nếu có thay đổi ngoài tên registry).
4. (Nếu có) ghi chú phần mở rộng nhóm đã thử.

Sau đó push branch và mở Pull Request về `main` với tiêu đề `[group-XX] Submission`.

---

## Tiêu chí chấm

| Hạng mục | Trọng số | Đạt khi |
|---|---|---|
| Bài 1 chạy thành công đầy đủ 8 bước must-do | 30% | Có screenshot + dashboard Grafana hoạt động |
| Bài 2 pipeline pass cả 3 stage và image lên Docker Hub | 40% | Có screenshot pipeline + link Docker Hub |
| Trả lời đúng các câu hỏi trong báo cáo | 20% | Báo cáo nêu đúng cơ chế (depends_on, volume, credential, docker socket) |
| Phần mở rộng | 10% | Hoàn thành ≥ 1 mục mở rộng ở mỗi bài |

---

## Khi gặp lỗi — checklist debug nhanh

- Container không lên: `docker compose ps` → `docker compose logs <service>` → đọc lỗi đầu tiên (không phải lỗi cuối).
- Port đụng: đổi mapping bên trái dấu `:` trong `ports`, không đụng vào port trong container.
- Jenkins không build được image: kiểm tra `/var/run/docker.sock` đã mount chưa, user trong container có nằm trong group docker không.
- Pipeline fail ở `docker.withRegistry`: thường là sai credential id hoặc access token Docker Hub hết hạn.
- `pytest` fail với `ModuleNotFoundError`: chạy lại với `pip install -r requirements.txt` trước, kiểm tra Python đúng 3.8.
- Hết disk trên EC2: `docker system prune -a` (đọc kỹ prompt) hoặc `docker compose down -v` để xoá volume.
