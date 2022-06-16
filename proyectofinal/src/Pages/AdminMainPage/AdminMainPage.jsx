import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useUserContext } from '../../Contexts/Context';
import PostContainer from '../../Components/PostContainer';
import CreatePost from '../../Components/Admin/Create';
import ToggleP from '../../Components/Admin/Toggle';
import UpdatePostC from '../../Components/Admin/Update';
//importamos

export default function Admin() { //exportamos nuestra funcion
    const navigate = useNavigate()
    const { Exit } = useUserContext()
    const [Create, setCreate] = useState(false);
    const [UpdateP, setUpdatePost] = useState(false);
    const [Toggle, setToggle] = useState(false);
    //Declaramos nuestros use state y context

    //Declaramos un bool que nos ayudara mas tarde
    const go = true
    const Update = () => {//nos ayuda el Bool"go" para poder mostrar lo que queremos en return
        setUpdatePost(go)
    }
    const Togglepost = () => {
        setToggle(go)
    }
    const createPost = () => {
        setCreate(go)
    }

    //Mas Handler para seguir navegando por la pagina
    const LogoutHandler = () => {
        Exit()
        navigate("/Login")
    }

    const EnterHome = () => {
        navigate("/admin")
    }
    

    const ownPosts = () => {
        navigate("/ownposts")
    }

    return (/* Nuestra pagina con su diseño tailwind */
        <div>{/* Encabezado  que se repite en todas las paginas*/}
            {<section className="relative w-full px-8 text-white bg-gray-800 body-font">
                <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
                    <a className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none select-none">UCA pages</a>
                    <nav className="top-0 left-0 z-0 flex items-center justify-center w-full h-full py-5 -ml-0 space-x-5 text-base md:-ml-5 md:py-0 md:absolute">
                        <a className="relative font-medium leading-6 p-5 rounded-lg hover:bg-gray-400 transition duration-150 ease-out ">
                            <span className="block" onClick={EnterHome}>Home</span>
                            <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                <span x-show="hover" className="absolute inset-0 inline-block w-full h-1 h-full transform "></span>
                            </span>
                        </a>{/* estos "a" nos muestran lo que queremos en la parte de abajo */}
                        <a onClick={ownPosts} className="relative font-medium leading-6 p-5 rounded-lg hover:bg-gray-400 transition duration-150 ease-out " x-data="{ hover: false }">
                            <span className="block">Owned</span>
                            <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                <span x-show="hover" className="absolute inset-0 inline-block w-full h-1 h-full transform "></span>
                            </span>
                        </a>
                        <a onClick={Update} className="relative font-medium leading-6 p-5 rounded-lg hover:bg-gray-400 transition duration-150 ease-out " x-data="{ hover: false }">
                            <span className="block">Update</span>
                            <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                <span x-show="hover" className="absolute inset-0 inline-block w-full h-1 h-full transform "></span>
                            </span>
                        </a>
                        <a onClick={createPost} className="relative font-medium leading-6 p-5 rounded-lg hover:bg-gray-400 transition duration-150 ease-out " x-data="{ hover: false }" >
                            <span className="block">Create Post</span>
                            <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                <span x-show="hover" className="absolute inset-0 inline-block w-full h-1 h-full transform "></span>
                            </span>
                        </a>

                        <a onClick={Togglepost} className="relative font-medium leading-6 p-5 rounded-lg hover:bg-gray-400 transition duration-150 ease-out " x-data="{ hover: false }" >
                            <span className="block">Toggle</span>
                            <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                <span x-show="hover" className="absolute inset-0 inline-block w-full h-1 h-full transform "></span>
                            </span>
                        </a>
                    </nav>
                        {/* boton salir */}
                    <div class="relative z-10 inline-flex items-center space-x-3 md:ml-5 lg:justify-end">
                        <span class="inline-flex rounded-md shadow-sm">
                            <a href="#" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={LogoutHandler}>
                                Logout
                            </a>
                        </span>
                    </div>
                </div>
                    {/* Aqui se muestra segun el boton que nosotros elegimos, y se esconde cuando vuelve a falso */}
    </section>}{/* Cada Ruta esta en componentes para mejor organización */}
<div>{Create && <CreatePost />}</div>
{ UpdateP && <UpdatePostC /> }
{ Toggle && <ToggleP /> }
<PostContainer />
    </div >
    )
}

