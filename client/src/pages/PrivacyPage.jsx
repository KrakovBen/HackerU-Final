import React from 'react'
import PageHeader from '../components/PageHeader'
import { Box, Typography, Container } from '@mui/material'

const PrivacyPage = () => {
    return (
        <>
            <PageHeader title="מדיניות פרטיות" />

            <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1680px' }} dir="rtl">
                <Box sx={{ '& p': { mb: 2 } }}>
                    <Typography variant="body1">
                        אנו ב-BisBook מכבדים את פרטיות המשתמשים שלנו ומתחייבים להגן על המידע האישי שתשתפו עמנו.
                        מסמך זה מפרט כיצד אנו אוספים, שומרים, ומשתמשים במידע אישי בעת השימוש באתר.
                        השימוש באתר מהווה הסכמה לתנאי מדיניות פרטיות זו.
                    </Typography>

                    <Typography variant="h6" gutterBottom>1. איסוף מידע</Typography>
                    <Typography variant="body1">
                        בעת השימוש באתר, אנו עשויים לאסוף מידע אישי שתמסרו מרצונכם כגון שם, כתובת דוא"ל, מספר טלפון,
                        ותוכן שתבחרו לפרסם. בנוסף, אנו עשויים לאסוף מידע טכני באופן אוטומטי כגון כתובת IP, סוג הדפדפן,
                        ודפים בהם ביקרתם.
                    </Typography>

                    <Typography variant="h6" gutterBottom>2. שימוש במידע</Typography>
                    <Typography variant="body1">
                        המידע שנאסף ישמש לצורך תפעול האתר, שיפור השירותים, התאמת התוכן עבורכם, שליחת עדכונים או הצעות,
                        ועמידה בדרישות החוק.
                    </Typography>

                    <Typography variant="h6" gutterBottom>3. שיתוף מידע עם צדדים שלישיים</Typography>
                    <Typography variant="body1">
                        אנו לא נמכור, נשכיר או נחלוק את המידע האישי שלכם עם צדדים שלישיים אלא אם נדרש לכך על פי חוק,
                        או במידה והדבר נדרש לצורך אספקת השירות (כגון ספקי אחסון או שירותי דיוור).
                    </Typography>

                    <Typography variant="h6" gutterBottom>4. אבטחת מידע</Typography>
                    <Typography variant="body1">
                        אנו נוקטים באמצעים סבירים כדי להגן על המידע האישי מפני גישה, שימוש או גילוי בלתי מורשים.
                        עם זאת, אין באפשרותנו להבטיח הגנה מוחלטת על המידע.
                    </Typography>

                    <Typography variant="h6" gutterBottom>5. קובצי Cookies</Typography>
                    <Typography variant="body1">
                        האתר משתמש בקובצי Cookies כדי לשפר את חוויית הגלישה, לנתח שימוש באתר ולהציג תוכן מותאם אישית.
                        ניתן לחסום או למחוק קובצי Cookies דרך הגדרות הדפדפן, אך ייתכן שחלק מהפונקציות באתר לא יעבדו כראוי.
                    </Typography>

                    <Typography variant="h6" gutterBottom>6. שינוי מדיניות הפרטיות</Typography>
                    <Typography variant="body1">
                        הנהלת האתר שומרת לעצמה את הזכות לשנות מדיניות זו בכל עת. השינויים ייכנסו לתוקף עם פרסומם באתר.
                        אנו ממליצים לעיין במדיניות זו מעת לעת.
                    </Typography>

                    <Typography variant="h6" gutterBottom>7. יצירת קשר</Typography>
                    <Typography variant="body1">
                        אם יש לכם שאלות או בקשות בנוגע למדיניות הפרטיות, ניתן ליצור קשר באמצעות דוא"ל:
                        support@bisbook.com או בטלפון 03-1234567.
                    </Typography>
                </Box>
            </Container>
        </>
    )
}

export default PrivacyPage
