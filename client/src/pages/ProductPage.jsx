import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
import Imagen from '../img/logo.png'
import "../styles/css_producto.css"

function ProductPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const res = await axios.get("http://127.0.0.1:8000/productos/get");
            setProducts(res.data)
        }
        fetchTasks();
    }, [])

    return (
        <div id="body-product">
            <div>

                <title>Pet Food Store</title>
                <link rel="stylesheet" href="styles/css_produ.css" />
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />



                <h3 id="h3-barra">Sistema de Inventario</h3>
                <div className="logo">
                    <img src={Imagen} alt="Logo" />
                </div>

                <nav>
          <ul>
            <br />
            <li>
            <Link to={"/principal"}>
                <a>
                  <i className="bx bx-purchase-tag-alt"></i> Principal
                </a>
              </Link>
            </li>
            <li>
            <Link to={"/client"}>
                <a>
                  <i className="bx bx-purchase-tag-alt"></i> Clientes
                </a>
              </Link>
            </li>
          </ul>
        </nav>


                <p id="p-prin">Sección de Productos</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <div style={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
                    <Link to={"/product/new"}>
                    <p><i class='bx bx-purchase-tag-alt'></i></p>
                    </Link>
                </div>

                <div class="btn" style={{ padding: '15px' }}>
                    <ProductList products={products} />
                </div>

                <div className="footer">
                    <p>
                        © 2024 Karla German, José Santos y Gilbert Vargas. Todos los
                        derechos reservados. Contacto: +(1) 800-000-0000
                    </p>
                </div>

            </div>

        </div>
    );
}

export default ProductPage