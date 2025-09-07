# 🍲 Recipe App | אפליקציית מתכונים  
**HackerU Final Project – Full Stack Development**  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

מערכת מתכונים מלאה בצד לקוח ובצד שרת.  
כוללת ניהול משתמשים, התחברות, ניהול מתכונים והעלאת תמונות.  

---

## 🚀 Features | פיצ'רים
- 🔐 Authentication & Authorization – אימות והרשאות עם **JWT**
- 📖 Recipe CRUD – ניהול מתכונים מלא (הוספה, עדכון, מחיקה)
- 🙋 User CRUD – ניהול משתמשים מלא (הוספה, עדכון, מחיקה)
- 🖼️ Image Upload – העלאת תמונות עם **Multer**
- 🎨 UI – ממשק משתמש עם **React** + **MUI**
- 📝 Logs – לוגים עם **Morgan**
- ⚙️ Config – תמיכה בסביבות **development** ו-**production**

---

## 📂 Project Structure | מבנה פרויקט
```bash
HackerU-Final/
├── client/                 # Frontend (React)
│   ├── public/             # קבצים סטטיים
│   └── src/                # קוד המקור
│       ├── components/     # קומפוננטות React
│       ├── forms/          # טפסים
│       ├── hooks/          # custom hooks
│       ├── layout/         # layout
│       ├── pages/          # עמודי React (routes)
│       ├── providers/      # providers
│       ├── recipes/        # מתכונים
│       ├── routes/         # ניתוב
│       ├── styles/         # קבצי SCSS/CSS
│       ├── users/          # משתמשים
│       ├── utils/          # פונקציות עזר
│       └── App.js          # קובץ ראשי
│
├── server/                 # Backend (Node.js, Express, MongoDB)
│   ├── auth/               # Authentication & JWT
│   ├── config/             # Environment configs
│   ├── db/                 # חיבור למסד הנתונים
│   ├── initialData/        # נתוני דמה / seed
│   ├── logger/             # Logger service + Morgan
│   ├── logs/               # קבצי לוגים
│   ├── middlewares/        # Middlewares (upload, CORS וכו')
│   ├── recipes/            # מודולים הקשורים לניהול מתכונים
│   ├── router/             # ניתוב API
│   ├── services/           # לוגיקה עסקית
│   ├── uploads/            # Recipe images
│   ├── users/              # מודולים הקשורים לניהול משתמשים
│   ├── utils/              # פונקציות עזר
│   └── server.js           # Entry point
│
└── README.md
```

---

## ⚙️ Installation | הוראות התקנה

### 1. Clone repository
```bash
git clone https://github.com/KrakovBen/HackerU-Final.git
cd HackerU-Final
```

### 2. Install dependencies
```bash
cd client
npm install

cd ../server
npm install
```

### 3. Environment variables | משתני סביבה
> 📝 **הערה:** קבצי `.env` והקונפיגורציה (`development.json`, `production.json`)  
> אינם כלולים בפרויקט מטעמי אבטחה – הם צורפו למשימה באתר.  

---

## ▶️ Running the Project | הרצה

### Development mode
```bash
# Server
cd server
npm run dev

# Client
cd ../client
npm run dev
```

### Production mode
```bash
cd client
npm run build

cd ../server
npm start
```

---

## 🔑 Notes | הערות
- לאחר **הפעלה ראשונית** יש להמתין מספר דקות עד שהמידע יורד ומסתנכרן מול השרתים.  
- מומלץ ליצור **משתמשים עם אימייל אמיתי** כדי לבדוק את מערכת ההתחברות.  

---

## 🛠️ Tech Stack | טכנולוגיות
| צד לקוח | צד שרת | מסד נתונים | כלים נוספים |
|---------|---------|-------------|-------------|
| React   | Node.js | MongoDB     | Morgan      |
| React Router | Express |         | dotenv      |
| MUI     | JWT     |             | config      |
| SCSS    | Multer  |             |             |

---

## 👨‍💻 Author | מחבר
בן קרקובסקי עבור פרויקט גמר בקורס פיתוח **Full-Stack** ב-HackerU.
