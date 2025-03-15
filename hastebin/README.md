# Migrasi Hastebin ke Arsitektur Layanan Mikro

Proyek ini mendemonstrasikan migrasi aplikasi monolitik **Hastebin** ke arsitektur layanan mikro. Aplikasi yang awalnya dibangun sebagai monolit, telah dipecah menjadi beberapa layanan mikro independen, masing-masing dengan database dan fungsionalitasnya sendiri.

---

## **Struktur Proyek**

---

## **Layanan Mikro**
1. **Document Storage**:
   - Menyimpan dan mengambil dokumen dari Redis.
   - Endpoint:
     - `POST /documents`: Menyimpan dokumen.
     - `GET /documents/:key`: Mengambil dokumen berdasarkan key.

2. **Rendering**:
   - Merender dokumen ke dalam format HTML.
   - Endpoint:
     - `GET /render?content=<content>`: Merender konten dokumen.

3. **Authentication** (Opsional):
   - Menangani registrasi dan login pengguna.
   - Endpoint:
     - `POST /auth/register`: Registrasi pengguna baru.
     - `POST /auth/login`: Login pengguna.

4. **API Gateway**:
   - Mengelola komunikasi antara klien dan layanan mikro.
   - Endpoint:
     - `/documents`: Diarahkan ke layanan Document Storage.
     - `/render`: Diarahkan ke layanan Rendering.
     - `/auth`: Diarahkan ke layanan Authentication.

---

## **Teknologi yang Digunakan**
- **Node.js**: Untuk membangun layanan mikro.
- **Express.js**: Framework untuk membuat API.
- **Redis**: Database untuk penyimpanan dokumen dan autentikasi.
- **Docker**: Untuk containerisasi layanan mikro.
- **Docker Compose**: Untuk mengelola dan menjalankan semua layanan secara bersamaan.

---

## **Cara Menjalankan Proyek**

### **Prasyarat**
- Docker dan Docker Compose sudah terinstal.
- Git (opsional, untuk clone repositori).

### **Langkah-Langkah**
1. **Clone Repositori**:
   ```bash
   git clone https://github.com/username/hastebin.git
   cd hastebin
