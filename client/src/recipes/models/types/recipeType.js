import { arrayOf, shape, string } from "prop-types"

const recipeType = shape({
    _id: string,
    title: string.isRequired,
    description: string.isRequired,
    ingredients: arrayOf(string).isRequired,
    instructions: arrayOf(string).isRequired,
    createdAt: string,
    updatedAt: string
})

export default recipeType
