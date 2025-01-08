import { Provider } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Toaster, toaster } from "@/components/ui/toaster"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Provider>
          <Toaster/>
          <App />
        </Provider>
    </BrowserRouter>
  </StrictMode>
)
