import { useNavigate } from 'react-router-dom';
import '../styles/css_producto.css'

function ProductCard({product}){
    const navigate = useNavigate()
    return(
        <div className="bg-blue-500 p-4 hover:cursor-pointer hover:bg-gray-950" onClick={()=> {
            navigate(`/product/${product.id}`)
        }}>
            <h2 id='color-p'>{product.Nombre}</h2>
            <p id='color-p'>{product.Precio}</p>
        </div>
    );
}

export default ProductCard