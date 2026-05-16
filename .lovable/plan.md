# Kế hoạch: Thay video Replit bằng Lovable Cloud Storage

## Mục tiêu
Bỏ iframe trỏ tới `...pike.replit.dev/video-ads` ở trang `/sach`. Thay bằng file MP4 lưu trên Lovable Cloud Storage để video không bao giờ biến mất khi tắt Replit.

## Các bước thực hiện

### Bước 1 — Tạo storage bucket công khai
Tạo migration tạo bucket `video-assets` (public, không yêu cầu đăng nhập để xem), kèm RLS policy cho phép mọi người đọc file.

### Bước 2 — Bạn upload file MP4
Sau khi bucket tạo xong, bạn cần cung cấp file video bằng **một trong hai cách**:
- **Cách A (khuyên dùng nếu file < 50MB):** Kéo–thả file MP4 vào khung chat, tôi sẽ upload lên bucket giúp bạn.
- **Cách B:** Bạn tự vào Cloud → Storage → bucket `video-assets` → Upload, đặt tên file là `gioi-thieu-sach.mp4`.

### Bước 3 — Cập nhật `/sach`
Trong `src/routes/sach.index.tsx`, thay khối `<iframe src="...replit.dev/video-ads" />` bằng:
```tsx
<video
  controls
  preload="metadata"
  poster={posterUrl}        // optional ảnh thumbnail
  className="absolute inset-0 h-full w-full"
>
  <source src={videoUrl} type="video/mp4" />
</video>
```
`videoUrl` là URL public của bucket dạng:
`https://mvpjxcypvnoydgipzolu.supabase.co/storage/v1/object/public/video-assets/gioi-thieu-sach.mp4`

Giữ nguyên khung `aspect-video`, border, shadow như hiện tại — chỉ thay phần tử bên trong.

## Chi tiết kỹ thuật

- Bucket: `video-assets`, `public = true`
- RLS policy: `SELECT` cho `anon` và `authenticated` (read-only public)
- Không cần auth flow; không cần signed URL vì bucket public
- File phục vụ qua CDN của Lovable Cloud, hỗ trợ HTTP range requests → tua video mượt
- Nếu sau này muốn thêm ảnh poster, upload thêm `gioi-thieu-sach-poster.jpg` cùng bucket

## Lưu ý
- Giới hạn upload mặc định mỗi file khoảng 50MB. Nếu video lớn hơn, nên nén bớt (H.264, 720p, bitrate ~2 Mbps) trước khi upload, hoặc cân nhắc chuyển sang YouTube/Vimeo.
- File càng nhẹ thì người dùng càng load nhanh — khuyên nén xuống ≤ 20MB cho video giới thiệu ngắn.

Bạn xác nhận để tôi tiến hành tạo bucket nhé?