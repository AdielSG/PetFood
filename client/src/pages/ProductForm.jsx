import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/css_producto.css"

function ProductForm() {

    const [Nombre, setNombre] = useState('')
    const [Precio, setPrecio] = useState('')
    const params =  useParams()
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if (!params.id){
                const res = await axios.post('http://127.0.0.1:8000/productos/add', {
                Nombre,
                Precio
            })
            console.log(res)
            }else{
                const res = await axios.put(`http://127.0.0.1:8000/productos/update/${params.id}`, {
                Nombre,
                Precio
            })
            console.log(res)
            }
        navigate("/product")

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
            const res = await axios.get(`http://127.0.0.1:8000/productos/get/${params.id}`)
            setNombre(res.data.Nombre)
            setPrecio(res.data.Precio)
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
            <textarea 
            placeholder="Precio" 
            className="block py-2 px-3 mb-4 w-full text-black"
            rows={3}
            value={Precio}
            onChange={(e) => setPrecio(e.target.value)}
            ></textarea>
            <button id='color-p'>
                {params.id ? "Actualizar Producto" : "Agregar Producto"}
            </button>
        </form>

        {params.id && (
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={async() => {
                try {
                const res = await axios.delete(`http://127.0.0.1:8000/productos/delete/${params.id}`)
                console.log(res)
                navigate("/product")
                } catch (error) {
                    console.log(error)
                }
            }}>
            Eliminar Producto
            </button>
        )}
       </div>

        </div>
    )
}

export default ProductForm