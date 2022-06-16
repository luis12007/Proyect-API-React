import { useNavigate } from 'react-router-dom';
//importando user Navigate

export default function Home() { //nuestro home donde ingresan las personas por primera vez
    const navigate = useNavigate();

    const EnterHandler = () => { //Handler que manda al login al darle al boton
        navigate("/Login");
    }

    return(
        <section className="bg-gray-700">{/* un poco de estilo con amimacion y un boton */}
        <div className="flex flex-col justify-center items-center
        w-80 max-w-screen-sm mx-auto h-screen md:w-auto ">
            <button onClick= {EnterHandler} className="bg-gray-400 animate-pulse rounded-3xl text-lg h-52 w-80 p-3 border-4 focus:animate-none"> ENTRAR A UCA PAGES</button>
        </div>
        </section>
    )
}