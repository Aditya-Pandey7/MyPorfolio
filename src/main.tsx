import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { ProfileProvider } from './context/ProfileContext.tsx'

createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </ThemeProvider>
)
