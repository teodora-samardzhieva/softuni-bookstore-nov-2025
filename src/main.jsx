import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import './index.css';
import { UserProvider } from './context/UserContext.jsx';
import { FavoritesProvider } from './context/FavoriteContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>  
      <FavoritesProvider>
      <App />
      </FavoritesProvider>
    </UserProvider>
  </BrowserRouter>
)
