import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div className="flex justify-between py-5 px-10 rounded-lg">
            <div style={{ padding: '10px' }}>
                <Link to='/client' className="bg-indigo-500 px-4 py-1 rounded-sm">Cliente</Link>
            </div>
            <div style={{ padding: '10px' }}>
                <Link to='/product' className="bg-indigo-500 px-4 py-1 rounded-sm">Producto</Link>
            </div>
        </div>
    )
}

export default Menu;