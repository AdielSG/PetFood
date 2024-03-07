from fastapi import APIRouter, Depends, status
from database import Session, engine
from fastapi.exceptions import HTTPException
from Schemas.Schema import ProductModel
from fastapi_jwt_auth import AuthJWT
from fastapi.encoders import jsonable_encoder
from Model.Models import Productos

product_router = APIRouter(
    prefix= '/productos',
    tags=['productos']
)

session = Session(bind=engine)

@product_router.post('/add', status_code=status.HTTP_201_CREATED)
async def Add_Product(product: ProductModel, Authorize: AuthJWT=Depends()):

    new_product = Productos(
        Nombre = product.Nombre,
        Precio = product.Precio
    )

    session.add(new_product)

    session.commit()

    response = {
        "Nombre": new_product.Nombre,
        "Precio": new_product.Precio
    } 

    return jsonable_encoder(response)


@product_router.get('/get')
async def product_list():
    products = session.query(Productos).all()

    if products:
       return jsonable_encoder(products)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail='No hay Productos'
    )

@product_router.get('/get/{id}')
async def get_product(id: int):

    producto = session.query(Productos).filter(Productos.id == id).first()

    if producto:
        return jsonable_encoder(producto)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail= f'No hay producto con el id: {id}'
    )

@product_router.put('/update/{id}')
async def update_product(id: int, product: ProductModel):

    product_to_update = session.query(Productos).filter(Productos.id == id).first()

    product_to_update.Nombre = product.Nombre
    product_to_update.Precio = product.Precio

    response = {
        "Nombre": product_to_update.Nombre,
        "Precio": product_to_update.Precio
    }

    session.commit()

    return jsonable_encoder(response)
    
@product_router.delete('/delete/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_a_product(id: int, Authorize: AuthJWT=Depends()):
    
    product_to_delete = session.query(Productos).filter(Productos.id == id).first()

    session.delete(product_to_delete)

    session.commit()

    return product_to_delete