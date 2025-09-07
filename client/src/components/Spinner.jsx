import { string, number } from "prop-types"
import { Helix } from "ldrs/react"
import 'ldrs/react/Helix.css'
import { Container } from "@mui/material"
import { useTheme } from "@mui/material/styles"

const Spinner = ({ height, size, speed, color }) => {
    const theme = useTheme()
    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: height }}>
            <Helix size={size} speed={speed} color={theme.palette?.[color]?.main || theme.palette?.primary?.main} />
        </Container>
    )
}

Spinner.propTypes = {
    height: string,
    size: number,
    speed: number,
    color: string
}

Spinner.defaultProps = {
    height: '50vh',
    size: 100,
    speed: 1.5,
    color: "primary"
}

export default Spinner