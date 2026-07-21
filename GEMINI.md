# Khái quát Dự án (Project Context)

- **Tên dự án:** BASE_CODE.
- **Mục tiêu:** Xây dựng hệ thống Quản lý Phê duyệt (Approval Management) trên nền tảng Web nhằm tăng khả năng quản lý tập trung, dễ triển khai và thuận tiện cho việc bảo trì, mở rộng.
- **Mô hình:** Hệ thống hoạt động theo kiến trúc Client - Server, trong đó Frontend và Backend tách biệt hoàn toàn. Frontend giao tiếp với Backend thông qua RESTful API và toàn bộ dữ liệu được lưu trữ trên cơ sở dữ liệu MariaDB.
- **Ngôn ngữ giao tiếp với AI:** Luôn ưu tiên giải thích code, comment và hướng dẫn bằng Tiếng Việt.
- **Đa ngôn ngữ (i18n):** Toàn bộ giao diện phải hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh, Tiếng Hàn). Khi tạo giao diện mới, mọi chuỗi hiển thị phải được bọc bằng thư viện `react-i18next`, tuyệt đối không hardcode text.

# Chức năng chính của hệ thống

- Đăng nhập và phân quyền người dùng.
- Quản lý quy trình phê duyệt (Approval Workflow).
- Quản lý người dùng, vai trò và phân quyền.
- Quản lý danh mục: Nhà máy (Factory), Bộ phận (Department).
- Quản lý lịch sử thao tác và nhật ký hệ thống.
- Hỗ trợ import/export dữ liệu Excel.
- Hiển thị dữ liệu theo thời gian thực thông qua RESTful API.

# Quy chuẩn Frontend (React + Vite)

- **Tech Stack:** React + Vite.
- **Ngôn ngữ:** JavaScript (ES6+) hoặc TypeScript (nếu dự án sử dụng).
- **Styling:** Bắt buộc sử dụng **CSS Modules** (`.module.css`) cho từng component nhằm tránh xung đột CSS.
- **UI/UX:** Thiết kế theo phong cách Dashboard hiện đại, tối ưu cho màn hình lớn trong môi trường nhà máy, giao diện trực quan, thao tác nhanh và dễ sử dụng.
- **Component Structure:** Tách biệt rõ ràng giữa UI Components, Custom Hooks, Services và Business Logic.
- **State Management:** Ưu tiên React Context hoặc Redux Toolkit nếu dữ liệu dùng chung nhiều màn hình.
- **API:** Toàn bộ dữ liệu lấy từ Backend thông qua RESTful API. Luôn kiểm tra đúng tiền tố `/api` và xử lý đầy đủ các trường hợp Success, Error, Unauthorized và Timeout.
- **Routing:** Sử dụng React Router và phân quyền theo từng Route.
- **Permission:** Menu và chức năng hiển thị dựa trên quyền của người dùng sau khi đăng nhập.
- **Responsive:** Ưu tiên giao diện Desktop, đồng thời đảm bảo hiển thị tốt trên các độ phân giải phổ biến.

# Quy chuẩn Backend (Node.js)

- **Tech Stack:** Node.js + Express.js.
- **Database:** MariaDB.
- **API Design:** Tuân thủ chuẩn RESTful API.
- **Authentication:** JWT Authentication.
- **Authorization:** Phân quyền theo Role (Admin, User,...).
- **Validation:** Kiểm tra dữ liệu đầu vào tại Backend trước khi xử lý.
- **Error Handling:** Trả về mã HTTP chuẩn cùng thông báo lỗi rõ ràng.
- **Deployment:** Server chạy trên môi trường Windows.
- **Logging:** Thiết kế log đơn giản, dễ đọc, tập trung vào việc hỗ trợ kiểm tra lỗi và theo dõi thao tác người dùng.

# Quy chuẩn Database (MariaDB)

- **Hệ quản trị:** MariaDB.
- **Quy tắc đặt tên bảng (Table Name):**
  - Tất cả **viết HOA** (UPPERCASE).
  - Các từ phân cách nhau bằng dấu gạch dưới `_`.
  - Ví dụ: `USER_INFO`, `APPROVAL_REQUEST`, `FACTORY_MASTER`.
- **Quy tắc đặt tên trường (Column Name):**
  - Tất cả **viết HOA** (UPPERCASE).
  - Tất cả các từ **viết liền, không có dấu phân cách**.
  - Ví dụ: `USERID`, `FULLNAME`, `CREATEDAT`, `APPROVALSTATUS`, `FACTORYID`.
- **Bắt buộc tuân thủ:** Khi sinh SQL, tạo migration, hoặc viết query — luôn áp dụng đúng chuẩn đặt tên này. Không dùng camelCase, snake_case hay dấu gạch dưới trong tên trường.

# Cấu trúc hệ thống

Frontend (React)
        │
        ▼
RESTful API
        │
        ▼
Backend (Node.js)
        │
        ▼
MariaDB

# Nguyên tắc Sinh mã (Code Generation Rules)

- Trước khi viết code, luôn phân tích ngắn gọn hướng giải quyết.
- Chỉ cung cấp những đoạn code cần sửa hoặc bổ sung, không in lại toàn bộ file nếu không cần thiết.
- Luôn đảm bảo code dễ đọc, dễ bảo trì và tuân thủ cấu trúc dự án.
- Ưu tiên tái sử dụng component và custom hooks, tránh lặp code.
- Không hardcode chuỗi hiển thị; luôn sử dụng `react-i18next`.
- Khi gọi API, luôn xử lý đầy đủ Loading, Success, Error và Unauthorized.
- Luôn kiểm tra lỗi cú pháp, import/export, cấu trúc JSON và endpoint API trước khi trả lời.
- Ưu tiên viết code theo Clean Code và SOLID, đặt tên biến, hàm và component rõ ràng, thống nhất.
- Khi viết SQL hoặc định nghĩa schema — bắt buộc tuân thủ quy chuẩn đặt tên Database đã định nghĩa ở trên.