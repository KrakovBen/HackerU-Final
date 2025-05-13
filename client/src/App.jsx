import './App.css'
import { theme } from './theme'
import { ThemeProvider } from '@mui/material/styles'
import Layout from './layout/Layout'
import { SnackbarProvider } from './providers/SnackbarProvider'
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/Router"
import UserProvider from "./users/providers/UserProvider"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <SnackbarProvider>
            <Layout>
              <Router />
            </Layout>
          </SnackbarProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App