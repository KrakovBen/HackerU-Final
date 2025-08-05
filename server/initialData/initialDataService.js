const chalk = require('chalk')
const { registerUser } = require('../users/models/usersAccessDataService')
const initialData = require('./initialData.json')
const { createRecipe, getRecipes } = require('../recipes/models/recipeAccessDataService')

const generateInitialData = async () => {
    const { users, recipes } = initialData
    const adminUserID = []

    for (const user of users) {
        try {
            await registerUser(user)
        if (user.isAdmin) adminUserID.push(user._id)
        } catch (error) {
            console.log(chalk.redBright(error.message))
        }
    }

    const recipesDB = await getRecipes()
    if (recipesDB.length) return console.log(chalk.redBright('Recipes already exists'))

    for (const recipe of recipes) {
        try {
            recipe.createdBy = adminUserID[0]
            await createRecipe(recipe)
        } catch (error) {
            console.log(chalk.redBright(error.message))
        }
    }

    console.log(chalk.greenBright('Initial data generated successfully'))
}

module.exports = generateInitialData