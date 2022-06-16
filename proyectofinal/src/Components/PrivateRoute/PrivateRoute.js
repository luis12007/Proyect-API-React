import { useUserContext } from './../../Contexts/Context';
import { Navigate } from 'react-router-dom';
// imports de react y content
const Private = ({ role = "user", children }) => {/* pedimos los props que nos vienen desde app.js */
    const { token, user } = useUserContext();/* validamos nuestros parametros para poder retornar en caso de que no tengamos */

    if (!token) return <Navigate replace to="/login" />;
    if (!user || user.role !== role) return <Navigate replace to="/404" />;
    return children;
}

export default Private;/* exportamos */