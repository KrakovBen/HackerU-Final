const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const mime = require('mime-types')
const { registerUser } = require('../users/models/usersAccessDataService')
const initialData = require('./initialData.json')
const { createRecipe, getRecipes, updateRecipe } = require('../recipes/models/recipeAccessDataService')
const { getUsers } = require('../users/models/usersAccessDataService')

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true })

const filenameFromUrl = (url, fallbackExt = 'jpg') => {
    const time = Date.now()
    return `seed-${time}.${fallbackExt}`
}

const getExtFromHead = async (url) => {
    try {
      const head = await axios.head(url, { timeout: 15000 })
      const contentType = head.headers['content-type'] || ''
      return mime.extension(contentType) || 'jpg'
    } catch {
      return 'jpg'
    }
}

const downloadToFile = async (url, dest) => {
    const res = await axios.get(url, { responseType: 'stream', timeout: 30000 });
    await new Promise((resolve, reject) => {
      const w = fs.createWriteStream(dest)
      res.data.pipe(w)
      w.on('finish', resolve)
      w.on('error', reject)
    })
}

const ROOT = process.cwd()

const downloadSeedImagesIfNeeded = async () => {
    const time = Date.now()
    const recipesNow = await getRecipes()
    let updated = 0
    for (const recipe of recipesNow) {
        const url = recipe.imageUrl
        if (!url || typeof url !== 'string') continue
        if (url.startsWith('/uploads/')) continue
        if (/^https?:\/\//i.test(url)) {
            try {
                const dir = path.join(ROOT, 'uploads', 'recipes', String(recipe._id))
                ensureDir(dir)

                const ext = await getExtFromHead(url)
                let filename = filenameFromUrl(url, ext)

                if (fs.existsSync(path.join(dir, filename))) {
                    const base = path.parse(filename).name
                    filename = `${base}-${time}.${ext}`
                }

                const dest = path.join(dir, filename)
                await downloadToFile(url, dest)

                const rel = `/uploads/recipes/${recipe._id}/${filename}`
                await updateRecipe(recipe._id, { imageUrl: rel })
                updated++
            } catch (error) {
                console.log(chalk.red(`Download failed for ${recipe.title}: ${error.message}`))
            }
        }
    }

    if (updated) console.log(chalk.greenBright(`Downloaded ${updated} seed images.`))
    else console.log(chalk.greenBright('All seed images already exist.'))
}

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

    let admin = createdUsers.find(user => user?.isAdmin)
    if (!admin) {
        const adminSeed = users.find(user => user.isAdmin)
        if (!adminSeed) {
            console.log(chalk.redBright('no admin in seed users'))
            return
        }
        try {
            const allUsers = await getUsers()
            admin = allUsers.find(user => user.email === adminSeed.email || user?.isAdmin)
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

    await downloadSeedImagesIfNeeded()

    console.log(chalk.greenBright('Initial data generated successfully'))
}

module.exports = generateInitialData