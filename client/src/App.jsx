import './App.css'
import Layout from './layout/Layout'
import { SnackbarProvider } from './providers/SnackbarProvider'
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/Router"
import UserProvider from "./users/providers/UserProvider"

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <SnackbarProvider>
            <Layout>
              <Router />
            </Layout>
          </SnackbarProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App