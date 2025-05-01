import './App.css'
import Layout from './layout/Layout'
import { SnackbarProvider } from './providers/SnackbarProvider'
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/Router"

function App() {

  return (
    <>
      <BrowserRouter>
        <SnackbarProvider>
          <Layout>
            <Router/>
          </Layout>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  )
}

export default App
