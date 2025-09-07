import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import ROUTES from '../../routes/routesModel'
import { Typography, Button, Box } from '@mui/material'
import Spinner from '../../components/Spinner'

const RecipeForm = ({ onSubmit, onReset, errors, onFormChange, onInputChange, data, title, recipeID }) => {    
    const [ ingredientsList, setIngredientsList ] = useState([''])
    const [ instructionsList, setInstructionsList ] = useState([''])
    const [ imageFile, setImageFile ] = useState(null)
    const [ imagePreview, setImagePreview ] = useState(data?.imageUrlFull ? `${data.imageUrlFull}` : null)

    useEffect(() => {
        if (!data) {
            setIngredientsList([''])
            setInstructionsList([''])
            setImageFile(null)
            setImagePreview(null)
            return
        }

        try {
            const ingredients = Array.isArray(data.ingredients) 
                ? data.ingredients 
                : (data.ingredients || '').split(',').map(i => i.trim()).filter(Boolean)
            setIngredientsList(ingredients.length ? ingredients : [''])

            const instructions = Array.isArray(data.instructions) 
                ? data.instructions 
                : (data.instructions || '').split(',').map(i => i.trim()).filter(Boolean)
            setInstructionsList(instructions.length ? instructions : [''])
        } catch (error) {
            console.error('Error processing recipe data:', error)
            setIngredientsList([''])
            setInstructionsList([''])
        }
    }, [data])

    if (!data) return <Spinner />

    return (
        <Form title={title} onSubmit={() => onSubmit({ ...data, __imageFile: imageFile })} onReset={onReset} onChange={onFormChange} to={`${ROUTES.RECIPE}/${recipeID}`} color='primary' spacing={2} styles={{ maxWidth: "980px", width: "80vw", margin: "auto" }}>
            <Input label='שם המתכון' name='title' type='text' error={errors?.title} data={data} onChange={onInputChange} />
            <Input label='תיאור המתכון' name='description' type='text' error={errors?.description} data={data} onChange={onInputChange} />
            <Input label='זמן הכנה (בדקות)' name='prepTimeMinutes' type='number' sx={{ gridColumn: 'span 6' }} error={errors?.prepTimeMinutes} data={data} onChange={onInputChange} />
            <Input label='זמן בישול (בדקות)' name='cookTimeMinutes' type='number' sx={{ gridColumn: 'span 6' }} error={errors?.cookTimeMinutes} data={data} onChange={onInputChange} />
            <Input label='קטגוריה' name='category' type='text' sx={{ gridColumn: 'span 6' }} error={errors?.category} data={data} onChange={onInputChange} />

            <Box sx={{ gridColumn: 'span 12' }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>תמונה</Typography>
                <input type="file" accept="image/*" onChange={(event) => {
                    const file = event.target.files?.[0] || null

                    setImageFile(file)
                    setImagePreview(file ? URL.createObjectURL(file) : null)

                    if (file) onInputChange({ target: { name: "imageUrl", value: `/uploads/recipes/${file.name}` } })
                }}/>
                {imagePreview || data?.imageUrlFull ? (
                    <Box sx={{ mt: 1 }}>
                        <img alt="תצוגה מקדימה" src={imagePreview || data.imageUrlFull} style={{ maxWidth: 240, borderRadius: 8 }} />
                    </Box>
                ) : null}
            </Box>

            <Typography variant='h5' component='h2' sx={{ mt: 2 }}>מצרכים</Typography>
            { ingredientsList.map( (item, index) => (                
                <Input key={index} label={`מצרך מספר ${index + 1}`} name={`ingredients-${index}`} type='text' error={errors?.[`ingredients-${index}`]} data={{[`ingredients-${index}`]: item}} onChange={onInputChange} />
            ) ) }
            <Box display="flex" justifyContent="flex-end" sx={{ gridColumn: 'span 12' }}>
                <Button sx={{ width: '100%' }} variant='outlined' color='primary' onClick={() => setIngredientsList([...ingredientsList, ''])}>הוספת מצרכים</Button>
            </Box>
            <Typography variant='h5' component='h2' sx={{ mt: 2 }}>הוראות הכנה</Typography>
            { instructionsList.map( (item, index) => (
                <Input key={index} label={`הוראות מספר ${index + 1}`} name={`instructions-${index}`} type='text' error={errors?.[`instructions-${index}`]} data={{[`instructions-${index}`]: item}} onChange={onInputChange} />
            ) ) }
            <Box display="flex" justifyContent="flex-end" sx={{ gridColumn: 'span 12' }}>
                <Button sx={{ width: '100%' }} variant='outlined' color='primary' onClick={() => setInstructionsList([...instructionsList, ''])}>הוספת הוראות</Button>
            </Box>
        </Form>
    )
}

RecipeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFormChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
}

export default RecipeForm
