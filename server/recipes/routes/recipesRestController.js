const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const uploadImage = require('../../middlewares/uploadImage')
const { handleError } = require('../../utils/errorHandler')
const { getRecipes, getRecipe, getAllRecipes, updateRecipe, likeRecipe, getRecipesByUser, createRecipe, deleteRecipe, getLikedRecipesByUser } = require('../models/recipeAccessDataService')
const auth = require('../../auth/authService')
const { verifyAuthToken } = require('../../auth/providers/jwt')
const { getUser } = require('../../users/models/usersAccessDataService')
const validateRecipe = require('../validations/recipeValidationService')
const normalizeRecipe = require('../helpers/normalizeRcipe')
const { getRecipeTags } = require('../services/getRecipeTags')

router.get( '/', async (req, res) => {
    try {
        const recipes = await getRecipes()
        res.status(200).send(recipes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.get( '/all-recipes', async (req, res) => {
    try {
        const recipes = await getAllRecipes()
        res.status(200).send(recipes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.get( '/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const recipes = await getRecipesByUser(id)
        res.status(200).send(recipes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.get( '/:id', async (req, res) => {
    try {
        const id = req.params.id
        const recipe = await getRecipe(id)
        res.status(200).send(recipe)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.put( '/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const verifiedUser = verifyAuthToken(req.headers['x-auth-token'])
        if(!req.user.isAdmin && (id != verifiedUser._id)) throw new Error('אינך מורשה לבצע פעולה זו.')
        if( req.user.isAdmin ){
            const userData = await getUser(verifiedUser._id)
            if(!userData.isAdmin) throw new Error('אינך מורשה לבצע פעולה זו.')
        }

        const recipe = await updateRecipe(id, req.body)
        res.status(200).send(recipe)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.post( '/', auth, async (req, res) => {
    try {
        let recipe = req.body        
        const { error } = validateRecipe(recipe)
        if(error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)

        recipe.imageUrl = null
        const tags = await getRecipeTags({ description: recipe.description, title: recipe.title })
        recipe.tags = tags
        recipe = await normalizeRecipe(recipe, req.user._id)
        recipe = await createRecipe(recipe)
        res.status(201).send(recipe._id)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.post( '/:id/image', auth, uploadImage.single('image'), async (req, res) => {
    try {
        const { id } = req.params
        let recipe = await getRecipe(id)
        const isOwner = String(recipe.createdBy) === String(req.user._id)
        const isAdmin = !!req.user.isAdmin

        if (!isOwner && !isAdmin) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(403).json({ message: 'אינך מורשה להעלות תמונה למתכון זה' });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            if (req.file) fs.unlink(req.file.path, () => {})
            return res.status(400).json({ message: 'ID לא חוקי' })
        }

        if (!recipe) {
            if (req.file) fs.unlink(req.file.path, () => {})
            return res.status(404).json({ message: 'לא נמצא מתכון' })
        }

        if (!req.file) return res.status(400).json({ message: 'לא הועלה קובץ' })

        if (recipe.imageUrl && recipe.imageUrl.startsWith('/uploads/')){
            const dir = path.resolve('uploads/recipes', id)
            if (recipe.imageUrl && !recipe.imageUrl.startsWith(`/uploads/recipes/${id}/`)) {
                fs.promises.unlink(path.resolve('.' + recipe.imageUrl)).catch(() => {})
            }
            
            try {
                const files = await fs.promises.readdir(dir);
                await Promise.all(
                  files
                    .filter(name => name !== req.file.filename)
                    .map(name => fs.promises.unlink(path.join(dir, name)))
                );
            } catch (error) {
                return handleError(res, error.status || 500, error.message)
            }
        }

        const publicUrl = `/uploads/recipes/${id}/${req.file.filename}`
        recipe = { ...recipe, imageUrl: publicUrl }
        const updated = await updateRecipe(id, recipe)

        return res.status(200).json({ ok: true, imageUrl: publicUrl, recipeId: id, recipe: updated })
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.patch( '/like/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user._id

        const recipe = await likeRecipe(id, userId)
        res.status(200).send(recipe)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.delete( '/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const verifiedUser = verifyAuthToken(req.headers['x-auth-token'])
        let recipe = await getRecipe(id)
        if(!recipe) throw new Error('לא נמצא מתכון')
        const recipeUserId = recipe.createdBy

        if(!req.user.isAdmin && (recipeUserId != verifiedUser._id)) throw new Error('אינך מורשה לבצע פעולה זו.')
        if( req.user.isAdmin ){
            const userData = await getUser(verifiedUser._id)
            if(!userData.isAdmin) throw new Error('אינך מורשה לבצע פעולה זו.')
        }
    
        recipe = await deleteRecipe(id)
        res.status(200).send(recipe)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.get( '/liked/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const verifiedUser = verifyAuthToken(req.headers['x-auth-token'])
        if((id != verifiedUser._id)) throw new Error('אינך מורשה לבצע פעולה זו.')
            
        const recipes = await getLikedRecipesByUser(id)
        res.status(200).send(recipes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

module.exports = router