import React from "react"
import { useState } from "react"
import { UilEditAlt } from '@iconscout/react-unicons'
import { UilSmileBeam } from '@iconscout/react-unicons'
import { UilStar } from '@iconscout/react-unicons'
import { UilAndroidPhoneSlash } from '@iconscout/react-unicons'
import { useUserContext } from "../Contexts/Context"
import { useEffect } from "react"
import Services from "../Services/UserServices";
import CommentCardContainer from "./CommentContainer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Card(props) {

    const { login, token } = useUserContext(); // estado para el token

    const reloadFaster = () => { // funcion para recargar la pagina mas rapido
        setTimeout(function(){
            window.location.reload();
        }   ,1000);
    }

    const [username, setUsername] = useState(""); // estado para el username
    const [likes, setLikes] = useState(props.likes.length); // estado para los likes
    const [commentState, setCommentState] = useState(props.comments); // estado para los comentarios
    const [commet, setcommet] = useState("") // estado para el comentario a enviar

    const notifyErrorTitle = () => toast.error("El comentario debe tener minimo 8 caracteres"); // notificacion de error en el titulo
    const notifyErrorEmpty = () => toast.error("No puedes hacer un comentario vacio");// notificacion de error en los campos
    const notifyfav = () => toast("Favorito Añadido/Removido");
    
    const getUsername = async () => { // funcion para obtener el username
    const response = await Services.verifyToken(token); // obtenemos el token
    const username = response.username; // obtenemos el username
    setUsername(username); // seteamos el username
    setCommentState(props.comments); // seteamos los comentarios
    /*console.log(username); 
    console.log(commentState);*/ // para verificar que funciona
    }

    const [liked, setLiked] = useState(props.likes.some((item) => item.username === username)); // estado para saber si el usuario ya le dio like al post


    useEffect(() => { // funcion para obtener el username
        getUsername();
    }, []);

    const SetData = (val) =>{ // funcion para setear el comentario
        setcommet(val.target.value)
    }

    const addcoment =(e) =>{ // funcion para agregar un comentario
        e.preventDefault();
        if (commet === "") { // si el comentario esta vacio notificamos de error
            notifyErrorEmpty();
        }
        else if (commet.length < 8) { // si el comentario tiene menos de 8 caracteres notificamos de error
            notifyErrorTitle();
        }
        else{ // si no hay error agregamos el comentario al post y recargamos la pagina
        Services.Commet(token,props.id,commet)
        reloadFaster();
        }
    }

    async function likePost() { // funcion para dar like al post 
        await Services.Like(token, props.id); // llamamos al servicio para dar like al post
        if (!liked) { 
            setLikes(likes + 1);
            setLiked(true);
        } else {
            setLikes(likes - 1);
            setLiked(false);
        }
    }

    async function addToFavorites() { // funcion para agregar el post a favoritos
        const favorited = await Services.AddFavorite(token, props.id);  
        notifyfav()      
    }


    return (
        <>
                <div className="p-4 sm:w-1/2 lg:w-1/3">
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
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img className="lg:h-72 md:h-48 w-full object-cover object-center"
                            src={props.image} alt="Post img"/>
                        <div className="p-6 transition duration-300 ease-in">
                            <h2 className="text-sm font-medium text-gray-400 mb-1">{new Date(props.createdAt).toLocaleDateString()}</h2>
                            <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
                            <p className="leading-relaxed mb-3">{props.description}</p>
                            <div className="flex items-center flex-wrap ">
                                <a className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0">{props.username}</a>
                                <span className="text-gray-400 cursor-pointer mr-10 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm border-gray-200">
                                    <UilSmileBeam className={`cursor-pointer ${liked && 'text-yellow-400'}`} onClick={likePost}/>{props.likes.length}
                                </span>
                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                    <UilStar className="cursor-pointer" onClick={addToFavorites} />
                                </span>
                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                    <UilAndroidPhoneSlash/>
                                </span>
                                <span className="text-gray-400 inline-flex items-center leading-none text-sm cursor-pointer">
                                    <UilEditAlt/>
                                </span>
                            </div>
                            <div >
                            <h2 className= "text-lg font-semibold text-center text-gray-400 mt-4">Comentarios</h2>
                            {
                                props.comments && commentState.map((item) => {
                                    return <CommentCardContainer key={item.id} username={item.user.username} 
                                    description={item.description}/>
                                })
                            }
                            </div>
                            <div className="p-5">
                                <form className="w-full" >
                                    <input
                                        className="px-4 py-2 w-full rounded-lg text-gray-800 border border-gray-500 text-sm"
                                        type="text"
                                        placeholder="Escribe y presiona el boton" onChange={SetData}
                                    />
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded-lg transition "
                                    onClick={addcoment}>Añadir comentario</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )}

