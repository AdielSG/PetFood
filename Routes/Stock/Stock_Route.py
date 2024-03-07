from fastapi import APIRouter, Depends, status
from database import Session, engine
from fastapi.exceptions import HTTPException
from Schemas.Schema import StockModel, StockModelUpdate
from fastapi_jwt_auth import AuthJWT
from fastapi.encoders import jsonable_encoder
from Model.Models import Stock

stock_router = APIRouter(
    prefix= '/stock',
    tags=['stock']
)

session = Session(bind=engine)

@stock_router.post('/add', status_code=status.HTTP_201_CREATED)
async def Add_Stock(stock: StockModel, Authorize: AuthJWT=Depends()):

    new_stock = Stock(
        product_id = stock.product_id,
        estado = stock.estado,
        cantidad = stock.cantidad
    )

    session.add(new_stock)

    session.commit()

    response = {
        "product_id": new_stock.product_id,
        "estado": new_stock.estado,
        "cantidad": new_stock.cantidad
    } 

    return jsonable_encoder(response)


@stock_router.get('/get')
async def product_list():
    products = session.query(Stock).all()

    if products:
       return jsonable_encoder(products)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail='No hay Productos'
    )

@stock_router.get('/get/{id}')
async def get_product(id: int):

    producto = session.query(Stock).filter(Stock.id == id).first()

    if producto:
        return jsonable_encoder(producto)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail= f'No hay producto con el id: {id}'
    )

@stock_router.put('/update/{id}')
async def update_order(id: int, stock: StockModelUpdate):

    stock_to_update = session.query(Stock).filter(Stock.id == id).first()

    stock_to_update.cantidad = stock.cantidad

    response = {
        "cantidad": stock_to_update.cantidad
    }

    session.commit()

    return jsonable_encoder(response)
    
@stock_router.delete('/delete/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_an_order(id: int):
    
    stock_to_delete = session.query(Stock).filter(Stock.id == id).first()

    session.delete(stock_to_delete)

    session.commit()

    return stock_to_delete