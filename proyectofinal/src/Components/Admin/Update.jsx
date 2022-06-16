import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../Contexts/Context';
import Services from "../../Services/UserServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdatePostC() {
    const [postName, setpostName] = useState("") // estado para el nombre del post
    const [posts, setPosts] = useState([]); // estado para los posts
    const [postFound, setPostFound] = useState([]); // estado para el post encontrado
    const { login, token } = useUserContext(); // estado para el token
    const [title, setTitle] = useState("") // estado para el titulo del post
    const [descrip, setdescrip] = useState("") // estado para la descripcion del post
    const [img, setimg] = useState("") // estado para la imagen del post

    const notifySucces = () => toast("Post actualizado exitosamente"); // notificacion de exito
    const notifyErrorTitle = () => toast.error("El titulo debe tener entre 8 y 32 caracteres"); // notificacion de error en el titulo
    const notifyErrorEmpty = () => toast.error("Todos los campos son oblogatorios y no pueden quedar vacios"); // notificacion de error en los campos

    const notifyFound = () => toast("Post encontrado"); // notificacion de exito
    const notifyError = () => toast.error("El post no existe o no es de su propiedad"); // notificacion de error en el titulo


    useEffect(() => { // funcion para obtener los posts
        getPosts();
    }, []);

    const SetData = (val) =>{ // funcion para setear el titulo
        setTitle(val.target.value)
    }

    const SetData2 = (val) =>{ // funcion para setear la descripcion
        setdescrip(val.target.value)
    }

    const SetData3 = (val) =>{ // funcion para setear la imagen
        setimg(val.target.value)
    }

    const search = () => { // funcion para buscar un post
        const cscs = posts.find(element => element.title == postName)
        console.log(cscs)
        if (posts.find(element => element.title == postName)){ // si el post existe se setea el post encontrado
            console.log("entro")
            notifyFound();
            const cscs = posts.find(element => element.title == postName)
            setPostFound(cscs);
        }
        else{
            console.log("no entro") // si el post no existe se notifica de error
            notifyError();
        }
    }

    const reloadPage = () => { // funcion para recargar la pagina
        setTimeout(function(){
            window.location.reload();
        }   ,5000);
    }


    const update_post = async () =>{ // funcion para actualizar el post
        if (title === "" || descrip ==="" || img==="") { // si algun campo esta vacio se notifica de error
            notifyErrorEmpty();
        }
        else if (title.length < 9 || title.length > 33 || descrip.length < 9) { // si algun campo tiene una longitud invalida se notifica de error
                notifyErrorTitle();
        }else{ // si todos los campos estan correctos se actualiza el post
            notifySucces();
            Services.Update(token,"admin",postFound._id,title,descrip,img)
            .then(res => {
                console.log(res);
            }
            , err => {
                console.log(err);
            }
            )
            reloadPage(); 
        }
    }

    const GetValue = (get) => { // funcion para obtener el nombre del post
        setpostName(get.target.value)
    }
    const getPosts = async () => { // funcion para obtener los posts del admin (Que seran usados para actualizar)
        let response = await Services.Owned(token, "admin", 100, 0)
        let data = response.data;
        setPosts(data);
    }
    const reloadFaster = () => { // funcion para recargar la pagina mas rapido
        setTimeout(function(){
            window.location.reload();
        }   ,1000);
    }


    return (
        <div className="space-y-7 mt-6">
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
            <div className="bg-gray-800 w-96 mx-auto text-white text-center p-7 rounded-lg space-y-5">
                <h1 className="text-xl font-bold ">Ingrese nombre de post</h1>
                <input type="text" placeholder="(Ingrese post valido)" onChange={GetValue} className="p-2 rounded-lg text-black"/>
                <button onClick={search} 
                className="bg-blue-500 hover:bg-blue-700 transition m-5 p-2 
                text-white font-semibold rounded-lg">Buscar</button>
            </div>
            <div className="text-center flex flex-col space-y-3 w-96 content-center mx-auto bg-gray-800 p-10 rounded-xl">
                <h2 className="text-white font-bold text-xl">
                    Titulo:
                </h2>
                <input id="titulo" type="text" placeholder="Inserte su titulo" onChange={SetData} className="rounded-xl p-2" />
                <h2 className="text-white font-bold text-xl">
                    Descripción:
                </h2>
                <input id="Description" type="text" placeholder="Inserte una descripcion" onChange={SetData2} className="rounded-xl p-2" />
                <h2 className="text-white font-bold text-xl">
                    Imagen:
                </h2>
                <input id="Imagen" type="text" placeholder="(Use una URL valida)" onChange={SetData3} className="rounded-xl p-2" />
                <div>
                    <button onClick={update_post} className="bg-blue-500 hover:bg-blue-700 transition m-5 p-2 text-white font-semibold rounded-lg">Actualizar</button>
                    <button onClick={reloadFaster} className="bg-red-500 hover:bg-red-700 transition m-5 p-2 text-white font-semibold rounded-lg">Volver</button>
                </div>
            </div>
        </div>
    )
}