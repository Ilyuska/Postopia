import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <CssBaseline />  {/* Файл обнуления стилей */}
      <App />
    </StrictMode>
)
