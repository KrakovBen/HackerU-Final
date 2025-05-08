import React, { useCallback, useState, useMemo } from 'react'
import { object, func } from 'prop-types'
import Joi from "joi"

const useForms = (initialForm, schema, handleSubmit) => {
    const [data, setData] = useState(initialForm)
    const [errors, setErrors] = useState({})

    const handleReset = useCallback(() => {
        setData(initialForm);
        setErrors({});
    }, [initialForm])

    const validateProperty = useCallback(
        ({ name, value }) => {
            const obj = { [name]: value }
            const generateSchema = Joi.object({ [name]: schema[name] })
            const { error } = generateSchema.validate(obj)
            return error ? error.details[0].message : null
        }, [schema]
    )

    const handleChange = useCallback(
        ({ target }) => {
            const { name, value } = target
            const errorMessage = validateProperty({ name, value })

            if (errorMessage) {
                setErrors((prev) => ({ ...prev, [name]: errorMessage }))
            } else {
                setErrors((prev) => {
                    let obj = { ...prev }
                    delete obj[name]
                    return obj
                })
            }

            setData((prev) => ({ ...prev, [name]: value }))
        }, [validateProperty]
    )

    const validateForm = useCallback( () => {
        const schemaForValidate = Joi.object(schema);
        const { error } = schemaForValidate.validate(data)

        if (error) return error
        return null
    }, [schema, data] )

    const onSubmit = useCallback( () => {
        handleSubmit(data)
    }, [data, handleSubmit] )

    const value = useMemo( () => {
        return { data, errors }
    }, [data, errors] )

    return {
        value,
        onSubmit,
        handleChange,
        handleReset,
        validateForm,
        setData
    }
}

useForms.propTypes = {
    initialForm: object.isRequired,
    schema: object.isRequired,
    handleSubmit: func.isRequired
}

export default useForms
