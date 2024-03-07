import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import PrincipalPage from './pages/PrincipalPage';
import ProductPage from './pages/ProductPage';
import ProductForm from './pages/ProductForm';
import ClientPage from './pages/ClientPage';
import ClientForm from './pages/ClientForm';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/principal" element={<PrincipalPage/>}/>
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/product/new" element={<ProductForm/>}/>
        <Route path="/product/:id" element={<ProductForm/>}/>
        <Route path="/client" element={<ClientPage/>}/>
        <Route path="/client/new" element={<ClientForm/>}/>
        <Route path="/client/:id" element={<ClientForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;