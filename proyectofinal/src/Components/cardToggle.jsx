import React from "react"
import { useState } from "react"
import { useUserContext } from "../Contexts/Context"
import { useEffect } from "react"
import Services from "../Services/UserServices";

export default function CardToggle(props) { 

    const { login, token } = useUserContext(); // estado para el token

    const [username, setUsername] = useState(""); // estado para el username

    const getUsername = async () => { // funcion para obtener el username
    const response = await Services.verifyToken(token); // funcion para verificar el token del usuario
    const username = response.username; // estado para el username
    setUsername(username); // seteamos el username
}
    useEffect(() => { // funcion para obtener el username
        getUsername();
    }, []);

    return (
        <>
                <div className="p-4 sm:w-1/2 lg:w-1/3">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <div className="p-6 transition duration-300 ease-in">
                            <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
                            <p>{props.id}</p>
                            <p className="leading-relaxed mb-3">{props.description}</p>
                        </div>
                    </div>
                </div>
        </>
    )}