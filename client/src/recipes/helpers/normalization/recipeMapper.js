const mapRecipeToModel = (recipe) => {
    return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        prepTimeMinutes: recipe.prepTimeMinutes,
        cookTimeMinutes: recipe.cookTimeMinutes,
        imageUrl: recipe.imageUrl,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
    }
}

export default mapRecipeToModel
