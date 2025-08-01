import React, { useState, useCallback, useContext } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { node } from 'prop-types'

const SnackbarContext = React.createContext(null)

export const SnackbarProvider = ({ children }) => {
    const [isSnackOpen, setOpenSnack] = useState(false)
    const [snackColor, setSnackColor] = useState("success")
    const [snackVariant, setSnackVariant] = useState("filled")
    const [snackMessage, setSnackMessage] = useState("in snackbar!")

    const setSnack = useCallback((color, message, variant = "filled") => {
        setOpenSnack(true)
        setSnackColor(color)
        setSnackVariant(variant)
        setSnackMessage(message)
    }, [])



    return (
        <>
        <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "left" }} open={isSnackOpen} onClose={() => setOpenSnack((prev) => !prev)} autoHideDuration={5000}>
            <Alert severity={snackColor} variant={snackVariant}>{snackMessage}</Alert>
        </Snackbar>

        <SnackbarContext.Provider value={setSnack}>
            {children}
        </SnackbarContext.Provider>
        </>
    )
}

export const useSnackbar = () => {
    const context = useContext(SnackbarContext)
    if (!context) throw new Error("useSnackbar must be used within a <SnackbarProvider>")
    return context
}

SnackbarProvider.propTypes = {
    children: node.isRequired
}