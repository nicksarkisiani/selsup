import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import AppClass from "./AppClass.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppClass />
  </StrictMode>,
)
