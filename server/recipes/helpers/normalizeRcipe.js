const normalizeRecipe = async (rawRecipe, userID) => {
    if (typeof rawRecipe.tags === 'string') {
        rawRecipe.tags = rawRecipe.tags.split(',').map(tag => tag.trim())
    }

    return {
        ...rawRecipe,
        createdBy: rawRecipe.createdBy || userID
    }
}

module.exports = normalizeRecipe