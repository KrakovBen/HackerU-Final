import './App.css'
import Layout from './layout/Layout'
import { SnackbarProvider } from './providers/SnackbarProvider'
import { BrowserRouter } from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <SnackbarProvider>
          <Layout></Layout>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  )
}

export default App
