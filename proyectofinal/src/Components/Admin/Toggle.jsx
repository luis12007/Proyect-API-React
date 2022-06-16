import Services from "../../Services/UserServices";
import React, { useEffect, useState } from 'react';
import CardToggle from "../cardToggle";
import { useUserContext } from '../../Contexts/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToggleP() { 
    const [pages, setPages] = useState(0);  // estado para el numero de paginas
    const [posts, setPosts] = useState([]); // estado para los posts
    const { login, token } = useUserContext(); // estado para el token
    const [id, setid] = useState(); // estado para el id del post

    useEffect(() => { // funcion para obtener los posts
        getPosts();
    }, []);

    const nextPage = async () => { // funcion para la siguiente pagina
        const newPages = pages + 1;
        await setPages(newPages);
        await getPosts();
    }

    const previusPage = async () => { // funcion para la pagina anterior
        const newPages = pages - 1;
        await setPages(newPages);
        await getPosts();
    }

    const reloadFaster = () => { // funcion para recargar la pagina
        setTimeout(function(){
            window.location.reload();
        }   ,1000);
    }

    const reloadPage = () => { // funcion para recargar la pagina mas rapido
        setTimeout(function(){
            window.location.reload();
        }   ,5000);
    }

    const notifySucces = () => toast("Toggle realizado con exito"); // notificacion de exito

    //Aca basicamente solo el admin puede acceder a esta pagina asi que 
    //por ese motiivo se hace la funcion asi
    const getPosts = async () => {
        let response = await Services.Owned(token, "admin", 6, pages)
        let data = response.data;
        setPosts(data);
    }

    const GetValue = (val) =>{ // funcion para obtener el id del post
        setid(val.target.value)
    }

    const Active_desactive = () =>{ // funcion para activar o desactivar el post
        Services.Toggle(token,"admin",id)
        notifySucces();
        reloadPage();
    }

    return (
        
        <>
            <div className="flex flex-wrap">
                {posts.map((data) => {
                    return <CardToggle createdAt={data.createdAt} id={data._id} title={data.title} isOwnedPage={false}/>
                })}
            </div>
            <div className="flex justify-center space-x-5 pb-5">
                <button className="bg-blue-300 p-3 rounded" onClick={previusPage}>Anterior</button>
                <button className="bg-red-300 p-3 rounded" onClick={nextPage}>Siguiente</button>
            </div>
            <div className="bg-gray-800 text-white w-48 mx-auto p-5 rounded-md space-y-3">
                <div className="text-center space-y-4">
                    <h1 className="">Ingrese id</h1>
                    <input className="text-black w-20 p-2 rounded mx-auto" type="text" placeholder="id" onChange={GetValue}/>
                </div>
                <div className="text-center space-y-3 mt-2">
                    <button className="bg-blue-400 hover:bg-blue-700 transition p-2 rounded-lg" onClick={Active_desactive}>Activar/Desactivar</button>
                    <button className="bg-red-400 hover:bg-red-700 transition p-2 rounded-lg" onClick={reloadFaster}>Cancelar</button>
                </div>
            </div>
        </>
    )
}