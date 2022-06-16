import Services from "../Services/UserServices";
import React, { useEffect, useState } from 'react';
import CardUser from "./CardUser";
import { useUserContext } from '../Contexts/Context';
//importando

const PostContainerUser = () => {
    const [pages, setPages] = useState(0);
    const [posts, setPosts] = useState([]);
    const { login, token } = useUserContext();
        //delcarando variables y usando el useEffect
    useEffect(() => {
        getPosts();
    }, []);
        //cambiando de pagina
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

    return (/* Vista de pagina */
        <>
            <div className="flex flex-wrap">
        {posts.map((data)=>{
            return <CardUser createdAt={data.createdAt} key={data._id} id={data._id} title={data.title} 
            username={data.user.username} description={data.description} image={data.image} likes={data.likes} 
            comments={data.comments} />
            })}
        </div>
        <div className="flex justify-center space-x-5 mb-3">
            <button className="bg-blue-300 p-3 rounded" onClick={previusPage}>Anterior</button>
            <button className="bg-red-300 p-3 rounded" onClick={nextPage}>Siguiente</button>
        </div>
        </>
    )
}

export default PostContainerUser;//exportando