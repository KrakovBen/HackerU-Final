const chalk = require('chalk')
const { registerUser } = require('../users/models/usersAccessDataService')
const initialData = require('./initialData.json')
const { createRecipe, getRecipes } = require('../recipes/models/recipeAccessDataService')
const { getUsers } = require('../users/models/usersAccessDataService')

const generateInitialData = async () => {
    const { users, recipes } = initialData

    const createdUsers = (await Promise.all(
        users.map(async user => {
            try {
                let res = await registerUser(user)
                return res?.user ?? res ?? null
            } catch (error) {
                console.log(chalk.redBright(error.message))
                return null
            }
        })
    )).filter(Boolean)

    let admin = createdUsers.find(u => u?.isAdmin)
    if (!admin) {
        const adminSeed = users.find(u => u.isAdmin)
        if (!adminSeed) {
            console.log(chalk.redBright('no admin in seed users'))
            return
        }
        try {
            const allUsers = await getUsers()
            admin = allUsers.find(u => u.email === adminSeed.email || u?.isAdmin)
        } catch (e) {
            console.log(chalk.redBright('failed fetching users list'))
        }
    }

    if (!admin || !admin._id) {
        console.log(chalk.redBright('no admin user created'))
        return
    }

    const recipesDB = await getRecipes()
    if (recipesDB.length) {
        console.log(chalk.greenBright('Recipes already exists!'))
        return
    }

    await Promise.all(
        recipes.map(async recipe => {
            try {
                await createRecipe({ ...recipe, createdBy: admin._id })
                return true
            } catch (error) {
                console.log(chalk.redBright(error.message))
                return null
            }
        })
    )

    console.log(chalk.greenBright('Initial data generated successfully'))
}

module.exports = generateInitialData