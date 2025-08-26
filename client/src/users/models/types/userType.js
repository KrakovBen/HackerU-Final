import { shape, string, bool } from "prop-types"
import nameType from "./nameType"

const userType = shape({
    _id: string,
    name: nameType.isRequired,
    email: string.isRequired,
    isAdmin: bool,
    createdAt: string,
    updatedAt: string
})

export default userType
