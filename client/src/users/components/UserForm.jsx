import React from 'react'
import { func, string, object } from 'prop-types'
import Form from '../../forms/components/Form'
import ROUTES from '../../routes/routesModel'
import Input from '../../forms/components/Input'
import { FormControlLabel, Checkbox, Grid, Typography } from '@mui/material'

function UserForm( { onSubmit, onReset, onFormChange, title, errors, data, onInputChange, setData } ) {
    return (
       <Form onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} styles={{ maxWidth: "480px" }} display="flex" title={title} to={ROUTES.HOME}>
            <Input name="first" label="שם פרטי" error={errors.first} onChange={onInputChange} data={data} size={6} variant={"standard"} p={1}/>
            <Input name="middle" label="שם אמצעי" error={errors.middle} onChange={onInputChange} data={data} size={6} variant={"standard"} p={1}/>
            <Input name="last" label="שם משפחה" error={errors.last} onChange={onInputChange} data={data} size={6} variant={"standard"} p={1}/>
            <Input name="phone" label="טלפון" error={errors.phone} onChange={onInputChange} data={data} size={6} variant={"standard"} p={1}/>
            <Input name="url" label="לינק" error={errors.url} onChange={onInputChange} data={data} size={6} variant={"standard"} p={1}/>
            <Input name="alt" label="תיאור" error={errors.alt} onChange={onInputChange} data={data} size={6} variant={"standard"} p={1}/>
            <Grid>
                <FormControlLabel onChange={e => { setData({ ...data, isBusiness: !!e.target.checked }) }} name="isBusiness" control={<Checkbox value={data.isBusiness} color="primary" />} label="Signup as business" checked={data.isBusiness}/>
            </Grid>
       </Form>
    )
}

UserForm.propTypes = {
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired,
    title: string.isRequired,
    errors: object.isRequired,
    data: object.isRequired,
    onInputChange: func.isRequired,
    setData: func.isRequired
}

export default React.memo(UserForm)
