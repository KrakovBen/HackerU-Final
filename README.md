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
Ben Krakovsky
פרויקט גמר בקורס פיתוח **Full-Stack** ב-HackerU.


<div dir="rtl" align="right">

<h1>🍲 אפליקציית מתכונים | Recipe App</h1>
<p><strong>HackerU Final Project – Full Stack Development</strong></p>

<p>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" alt="MongoDB">
<img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white" alt="JWT">
</p>

<p>מערכת מתכונים מלאה בצד לקוח ובצד שרת. כוללת ניהול משתמשים, התחברות, ניהול מתכונים והעלאת תמונות.</p>

<hr/>

<h2>🚀 פיצ'רים</h2>
<ul>
  <li>🔐 אימות והרשאות עם <strong>JWT</strong></li>
  <li>📖 ניהול מתכונים מלא (CRUD)</li>
  <li>🖼️ העלאת תמונות עם <strong>Multer</strong></li>
  <li>🎨 ממשק משתמש עם <strong>React</strong> + <strong>MUI</strong></li>
  <li>📝 לוגים עם <strong>Morgan</strong></li>
  <li>⚙️ קונפיג לסביבות <code>development</code> ו־<code>production</code></li>
</ul>

<hr/>

<h2>📂 מבנה פרויקט</h2>

<pre><code>HackerU-Final/
├── client/                 # Frontend (React)
│   ├── public/             # קבצים סטטיים
│   └── src/                # קוד המקור
│       ├── assets/         # תמונות, קבצי עיצוב
│       ├── components/     # קומפוננטות React
│       ├── hooks/          # custom hooks
│       ├── pages/          # עמודי React (routes)
│       ├── services/       # קריאות API לשרת
│       ├── styles/         # קבצי SCSS/CSS
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
│   ├── recipes/            # מודולים לניהול מתכונים
│   ├── router/             # ניתוב API
│   ├── services/           # לוגיקה עסקית
│   ├── uploads/            # Recipe images
│   ├── users/              # מודולים לניהול משתמשים
│   ├── utils/              # פונקציות עזר
│   └── server.js           # Entry point
│
└── README.md
</code></pre>

<hr/>

<h2>⚙️ התקנה</h2>

<h3>1. שכפול הפרויקט</h3>
<pre><code>git clone https://github.com/your-username/HackerU-Final.git
cd HackerU-Final
</code></pre>

<h3>2. התקנת חבילות</h3>
<pre><code>cd client
npm install

cd ../server
npm install
</code></pre>

<h3>3. משתני סביבה</h3>
<p>צור קובץ <code>.env</code> בתוך <code>server/</code>:</p>
<pre><code>PORT=5000
MONGO_URI=mongodb://localhost:27017/recipes
JWT_SECRET=your_jwt_secret
</code></pre>

<blockquote>
<p><strong>הערה:</strong> קבצי <code>.env</code> והקונפיגורציה (<code>development.json</code>, <code>production.json</code>) אינם כלולים בפרויקט מטעמי אבטחה – הם צורפו למשימה באתר.</p>
</blockquote>

<hr/>

<h2>▶️ הרצה</h2>

<h3>Development</h3>
<pre><code># Server
cd server
npm run dev

# Client
cd ../client
npm start
</code></pre>

<h3>Production</h3>
<pre><code>cd client
npm run build

cd ../server
npm start
</code></pre>

<hr/>

<h2>🔑 הערות</h2>
<ul>
  <li>מומלץ ליצור משתמשים עם אימייל אמיתי כדי לבדוק את מערכת ההתחברות.</li>
  <li>לאחר הפעלה ראשונית יש להמתין מספר דקות עד שהמידע יורד ומסתנכרן מול השרתים.</li>
</ul>

<hr/>

<h2>🛠️ טכנולוגיות</h2>
<table>
<thead>
<tr>
  <th>צד לקוח</th>
  <th>צד שרת</th>
  <th>מסד נתונים</th>
  <th>כלים נוספים</th>
</tr>
</thead>
<tbody>
<tr>
  <td>React, React Router, MUI, SCSS</td>
  <td>Node.js, Express, JWT, Multer</td>
  <td>MongoDB</td>
  <td>Morgan, dotenv, config</td>
</tr>
</tbody>
</table>

<hr/>

<h2>👨‍💻 מחבר</h2>
<p>פרויקט גמר בקורס פיתוח <strong>Full-Stack</strong> ב־HackerU.</p>

</div>
