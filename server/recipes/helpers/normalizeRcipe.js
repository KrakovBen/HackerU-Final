const normalizeRecipe = async (rawRecipe, userID) => {

    return {
        ...rawRecipe,
        createdBy: rawRecipe.createdBy || userID
    }
}

module.exports = normalizeRecipe