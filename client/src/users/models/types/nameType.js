import { shape, string } from "prop-types"

const userType = shape({
    _id: string,
    first: string,
    last: string
})

export default userType
