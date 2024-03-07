import { useNavigate } from 'react-router-dom';
import '../styles/css_producto.css'

function ClientCard({client}){
    const navigate = useNavigate()
    return(
        <div className="bg-blue-500 p-4 hover:cursor-pointer hover:bg-gray-950" onClick={()=> {
            navigate(`/client/${client.id}`)
        }}>
            <h2 id='color-p'>{client.Nombre}</h2>
            <p id='color-p'>{client.Apellido}</p>
            <p id='color-p'>{client.Email}</p>
            <p id='color-p'>{client.Telefono}</p>
            <p id='color-p'>{client.Sexo}</p>
        </div>
    );
}

export default ClientCard