import React from 'react'
import PageHeader from '../components/PageHeader'
import { Box, Typography, Container } from '@mui/material'

const TermsPage = () => {
    return (
        <>
            <PageHeader title="תקנון" />

            <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1680px' }} dir="rtl">
                <Box sx={{ '& p': { mb: 2 } }}>
                    <Typography variant="body1">
                        ברוכים הבאים לאתר BisBook (להלן: "האתר"). השימוש באתר כפוף לתנאים המפורטים בתקנון זה.
                        אנא קראו תקנון זה בקפידה לפני השימוש באתר. השימוש באתר מהווה הסכמה מלאה לכל התנאים
                        המפורטים במסמך זה.
                    </Typography>

                    <Typography variant="h6" gutterBottom>1. הגדרות</Typography>
                    <Typography variant="body1">
                        "האתר" - אתר האינטרנט BisBook וכל השירותים הניתנים דרכו.
                        "משתמש" - כל אדם או גוף אשר נכנס לאתר ו/או עושה שימוש בשירותיו.
                    </Typography>

                    <Typography variant="h6" gutterBottom>2. השימוש באתר</Typography>
                    <Typography variant="body1">
                        השימוש באתר מותר למטרות אישיות בלבד ואינו מיועד לשימוש מסחרי ללא אישור מראש ובכתב.
                        המשתמש מתחייב שלא לבצע כל פעולה שתפגע או עלולה לפגוע בתקינות האתר, באבטחתו או במידע המאוחסן בו.
                    </Typography>

                    <Typography variant="h6" gutterBottom>3. תוכן ומידע</Typography>
                    <Typography variant="body1">
                        הנהלת האתר אינה אחראית לתוכן שמפורסם על ידי משתמשים, לרבות מתכונים, תמונות, טקסטים וקבצים.
                        האחריות הבלעדית לתוכן זה חלה על המפרסם בלבד.
                    </Typography>

                    <Typography variant="h6" gutterBottom>4. קניין רוחני</Typography>
                    <Typography variant="body1">
                        כל זכויות היוצרים והקניין הרוחני באתר, לרבות עיצוב, טקסטים, קוד מקור, תמונות וסרטונים -
                        שייכים להנהלת האתר או לצדדים שלישיים שהעניקו לה רישיון שימוש. אין להעתיק, לשכפל, להפיץ או
                        להשתמש בתוכן כלשהו מהאתר ללא אישור מראש ובכתב.
                    </Typography>

                    <Typography variant="h6" gutterBottom>5. אחריות</Typography>
                    <Typography variant="body1">
                        האתר והשירותים שבו ניתנים כפי שהם (AS-IS) ללא כל התחייבות או אחריות מכל סוג, מפורשת או משתמעת.
                        הנהלת האתר לא תהיה אחראית לכל נזק ישיר או עקיף שייגרם כתוצאה משימוש באתר.
                    </Typography>

                    <Typography variant="h6" gutterBottom>6. שינוי התקנון</Typography>
                    <Typography variant="body1">
                        הנהלת האתר שומרת לעצמה את הזכות לשנות תקנון זה בכל עת וללא הודעה מוקדמת.
                        השינויים ייכנסו לתוקף במועד פרסומם באתר.
                    </Typography>

                    <Typography variant="h6" gutterBottom>7. דין וסמכות שיפוט</Typography>
                    <Typography variant="body1">
                        על תקנון זה יחולו דיני מדינת ישראל, וסמכות השיפוט הבלעדית בכל הנוגע אליו נתונה לבתי המשפט המוסמכים במחוז תל אביב.
                    </Typography>
                </Box>
            </Container>

        </>
    )
}

export default TermsPage
