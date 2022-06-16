import Services from "../Services/UserServices";
import React, { useEffect, useState } from 'react';
import CardFavorites from "./CardFavorites";
import { useUserContext } from '../Contexts/Context';
//importando

const PostContainerFavorites = () => {
    const [pages, setPages] = useState(0);
    const [posts, setPosts] = useState([]);
    const { login, token } = useUserContext();
    const [array,setarray] = useState()
    //declarando variables
    useEffect(() => {
        getPosts();
    }, []);
        //cambiar paginas
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
        let data = response.data;
        setPosts(data);
        const fav = await Services.GetFavorite(token)
        const array = []
        posts.forEach((element) => {
            if (element._id === fav.forEach(element => element)){
                console.log(element)
                array.push(element)
            }
        }) 
        console.log(array)
        setarray(array)
    }



    return (/* Vista de paginas */
        <>
            <div className="flex flex-wrap">
                {posts.map((data) => {
                    return <CardFavorites createdAt={data.createdAt} key={data._id} id={data._id} 
                    title={data.title} username={data.user.username} description={data.description} 
                    image={data.image} likes={data.likes} comments={data.comments} />
                })}
            </div>
            <div className="flex justify-center space-x-5 pb-5">
                <button className="bg-blue-300 p-3 rounded" onClick={previusPage}>Anterior</button>
                <button className="bg-red-300 p-3 rounded" onClick={nextPage}>Siguiente</button>
            </div>
        </>
    )
}

export default PostContainerFavorites;//exportando