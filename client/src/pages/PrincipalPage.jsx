import React from 'react';
import ProductPage from './ProductPage';
import ClientPage from './ClientPage';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import '../styles/css_pagina.css'
import Imagen from '../img/logo.png'

const PrincipalPage = () => {
  return (
    <div>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
      <h1>Sistema de Inventario</h1>
      <div className="logo"><img src={Imagen}/></div>
      <nav>
        <ul>
          <br /><li>
            <Link to={"/product"}>
              <i className="bx bx-purchase-tag-alt"></i>
              Productos
            </Link>
            </li>
            <li>
            <Link to={"/client"}>
              <i className="bx bx-user-circle"></i>
              Clientes
            </Link>
            </li>
        </ul>
      </nav>
      <h1 id='contenedor-centrado'>Sistema de inventario</h1>


      <div className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950">
            <h2 id='color-p'>Prodcuto </h2>
            <p id='color-p'>Cliente</p>
        </div>

      
    </div>
  );
};

export default PrincipalPage;