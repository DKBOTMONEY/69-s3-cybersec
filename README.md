# Cyber Security Project

## 👤 ข้อมูลผู้จัดทำ (My Information)
- **ชื่อ-นามสกุล:** Patipan plonying
- **รหัสนักศึกษา:** 0568604056xxx

---

## 🎯 ความคาดหวังในการเรียนรู้
- การใช้งาน Command Line อย่างคล่องแคล่วและแม่นยำ
- การจัดการไฟล์และควบคุมเวอร์ชันด้วย Git และ IT Best Practices
- การทำ Security Hardening สำหรับระบบ Web Application และ Database

---

## 🏗️ สถาปัตยกรรมระบบ (System Architecture)
ระบบรันด้วย **Docker Compose** ประกอบด้วย 4 Services:
1. **Strapi (`my_app`)**: Headless CMS & Security / Authentication Service (พอร์ต `8083`)
2. **PostgreSQL (`db`)**: ฐานข้อมูลหลัก (พอร์ต `54327`)
3. **pgAdmin (`pgadmin`)**: เครื่องมือจัดการฐานข้อมูลผ่านหน้าเว็บ (พอร์ต `8080`)
4. **Mailpit (`mailpit`)**: Mock SMTP Server & Email Inspection Web UI (พอร์ต `8025`)

---

## 🛡️ การตั้งค่าด้านความปลอดภัย (Security Hardening)
- **Localhost Port Binding:** ผูกพอร์ตเฉพาะ `127.0.0.1` ป้องกันการเข้าถึงจากภายนอก Host หรือ Public IP
- **Network Isolation:** แยกเครือข่ายออกเป็น `internal_net` (สำหรับ DB) และ `app_net` (สำหรับ Application)
- **Resource Limiting (DoS Protection):** จำกัด CPU และ Memory ของแต่ละ Container เพื่อป้องกันการโจมตีแบบ Resource Exhaustion
- **Environment & Secrets Protection:** 
  - ซ่อนไฟล์ `.env` และ `api.rest` ไว้ใน `.gitignore`
  - บังคับให้ต้องมีค่า Security Secrets ใน `.env` ก่อนรันคอนเทนเนอร์ (`APP_KEYS`, `JWT_SECRET`, ฯลฯ)
- **Database Healthcheck:** ตรวจสอบความพร้อมของฐานข้อมูลด้วย `pg_isready` ก่อนที่ Application จะเริ่มทำงาน
- **Secure Email Mocking (Mailpit):** ทดสอบการส่งอีเมลยืนยันตัวตนและรีเซ็ตรหัสผ่านแบบ Isolated ในเครื่อง ไม่มีความเสี่ยงที่อีเมลจะรั่วไหลออกนอกระบบ

---

## 🚀 วิธีการติดตั้งและเปิดใช้งาน (Getting Started)

### 1. คัดลอกและตั้งค่า Environment
```bash
cp .env.example .env
```
*(สร้าง Secret Keys สุ่มด้วยคำสั่ง `openssl rand -base64 32` แล้วนำไปใส่ในไฟล์ `.env`)*

### 2. สตาร์ทระบบด้วย Docker Compose
```bash
docker compose up -d
```

### 3. ตรวจสอบสถานะการทำงาน
```bash
docker compose ps
```

### 4. เว็บอินเตอร์เฟซและพอร์ตการใช้งาน
- **Strapi API / Admin:** `http://localhost:8083`
- **pgAdmin (จัดการ DB):** `http://localhost:8080`
- **Mailpit Web UI (ตรวจเช็คอีเมล):** `http://localhost:8025`

### 5. วิธีทดสอบ Forgot / Reset Password ผ่านอีเมล
1. ยิง API `POST /api/auth/forgot-password` ระบุ `email` ที่ต้องการรีเซ็ต
2. เปิดเบราว์เซอร์ไปที่ `http://localhost:8025` (Mailpit) จะเห็นอีเมลใหม่เข้ามา
3. เปิดอ่านอีเมล จะพบลิงก์รีเซ็ตรหัสผ่าน ให้คัดลอกค่าพารามิเตอร์ `code=...`
4. นำรหัส code นั้นไปยิงที่ `POST /api/auth/reset-password` พร้อมระบุรหัสผ่านใหม่ เพื่อเปลี่ยนรหัสผ่านได้ทันที