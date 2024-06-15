# Pokemon App

## Mô tả

Ứng dụng Pokemon này cho phép bạn xem danh sách các Pokemon, sắp xếp theo số hiệu, chỉ số,lọc theo loại và xem chi tiết thông tin của từng Pokemon. Ứng dụng được phát triển bằng Angular 18, sử dụng Pokemon API [https://documenter.getpostman.com/view/24788471/2s946k6Aop] và không sử dụng bất kì thư viện hay module nào bên ngoài.
Ứng dụng được push trên nền tảng vercel: https://pokemon-interview.vercel.app/pokemon
\*Lưu ý: Ứng dụng đã được làm delay call api 1s nhằm trải nghiệm spinner

## Tính năng

- Danh sách Pokemon có thể sắp xếp theo:
  - Số hiệu (tăng dần/giảm dần)
  - Chỉ số (total, hp, attack, defense, sp_atk, sp_def, speed) (tăng dần/giảm dần)
- Sắp xếp Loại Pokemon
- Hiển thị popup chi tiết khi click vào Pokemon
- Spinner-loader khi tải dữ liệu
- Thiết kế responsive cho các thiết bị khác nhau (mobile, tablet, desktop)

## Hướng dẫn cài đặt và chạy ứng dụng

1. **Cài đặt Node.js và npm:**

   - Tải xuống và cài đặt Node.js từ trang web chính thức: [https://nodejs.org/](https://nodejs.org/)
   - Npm sẽ được cài đặt cùng với Node.js.

2. **Clone repository:**

   - Clone repository của ứng dụng Pokemon vào máy tính của bạn bằng lệnh:
     ```bash
     git clone https://github.com/buingoclam147/pokemon-interview
     ```

3. **Cài đặt các dependency:**

   - Mở terminal và chuyển đến thư mục của ứng dụng.
   - Chạy lệnh:
     ```bash
     npm install
     ```

4. **Chạy ứng dụng:**

   - Chạy lệnh:
     ```bash
     ng serve
     ```
   - Ứng dụng sẽ được chạy trên trình duyệt web tại địa chỉ `http://localhost:4200/`.

5. **Build ứng dụng:**
   - Chạy lệnh:
     ```bash
     ng build
     ```
   - Ứng dụng sẽ được build và tạo ra các file HTML, CSS, JavaScript trong thư mục `dist`.

## Ví dụ hình ảnh

![alt text](https://github.com/buingoclam147/pokemon-interview/blob/master/src/assets/images/Screenshot_1.png)
![alt text](https://github.com/buingoclam147/pokemon-interview/blob/master/src/assets/images/Screenshot_2.png)
![alt text](https://github.com/buingoclam147/pokemon-interview/blob/master/src/assets/images/Screenshot_3.png)
![alt text](https://github.com/buingoclam147/pokemon-interview/blob/master/src/assets/images/Screenshot_4.png)
![alt text](https://github.com/buingoclam147/pokemon-interview/blob/master/src/assets/images/Screenshot_5.png)
![alt text](https://github.com/buingoclam147/pokemon-interview/blob/master/src/assets/images/Screenshot_6.png)

## Ghi chú

- Các ảnh minh họa có thể được thay thế bằng các ảnh phù hợp với ứng dụng của bạn.
- Bạn có thể thay đổi nội dung README.md cho phù hợp với dự án của mình.

## Liên hệ

Bùi Ngọc Lâm
buingoclam00@gmail.com
