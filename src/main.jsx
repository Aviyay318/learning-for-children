import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UserProvider} from "./contexts/UserContext.jsx";
import {ApiProvider} from "./contexts/ApiContext.jsx";

createRoot(document.getElementById('root')).render(

    <StrictMode>
    <ApiProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </ApiProvider>
  </StrictMode>,
)
