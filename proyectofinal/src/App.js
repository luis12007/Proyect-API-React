import Login from './Pages/Login/Login';
import Private from './Components/PrivateRoute/PrivateRoute'
import Home from './Pages/Home/Home';
import User from './Pages/UserMainPage/UserMainPage';
import Admin from './Pages/AdminMainPage/AdminMainPage';
import UserFavorite from './Pages/UserFavorites/UserFavoritePage';
import Error from './Pages/Error404/Error';
import Owned from './Pages/Owned/Owned';
//Obteniendo nuestros imports de pages, componentes

import { HashRouter, Routes, Route, Navigate } from "react-router-dom"; /* importando react router para navegar */

function App() {/* App */
  return (

    <HashRouter>{/* cambiamos el browser ya que HashRouter tiene la misma funcionalidad */}
      <Routes>{/* Para solo mostrar una ruta */}
        <Route path="/" element={<Home />} />{/* La ruta de Home cuando se ingresa */}
        <Route path="/Login" element={<Login />} />{/* Login que lleva a admin y user */}
        <Route path="/*" element={<Error />} />{/* Error para cualquier ruta que no sea una establecida */}

      {/* Rutas privadas para evitar hackeos */}
        <Route path="/admin" element={<Private role="admin"> <Admin/></Private>}/>{/* admin main */}
        <Route path="/ownposts" element={<Private role="admin"> <Owned/></Private>}/>{/* OwnPost de admin */}
        <Route path="/user" element={<Private role="user"> <User/></Private>}/>{/* User Home */}
        <Route path="/userfavorite" element={<Private role="user"> <UserFavorite/></Private>}/>{/* Favoritos de User */}
      </Routes>
    </HashRouter>
  );
}
/* hicimos own y favoritos en una ruta en especial ya que es mucho contenido para una sola pagina */

export default App;
