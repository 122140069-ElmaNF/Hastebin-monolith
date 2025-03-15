# Migrasi Aplikasi Hastebin Monolitik ke Arsitektur Layanan Mikroservices

Proyek ini mendemonstrasikan migrasi aplikasi monolitik **Hastebin** ke arsitektur layanan mikrosevices. Aplikasi yang awalnya dibangun sebagai monolitik, telah dipecah menjadi beberapa layanan mikro independen, masing-masing dengan database dan fungsionalitasnya sendiri.

---

## **Struktur Proyek**

### **1. Struktur Lama(Monolitik)**

```bash
/haste-server
├── /bin
│ └── haste                       # Skrip untuk menjalankan server
├── /public                       # File statis (CSS, JS, gambar)
├── /storage                      # Logika penyimpanan dokumen
├── /test                         # File testing
├── /views                        # Template view (menggunakan EJS)
├── app.js                        # File utama aplikasi
├── server.js                     # File server utama
└── package.json                  # Dependensi dan skrip proyek
```

### **2. Struktur Sekarang (Microservices)**
```bash
/hastebin-migration
├── /services
│   ├── /document-storage       # Layanan penyimpanan dokumen
│   ├── /rendering              # Layanan rendering dokumen
│   └── /authentication         # Layanan autentikasi
├── /api-gateway                # API Gateway untuk mengelola komunikasi
├── docker-compose.yml          # Konfigurasi Docker Compose
└── README.md                   # Dokumentasi proyek

```
---
## **Routing API**

### **1. Routing Monolitik**
- **Semua routing diatur dalam satu file (`app.js` atau `server.js`)**.
- Contoh routing:
  ```javascript
  app.post('/documents', (req, res) => { ... });  // Menyimpan dokumen
  app.get('/documents/:key', (req, res) => { ... });  // Mengambil dokumen
  app.get('/', (req, res) => { ... });  // Render tampilan utama

### **2. Routing Microservices**
- **Routing dipecah berdasarkan layanan:**
  - **Document Storage:**
    - `POST /documents`: Menyimpan dokumen.
    - `GET /documents/:key`: Mengambil dokumen.
  - **Rendering:**
    - `GET /render?content=<content>`: Merender dokumen.
  - **Authentication (Opsional):**
    - `POST /auth/register`: Registrasi pengguna.
    - `POST /auth/login`: Login pengguna.
- **API Gateway** mengelola routing antara klien dan layanan mikro.

---
## **Database**

### **1. Database Monolitik**
- **Single Database:** Menggunakan satu instance Redis untuk semua fungsionalitas.
- **Struktur Data:**
    - Key: `document:<key>`
    - Value: Konten dokumen.

### **2. Database Mikroservices**
- **Database Terpisah:**
    - **Redis untuk Document Storage:** Menyimpan dokumen.
    - **Redis untuk Authentication:** Menyimpan data pengguna.
- **Isolasi Data:** Setiap layanan mikro memiliki database sendiri untuk memastikan isolasi data.
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
   git clone https://github.com/uElmaNF/hastebin.git
   cd hastebin
