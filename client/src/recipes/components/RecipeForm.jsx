import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useForm from '../../forms/hooks/useForm'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import ROUTES from '../../routes/routesModel'
import { Typography, Button, Box } from '@mui/material'

const initialForm = {
    title: '',
    description: '',
    instructions: '',
    ingredients: '',
    category: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    imageUrl: '',
}

const RecipeForm = ({ onSubmit, onReset, errors, onFormChange, onInputChange, data, title }) => {
    const [ ingredientsList, setIngredientsList ] = useState([''])
    const [ instructionsList, setInstructionsList ] = useState([''])

    useEffect(() => {
        if (data) {
          if (data.ingredients) {
            const ingredients = Array.isArray(data.ingredients) ? data.ingredients : data.ingredients.split(',').map(i => i.trim()).filter(Boolean)
            setIngredientsList(ingredients.length ? ingredients : [''])
          }
      
          if (data.instructions) {
            const instructions = Array.isArray(data.instructions) ? data.instructions  : data.instructions.split(',').map(i => i.trim()).filter(Boolean)
            setInstructionsList(instructions.length ? instructions : [''])
          }
        } else {
          setIngredientsList([''])
          setInstructionsList([''])
        }
    }, [data])

    return (
        <Form title={title} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} to={ROUTES.RECIPES} color='primary' spacing={2} styles={{ maxWidth: "980px", width: "80vw", margin: "auto" }}>
            <Input label='שם המתכון' name='title' type='text' error={errors} data={data} onChange={onInputChange} />
            <Input label='תיאור המתכון' name='description' type='text' error={errors} data={data} onChange={onInputChange} />
            <Input label='זמן הכנה' name='prepTimeMinutes' type='number' sx={{ gridColumn: 'span 6' }} error={errors} data={data} onChange={onInputChange} />
            <Input label='זמן בישול' name='cookTimeMinutes' type='number' sx={{ gridColumn: 'span 6' }} error={errors} data={data} onChange={onInputChange} />
            <Input label='קטגוריה' name='category' type='text' sx={{ gridColumn: 'span 6' }} error={errors} data={data} onChange={onInputChange} />
            <Input label='תמונה' name='imageUrl' type='text' error={errors} data={data} onChange={onInputChange} />

            <Typography variant='h5' component='h2' sx={{ mt: 2 }}>מצרכים</Typography>
            { ingredientsList.map( (item, index) => (                
                <Input key={index} label={`מצרך מספר ${index + 1}`} name={`ingredients-${index}`} type='text' error={errors?.[`ingredients-${index}`]} data={{[`ingredients-${index}`]: item}} onChange={onInputChange} />
            ) ) }
            <Box display="flex" justifyContent="flex-end" sx={{ gridColumn: 'span 12' }}>
                <Button sx={{ width: '100%' }} variant='outlined' color='primary' onClick={() => setIngredientsList([...ingredientsList, ''])}>הוסף מצרכים</Button>
            </Box>
            <Typography variant='h5' component='h2' sx={{ mt: 2 }}>הוראות הכנה</Typography>
            { instructionsList.map( (item, index) => (
                <Input key={index} label={`הוראות מספר ${index + 1}`} name={`instructions-${index}`} type='text' error={errors?.[`instructions-${index}`]} data={{[`instructions-${index}`]: item}} onChange={onInputChange} />
            ) ) }
            <Box display="flex" justifyContent="flex-end" sx={{ gridColumn: 'span 12' }}>
                <Button sx={{ width: '100%' }} variant='outlined' color='primary' onClick={() => setInstructionsList([...instructionsList, ''])}>הוסף הוראות</Button>
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
