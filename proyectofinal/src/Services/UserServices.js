const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1"/* La URL Base para no repetirla siempre */

const Services = {};/* nuestro arreglo de funciones poder llamarlas */

/* Services.{Algo} es para guardar la funcion en Services */
/* Todos los metodos tienen un TryCatch ahora o luego cuando se utilicen*/

//Es el unico que no necesita token
Services.loginAdmin = async (User, Pass) => {/* Login, necesita usuario y contraseña */

    const Response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",/* Medodo a utilizar */
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({/* Para convertir a string nuestros datos */
            username: `${User}`,
            password: `${Pass}`
        })
    })
    if (Response.ok) {/* La respuesta esta bien */
        const Token = await Response.json()
        return Token
    }
    return {};/* No esta bien la respuesta no nos da nada */
}

//Verificar nuestro token, de nuestro usuario
Services.verifyToken = async (token) => {
    const response = await fetch(`${BASE_URL}/auth/whoami`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    return {};
}

//Pasamos a las que necesitan role de ADMIN
Services.createPost = async (Token, role, Title, Description, Imagen) => {/* Create post con sus parametros */
    try {                                                                  /* y role para verificar */
        if (role === "admin") {
            const Response = await fetch(`${BASE_URL}/post/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title: `${Title}`,
                    description: `${Description}`,
                    image: `${Imagen}`,
                })
            })
            const data = await Response.json()
            console.log(data)
            return data
        }
    } catch (error) {/* Si nos da error */
        console.log(error)
    }
}

Services.Owned = async (Token, role, limit, page) => {/* Funcion para verificar nuestros POST */
    try {
        if (role === "admin") {
            const Response = await fetch(`${BASE_URL}/post/owned?limit=${limit}&page=${page}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                }
            })
            const data = await Response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

Services.Toggle = async (Token, role, id) => {/* Funcion para activar o desactivar posts */
    try {
        if (role === "admin") {
            const Response = await fetch(`${BASE_URL}/post/toggle/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${Token}`,
                }
            })
            const data = await Response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log()
    }
}

Services.Update = async (Token, role, id, Title = "", Description = "", Imagen = "") => {
    try {                       /* Funcion Update obtienen un post y sus parametros en "nulo" por defecto */
        if (role === "admin") {
            const Response = await fetch(`${BASE_URL}/post/update/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title: `${Title}`,
                    description: `${Description}`,
                    image: `${Imagen}`,
                })
            })
            const data = await Response.json()
            console.log(data)
            return data

        }
    } catch (error) {
        console.log(error)
    }
}

//servicios sin admin (pueden hacerse con usuario)

Services.Commet = async (Token, id, text) => {/* Comment que revice el ID y nuestro texto de comentario */
    try {
        if (text === "") {
            return {} /* retorna nada si no hay comentario y no se agrega */
        } else {
            const Response = await fetch(`${BASE_URL}/post/comment/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    description: text,
                })
            })
            const data = await Response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

Services.GetAll = async (token, limit, page) => {/* Obtener todos con sus Props Limit y page, para poder luego hacer el InfiniteScroll */
    try {
        const Response = await fetch(`${BASE_URL}/post/all?limit=${limit}&page=${page}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await Response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

Services.Like = async (Token, id) => {/* Funcion Dar y Quitar like */
    try {
        const Response = await fetch(`${BASE_URL}/post/like/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${Token}`,
            }
        })
        const data = await Response.json()
        return data
    } catch (error) {
        console.log()
    }
}

/* Agrengando parte para los favoritos */

/* Agregando favorito */
Services.AddFavorite = async (Token, id) => {
    try {
        const Response = await fetch(`${BASE_URL}/post/fav/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${Token}`,
            }
        })
        const data = await Response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log()
    }
}
/* Obteniendo todos los favoritos */
Services.GetFavorite = async (token) => {
    try {
        const Response = await fetch(`${BASE_URL}/post/fav`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await Response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

Services.GetOne = async (token, id) => {/* Obtener uno con su ID */
    try {
        const Response = await fetch(`${BASE_URL}/post/one/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await Response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export default Services;/* Exportando servicios  */

/* para llamar a las funciones
//llamar al login
login("gp22_admin","t7kCJjgNd9BGkpgE")

// llamar a create post admin only
createPost(token, role, "asdasdasdasd","asdasdasdasda","asdasdasdasd")

//llamar a owned admin only
aOwned(token,role, 15, 0)

//llamar a toggle admin only
Toggle(token, role, "6193113ec0eacd88db877059")

//lammar a getall
GetAll(token, 15,0)

//llamar a like
Like(token, "6193113ec0eacd88db877059")


//llamar a comentario
Commet (token,"6193113ec0eacd88db877059","increiasdasdble post wow")

//llamar a update
Update(token ,role,"6193113ec0eacd88db877059","la mejor descrion de los post","asdasasdasda","asdasdasda")

GetFavorite(token)
AddFavorite(token)
*/