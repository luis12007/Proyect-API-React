import Services from "../Services/UserServices";
import React, { useEffect, useState } from 'react';
import Card from "./Card";
import { useUserContext } from '../Contexts/Context';
//importamos

const PostContainer = () => {
    const [pages, setPages] = useState(0);
    const [posts, setPosts] = useState([]);
    const { login, token } = useUserContext();//obtener el token

    useEffect(() => {
        getPosts();
    }, []);
        //cambiando paginas
    const nextPage = async () => {
        const newPages = pages + 1;
        setPages(newPages);
        await getPosts();
    }

    const previusPage = async () => {
        const newPages = pages - 1;
        setPages(newPages);
        await getPosts();
    }
        //obteniendo post
    const getPosts = async () => {
        let response = await Services.GetAll(token, 6, pages)
        let data =  response.data;
        setPosts(data);
    }

    

    return (/* Nuestra pagina con cards */
        <> 
            <div className="flex flex-wrap">
        {posts.map((data)=>{
            return <Card createdAt={data.createdAt} key={data._id} id={data._id} title={data.title} 
            username={data.user.username} description={data.description} 
            image={data.image} likes={data.likes} comments={data.comments}/>
            })}
        </div>
        <div className="flex justify-center space-x-5 pb-5">
            <button className="bg-blue-300 p-3 rounded" onClick={previusPage}>Anterior</button>
            <button className="bg-red-300 p-3 rounded" onClick={nextPage}>Siguiente</button>
        </div>
        </>
    )
}

export default PostContainer; //exportamos