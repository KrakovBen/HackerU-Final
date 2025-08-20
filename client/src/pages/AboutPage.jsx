import React from 'react'
import PageHeader from '../components/PageHeader'
import { Box, Typography, Container } from '@mui/material'

const AboutPage = () => {
    return (
        <>
            <PageHeader title="אודות bisbook" />

            <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1680px' }} dir="rtl">
                <Box sx={{ '& p': { mb: 2 } }}>
                    <Typography variant="h6" gutterBottom>מי אנחנו?</Typography>
                    <Typography variant="body1">BisBook הוא אתר מתכונים קהילתי שמרכז מתכונים ברורים, קצרים ומדויקים. המטרה: להפוך בישול ואפייה לפשוטים ונגישים לכל אחד.</Typography>

                    <Typography variant="h6" gutterBottom>מה תמצאו אצלנו</Typography>
                    <Typography variant="body1">
                    מאות מתכונים מסודרים לפי קטגוריות, מטבחים ורמות קושי<br />
                    הסברים מדויקים עם רשימות מרכיבים בשלבים ברורים<br />
                    שמירה ומועדפים כדי למצוא שוב מתכונים שאהבתם<br />
                    שיתוף מתכונים בלחיצה אחת<br />
                    יצירת מתכון חדש למשתמשים רשומים עם העלאת תמונה והנחיות
                    </Typography>

                    <Typography variant="h6" gutterBottom>איך זה עובד</Typography>
                    <Typography variant="body1">
                    מחפשים מתכון לפי שם, קטגוריה או תגיות<br />
                    נכנסים למתכון ומבשלים לפי שלבים קצרים<br />
                    אוהבים? מוסיפים למועדפים ומשתפים<br />
                    יש מתכון שלכם? מתחברים ומפרסמים
                    </Typography>

                    <Typography variant="h6" gutterBottom>ערכים ועקרונות</Typography>
                    <Typography variant="body1">
                    בהירות: הוראות קצרות ומדויקות<br />
                    אמינות: מתכונים עוברים סינון בסיסי לפני פרסום<br />
                    נגישות: תמיכה בקריאה מימין לשמאל, ניגודיות טובה ומבנה טקסט קריא<br />
                    קהילה: כל משתמש יכול לתרום ידע וטיפים
                    </Typography>

                    <Typography variant="h6" gutterBottom>למי זה מתאים</Typography>
                    <Typography variant="body1">
                    למתחילים שרוצים הנחיות צעד־אחר־צעד<br />
                    למנוסים שמחפשים השראה מהירה<br />
                    לכל מי שאוהב לשתף מתכונים שלו
                    </Typography>

                    <Typography variant="h6" gutterBottom>שאלות ונושאים נפוצים</Typography>
                    <Typography variant="body1">
                    איך מפרסמים מתכון? נרשמים, נכנסים ל“הוספת מתכון”, ממלאים פרטים ומעלים תמונה<br />
                    איך שומרים מתכון? לוחצים על אייקון הלב בעמוד המתכון<br />
                    איך מדווחים על טעות? שולחים לנו הודעה בקישור “יצירת קשר”
                    </Typography>

                    <Typography variant="h6" gutterBottom>יצירת קשר</Typography>
                    <Typography variant="body1">
                    טלפון: 03-1234567<br />
                    אימייל: support@bisbook.com
                    </Typography>

                    <Typography variant="h6" gutterBottom>משפטי ותאימות</Typography>
                    <Typography variant="body1">
                    שימוש באתר כפוף לתקנון ולמדיניות הפרטיות<br />
                    זכויות יוצרים לתמונות ולתוכן השייכים למשתמשים נשמרות לבעליהן. בהעלאת מתכון אתם מאשרים שיש לכם זכויות לשתף את התוכן
                    </Typography>

                    <Typography variant="h6" gutterBottom>הצטרפו לקהילה</Typography>
                    <Typography variant="body1">
                    פתחו חשבון, שמרו מועדפים, שתפו מתכונים, ועזרו לנו לבנות את ספר המתכונים הדיגיטלי של כולנו
                    </Typography>
                </Box>
            </Container>
        </>
    )
}

export default AboutPage
