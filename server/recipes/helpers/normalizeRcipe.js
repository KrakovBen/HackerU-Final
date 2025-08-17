const normalizeRecipe = async (rawRecipe, userId) => {
    const imageUrl = rawRecipe.imageUrl || '/uploads/default_recipe_image.jpg'

    return {
        ...rawRecipe,
        imageUrl,
        createdBy: rawRecipe.createdBy || userId
    }
}

module.exports = normalizeRecipe
