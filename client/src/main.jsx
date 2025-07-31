import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/global.scss'
import App from './App.jsx'

import '@fontsource/heebo/100.css'
import '@fontsource/heebo/200.css'
import '@fontsource/heebo/300.css'
import '@fontsource/heebo/400.css'
import '@fontsource/heebo/500.css'
import '@fontsource/heebo/600.css'
import '@fontsource/heebo/700.css'
import '@fontsource/heebo/800.css'
import '@fontsource/heebo/900.css'
import '@fontsource/karantina/300.css'
import '@fontsource/karantina/400.css'
import '@fontsource/karantina/700.css'

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)