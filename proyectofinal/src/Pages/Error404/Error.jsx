import { useNavigate } from 'react-router-dom';

export default function Error() {
    const navigate = useNavigate()
    const Gomain =() =>{
        navigate("/Login")
    }

    return(
        <section className="bg-gray-50 h-screen flex flex-row">
        <div className="w-full bg-gray-50 h-96 text-center my-auto mx-auto">
            <img  className="relative h-36 w-40 mx-auto"src="https://i.pinimg.com/originals/07/9c/3e/079c3ea0dce59cc171629800294b0f3d.jpg" 
            alt="err 404"/>
            <h1 className="text-2xl font-extrabold">Error 404</h1>
            <p>Something went wrong, try: </p>
            <button onClick={Gomain} className="bg-gray-400 hover:bg-gray-700 transition p-2 rounded-lg mt-4 text-white font-bold">Go to login</button>
        </div>
        </section>
    )
}