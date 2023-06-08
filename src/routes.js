import { HomePage } from './pages/home-page.jsx'
import { Profile } from './pages/profile.jsx'
// import { ReviewIndex } from './pages/review-index.jsx'
import { ChatApp } from './pages/chat-app.jsx'
// import { AdminApp } from './pages/admin-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: '🏠 Home',
    },
    // {
    //     path: 'review',
    //     component: <ReviewIndex />,
    //     label: 'Reviews'
    // },
    {
        path: 'chat',
        component: <ChatApp />,
        label: 'Chat'
    },
    {
        path: 'profile',
        component: <Profile />,
        label: 'Profile'
    },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes