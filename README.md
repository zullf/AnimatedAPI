# Pengayaan P13

## Informasi Mahasiswa
- **Nama** : Zulfikar Hasan  
- **NIM** : 2410501016  
- **Kelas** : B  

---

## Latihan 1 - Animated API

### Fitur yang Diimplementasikan
- Fade-in dari bawah menggunakan `translateY` dan `opacity`
- Bounce scale saat kartu ditekan `(1 → 0.95 → 1.05 → 1)`
- Rotasi 360° saat long press

## Latihan 2 - Reanimated 2 & Gesture Handler

### Fitur yang Diimplementasikan
- Swipe kiri untuk menampilkan aksi Delete
- Swipe kanan untuk menampilkan aksi Archive
- Auto-delete jika swipe melebihi 70% lebar layar
- Snap back menggunakan spring animation

## Latihan 3 - Background Task

### Fitur yang Diimplementasikan
- Registrasi background task
- Fetch quote dari API secara berkala
- Penyimpanan quote menggunakan AsyncStorage
- Menampilkan quote terakhir saat aplikasi dibuka

---

## Pertanyaan Refleksi

## 1. Kapan sebaiknya menggunakan Animated API vs Reanimated 2? Apa trade-off-nya?

- Animated API cocok untuk animasi sederhana seperti fade, scale, dan translate karena mudah diterapkan.
- Reanimated 2 lebih cocok untuk animasi kompleks dan gesture karena menawarkan performa yang lebih baik.
- Trade-off-nya, Reanimated 2 lebih powerful tetapi membutuhkan setup dan implementasi yang lebih kompleks.

## 2. Mengapa background task di iOS tidak dapat dijamin tepat waktu? Apa implikasinya untuk desain aplikasi?

- iOS mengatur eksekusi background task untuk menghemat baterai dan sumber daya perangkat. Akibatnya, task dapat ditunda atau tidak dijalankan sesuai jadwal yang ditentukan.
- Oleh karena itu, aplikasi tidak boleh bergantung pada background task untuk proses yang membutuhkan ketepatan waktu tinggi.

## 3. Dalam konteks In-App Purchases, mengapa server-side validation lebih aman dari client-side validation?

- Server-side validation memverifikasi transaksi langsung melalui server sehingga lebih sulit dimanipulasi.
- Client-side validation lebih rentan terhadap modifikasi aplikasi atau pemalsuan data transaksi.
- Karena itu, server side validation lebih aman untuk mencegah kecurangan dan menjaga integritas sistem pembayaran.

## 4. Bagaimana lazy loading image dapat meningkatkan performa aplikasi secara signifikan?

- Lazy loading hanya memuat gambar yang akan ditampilkan kepada user. Teknik ini mengurangi penggunaan memori dan bandwidth.
- Selain itu waktu loading awal aplikasi jadi lebih cepat dan scrolling terasa lebih lancar.

