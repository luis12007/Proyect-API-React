import React, { useCallback, useMemo, useState, useEffect, } from "react";
import Services from "../Services/UserServices";
//agregando nuestros servicios y react

const UserContext = React.createContext();
const TOKEN_KEY = "token";
/* agregamos nuestro key token y reactcontent como variable */
export const Provider = (props) => {/* Nuestro provider con props y lo exportamos */
    const [Token, setToken] = useState(undefined);
    const [User, setUser] = useState(undefined);
    //declaramos variables de UseState

    const GetAllTokens = (Token) => {
        localStorage.setItem(TOKEN_KEY, Token);
        setToken(Token);
    }/* Tomamos nuestro token */

    useEffect(() => {/* Usefect para poder verificar el role y el usuario ademas de token */
        const VerifyToken = async () => {
            const TheToken = getToken();

            if (TheToken) {
                const { username, role } =
                    await Services.verifyToken(TheToken);
                if (username && role) {
                    setUser({ username, role });
                    GetAllTokens(TheToken);
                }
            }
        }

        VerifyToken();
    }, [Token])/* se recarga siempre con el token */

    const LOgin = useCallback((username, password) => {/* Nuestra funcion login para poder entrar  */
        const login = async () => {
            let status = false;
            try {
                const { token: tokenQ } = await Services.loginAdmin(username, password);
                if (tokenQ) {
                    GetAllTokens(tokenQ);
                    status = true;
                }
            } catch (error) {/* Con validaciones de error y trycatch */
                console.error(error);
                console.error("Error in credentials");
            } finally {
                return status;
            }
        };

        return login();
    }, [])

    const Exit = useCallback(() => {/* nuestro Logout esta aqui */
        setUser(undefined);
        GetAllTokens(undefined);
    }, [])

    const value = useMemo(() => ({/* Memoriza todas nuestras "funciones" */
        token: Token,
        user: User,
        login: LOgin,
        Exit: Exit
    }), [Token, User, LOgin, Exit]);

    return <UserContext.Provider value={value} {...props} />;
}

export const useUserContext = () => {/* Nuestro use context con validaciones de errores */
    const contexts = React.useContext(UserContext);
    if (!contexts) {
        throw new Error("useUserContext() must be inside of UserProvider");
    }
    return contexts;
}

const getToken = () => localStorage.getItem(TOKEN_KEY); /* definimos get token para la parte de arriba en useffect  */
