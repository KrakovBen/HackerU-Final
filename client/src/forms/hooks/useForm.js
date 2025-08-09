import { useState, useCallback, useMemo } from 'react'
import Joi from 'joi'
import { object, func } from 'prop-types'

const useForm = (initialForm, schema, handleSubmit) => {
    const [data, setData] = useState(initialForm)
    const [errors, setErrors] = useState({})

    const handleReset = useCallback(() => {
        setData(initialForm)
        setErrors({})
    }, [initialForm] )

    const validateProperty = useCallback( ({ name, value }) => {
        const obj = { [name]: value }
        const generateSchema = Joi.object({ [name]: schema[name] })
        const { error } = generateSchema.validate(obj)
        return error ? error.details[0].message : null
    }, [schema] )

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target
      
        const arrayFieldMatch = name.match(/^(ingredients|instructions)-(\d+)$/)
        if (arrayFieldMatch) {
          const [, fieldName, indexStr] = arrayFieldMatch
          const index = Number(indexStr)
      
          setData(prev => {
            const copy = [...(prev[fieldName] || [])]
            copy[index] = value
      
            const err = validateProperty({ name: fieldName, value: copy })
      
            setErrors(prevErrs => {
              const next = { ...prevErrs }
              if (err) next[name] = err
              else delete next[name]
              return next
            })
      
            return { ...prev, [fieldName]: copy }
          })
      
          return
        }
      
        if (name === 'ingredients' || name === 'instructions') {
          return
        }
      
        const errorMessage = validateProperty(target)
        setErrors(prev => {
          const next = { ...prev }
          if (errorMessage) next[name] = errorMessage
          else delete next[name]
          return next
        })
      
        setData(prev => ({ ...prev, [name]: value }))
      }, [validateProperty, setData, setErrors])

    const validateForm = useCallback(() => {
        const schemaForValidate = Joi.object(schema)
        const { error } = schemaForValidate.validate(data)
        if (error) return error
        return null
    }, [schema, data] )

    const onSubmit = useCallback(() => {
        handleSubmit(data)
    }, [handleSubmit, data])

    const value = useMemo(() => {
        return { data, errors }
    }, [data, errors])

    return { value, onSubmit, handleChange, handleReset, validateForm, setData }
}

useForm.propTypes = {
    initialForm: object.isRequired,
    schema: object.isRequired,
    handleSubmit: func.isRequired
}

export default useForm
