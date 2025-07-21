import React from 'react'
import PropTypes from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box } from '@mui/material'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

const UpdateUserForm = ( { onSubmit, onReset, onFormChange, title, to, errors, data, onInputChange } ) => {
    return (
        <Form onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} title={title} to={to} errors={errors} data={data} onInputChange={onInputChange}>
            <Input name="first" label="שם פרטי" error={errors.first} onChange={onInputChange} data={data} variant={"standard"} p={1}/>
            <Input name="middle" label="שם אמצעי" error={errors.middle} onChange={onInputChange} data={data} variant={"standard"} p={1}/>
            <Input name="last" label="שם משפחה" error={errors.last} onChange={onInputChange} data={data} variant={"standard"} p={1}/>
            <Input name="phoneNumber" label="טלפון" error={errors.phoneNumber} onChange={onInputChange} data={data} variant={"standard"} p={1}/>
            <Input name="password" label="סיסמה" error={errors.password} onChange={onInputChange} data={data} variant={"standard"} p={1}/>
            {/* <Button component="label" role={undefined} variant="contained" tabIndex={-1}><CloudUploadIcon sx={{ fontSize: 20, marginInlineEnd: 1 }}/> העלה תמונת פרופיל<VisuallyHiddenInput type="file" accept=".jpg,.jpeg,.png" onChange={(event) => { console.log(event.target.files[0]) }} /></Button> */}
        </Form>
    )
}

UpdateUserForm.propTypes = {}

export default UpdateUserForm
