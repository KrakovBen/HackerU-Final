import React from 'react'
import { Box, Container, Grid, Stack, Typography, Link, Divider } from '@mui/material'
import ROUTES from '../../routes/routesModel'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
    const sections = [
        {
            title: 'BisBook',
            items: [
                { label: 'דף הבית', href: ROUTES.ROOT },
                { label: 'כל המתכונים', href: ROUTES.RECIPES }
            ]
        },
        {
            title: 'החשבון שלי',
            items: [
                { label: 'התחברות', href: ROUTES.LOGIN },
                { label: 'הרשמה', href: ROUTES.REGISTER },
                { label: 'הוספת מתכון', href: ROUTES.RECIPE_CREATE }
            ]
        },
        {
            title: 'מידע',
            items: [
                { label: 'אודות', href: ROUTES.ABOUT }
            ]
        },
        {
            title: 'יצירת קשר',
            items: [
                { label: '03-1234567', href: 'tel:031234567' },
                { label: 'support@bisbook.com', href: 'mailto:support@bisbook.com' }
            ]
        },
    ]

    return (
        <Box component="footer" sx={{ mt: '120px', bgcolor: 'primary.main', '--ft-title': '#fff', '--ft-text': '#c8dfff', color: 'var(--ft-text)', borderTop: 1, borderColor: 'divider' }}>
            <Container maxWidth={false} sx={{ py: { xs: 4, md: 6 }, mx: 'auto', maxWidth: '1680px', width: '90vw' }} dir="rtl">
                <Grid container display="grid" gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} spacing={{ xs: 3, md: 6 }}>
                    {sections.map((sec) => (
                        <Grid key={sec.title} sx={{ xs: 'span 12', md: 'span 3' }}>
                            <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ color: 'var(--ft-title)' }}>
                                {sec.title}
                            </Typography>

                            <Stack spacing={1}>
                                {sec.items.map((it) => (
                                    <Link key={it.label} component={RouterLink} to={it.href} underline="hover" variant="body2" sx={{ color: 'inherit' }}>
                                        {it.label}
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ my: 3, borderColor: '#5c86c1' }} />

                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" gap={1}>
                    <Typography variant="body2" sx={{ color: 'var(--ft-title)' }}>
                        © {new Date().getFullYear()} BisBook. כל הזכויות שמורות.
                    </Typography>
                    <Stack direction="row" spacing={2} gap={2}>
                        <Link component={RouterLink} to={ROUTES.PRIVACY} variant="body2" underline="hover" sx={{ color: 'inherit' }}>מדיניות פרטיות</Link>
                        <Link component={RouterLink} to={ROUTES.TERMS} variant="body2" underline="hover" sx={{ color: 'inherit' }}>תקנון</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>

    )
}

Footer.propTypes = {}

export default Footer
