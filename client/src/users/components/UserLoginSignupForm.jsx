import React from 'react'
import { func, string, object } from 'prop-types'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'

function UserLoginSignupForm( { onSubmit, onReset, onFormChange, title, to, errors, data, onInputChange, setData } ) {
    return (
        <Form styles={{ maxWidth: '480px' }} onSubmit={onSubmit} onReset={onReset} onChange={onFormChange} title={title} to={to} errors={errors} data={data} onInputChange={onInputChange} setData={setData}>
            <Input name="email" label="כתובת אי-מייל" error={errors.email} onChange={onInputChange} data={data} variant={"standard"} p={1}/>
            <Input name="password" label="סיסמה" error={errors.password} onChange={onInputChange} data={data} variant={"standard"} p={1}/>
        </Form>
    )
}

UserLoginSignupForm.propTypes = {
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired,
    title: string.isRequired,
    to: string.isRequired,
    errors: object.isRequired,
    data: object.isRequired,
    onInputChange: func.isRequired,
    setData: func.isRequired
}

export default UserLoginSignupForm