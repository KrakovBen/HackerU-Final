import { string } from "prop-types"
import { Helix } from "ldrs/react"
import 'ldrs/react/Helix.css'
import { Container } from "@mui/material"

const Spinner = ({ height='50vh', size=100, speed=1.5, color='primary' }) => {
    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: height }}>
            <Helix size={size} speed={speed} color={color} />
        </Container>
    )
}

Spinner.propTypes = {
    height: string.isRequired,
    size: string.isRequired,
    speed: string.isRequired,
    color: string.isRequired
}


export default Spinner