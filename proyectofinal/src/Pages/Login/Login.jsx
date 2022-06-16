import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useUserContext } from '../../Contexts/Context';
/* llamando a Context */
import { UilKeyholeCircle } from '@iconscout/react-unicons'
import { UilUserCircle } from '@iconscout/react-unicons'
//Notificaciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//para poder decidir si es admin o user
const routes = {
    "admin": "/admin",
    "user": "/user"
}


export default function Login() {/* Declarando funcion retornada como Login(Mayuscula la primera letra
    ya que da error,si no lo esta) */

    /* declarando e inicializando nuestros Usestates */
    const contexts = useUserContext();
    const navigate = useNavigate(); 
    const { login, token } = useUserContext();
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    /* notificando al usuario que tiene las credenciales incorrectas */
    const notify = () => toast.error("Usuario o contraseña incorrectos");
    const notifyEmpty = () => toast.error("Usuario o contraseña vacios");

    const onChange = (e, save) => {/* Para que no se recargue la pagina */
        save(e.target.value);
    }

    const onClickHandler = async (e) => {/* Cuando damos click al boton llamar a la funcion login */
        e.preventDefault(); //para que no se recargue
        if(username === '' || password === ''){//Validacion si esta vacio
            notifyEmpty();}
        else{
            const logged = await login(username, password); //espedando funcion login

            setError(!logged); //vaciar y tirar notificacion si está malo el login
            setUsername("");
            setPassword("");
            
            if (!logged) {
                notify();
            } 
        }
    }

    useEffect(() => {/* Userefect para ver que user es y redireccionar si ya estas logueado tambien*/
        if (contexts.user) {
            navigate(routes[contexts.user.role] ?? "/");
        }
    }, [contexts.user]);

    /* ("gp22_admin","t7kCJjgNd9BGkpgE") credenciales de nuestro grupo para pruebas*/
    return(//nuestra aplicacion con clases
        <section className="bg-gray-600"> {/* estilo del login y boton aceptar */}
        <form onSubmit={onClickHandler} className="flex flex-col justify-center items-center
            w-48 max-w-screen-sm mx-auto h-screen md:w-auto lg:w-80">
                <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
                <div className="space-y-5 bg-gray-700 px-9 py-9 md:px-20 md:py rounded-md">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="username" 
                        className="text-white inline-flex gap-2 text-xl font-bold items-center">
                            Usuario <UilUserCircle/>{/* Mas estilo y unas finciones para utilizar nuestros handler */}
                        </label>
                        <input type='text' 
                        value={username} 
                        placeholder='Ingresa tu usuario'
                        onChange={(e) => onChange(e, setUsername)}
                        className="rounded-lg py-2 px-1"/>
                    </div>
                    <div className="flex flex-col space-y-1" >
                        <label htmlFor="password" 
                        className="text-white  inline-flex  gap-2 text-xl items-center font-bold">
                            Contraseña <UilKeyholeCircle/>
                        </label>
                        <input type="password" value={password}/* contraseña tipo Password y mas validaciones */
                        placeholder='Contraseña'
                        onChange={(e) => onChange(e, setPassword)}
                        className="rounded-lg py-2 px-1"/>
                    </div>
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                        Ingresar{/* Boton ingresar que antes vimos como hacerle sumit */}
                    </button>
                </div>
        </form>
        </section>
    );
}