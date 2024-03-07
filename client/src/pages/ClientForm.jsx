import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom';

function ClientForm() {

    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [Email, setEmail] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Sexo, setSexo] = useState('')
    const params =  useParams()
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if (!params.id){
                const res = await axios.post('http://127.0.0.1:8000/clientes/add', {
                Nombre,
                Apellido,
                Email,
                Telefono,
                Sexo
            })
            console.log(res)
            }else{
                const res = await axios.put(`http://127.0.0.1:8000/clientes/update/${params.id}`, {
                    Nombre,
                    Apellido,
                    Email,
                    Telefono,
                    Sexo
            })
            console.log(res)
            }
        navigate("/client")

        } catch (error) {
            console.log(error)
        }
        e.target.reset()
    };

    useEffect(()=>{
        if(params.id){
            fetchTask()
        }
        async function fetchTask(){
            const res = await axios.get(`http://127.0.0.1:8000/clientes/get/${params.id}`)
            setNombre(res.data.Nombre)
            setApellido(res.data.Apellido)
            setEmail(res.data.Email)
            setTelefono(res.data.Telefono)
            setSexo(res.data.Sexo)
        }
    }, [])

    return(
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">

       <div>
       <form className="bg-blue-500 p-10" onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Nombre" 
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setNombre(e.target.value)}
            value={Nombre}
            autoFocus
            />
            <input 
            type="text" 
            placeholder="Apellido" 
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setApellido(e.target.value)}
            value={Apellido}
            autoFocus
            />
            <input 
            type="text" 
            placeholder="Email" 
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
            autoFocus
            />
            <input 
            type="text" 
            placeholder="Telefono" 
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setTelefono(e.target.value)}
            value={Telefono}
            autoFocus
            />
            <input 
            type="text" 
            placeholder="Sexo" 
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setSexo(e.target.value)}
            value={Sexo}
            autoFocus
            />
            <button>
                {params.id ? "Actualizar Cliente" : "Agregar Cliente"}
            </button>
        </form>

        {params.id && (
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={async() => {
                try {
                const res = await axios.delete(`http://127.0.0.1:8000/clientes/delete/${params.id}`)
                console.log(res)
                navigate("/client")
                } catch (error) {
                    console.log(error)
                }
            }}>
            Eliminar Cliente
            </button>
        )}
       </div>

        </div>
    )
}

export default ClientForm