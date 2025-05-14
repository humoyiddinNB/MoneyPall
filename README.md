# 💸 Money Pall – Moliyaviy Boshqaruv Ilovasi

**Money Pall** — bu foydalanuvchilarga o‘z moliyaviy holatini boshqarishga yordam beruvchi web ilova. Daromad va harajatlarni kategoriya bo‘yicha tartibga solish, statistikalarni ko‘rish, va moliyaviy intizomni saqlashga qaratilgan vosita.

---

## 🛠 Texnologiyalar

- Python 3
- Django (MVT arxitekturasi)
- SQLite (yoki boshqa DB)
- HTML, CSS, JS (Frontend uchun)
- Deploy: [Render.com](https://render.com)
- link: (https://moneypall.onrender.com/)

---

## 🔐 Kirish va Ro‘yxatdan o‘tish

- Foydalanuvchi ro‘yxatdan o‘tgach, **OTP (tasdiqlovchi kod)** email orqali yuboriladi.
- Agar OTP xabari emailda ko‘rinmasa, **Spam yoki Promotions** bo‘limlarini tekshiring.

---

## 🚀 Ilova funksiyalari

- 🟢 **Daromadlar qo‘shish** (kategoriya, miqdor, sana, izoh)
- 🔴 **Harajatlar qo‘shish** (kategoriya, miqdor, sana, izoh)
- 🏷️ **Kategoriya yaratish** (foydalanuvchiga moslab)
- 📊 **Statistik tahlil:**
  - Haftalik / Oylik / Yillik tahlillar
  - Diagramma va grafikalar orqali ko‘rsatish (Pie chart, Bar chart va boshqalar)

---

## 📂 O‘rnatish yo‘riqnomasi (Local versiyada)



1. Loyihani klon qiling:

git clone <repo-url>
cd money-pall

2.Virtual muhit yarating va faollashtiring:

python -m venv venv
source venv/bin/activate    


3.Kutubxonalarni o‘rnating:
pip install -r requirements.txt

4.Migratsiyalarni bajaring:
python manage.py makemigrations
python manage.py migrate

5.Superuser yarating (admin panel uchun):
python manage.py createsuperuser


6.Serverni ishga tushiring:
python manage.py runserver
