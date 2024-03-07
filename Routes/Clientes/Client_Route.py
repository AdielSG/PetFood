from fastapi import APIRouter, Depends, status
from database import Session, engine
from fastapi.exceptions import HTTPException
from Schemas.Schema import ClientModel
from fastapi_jwt_auth import AuthJWT
from fastapi.encoders import jsonable_encoder
from Model.Models import Clientes

client_router = APIRouter(
    prefix= '/clientes',
    tags=['clientes']
)

session = Session(bind=engine)

@client_router.post('/add', status_code=status.HTTP_201_CREATED)
async def Add_Client(client: ClientModel, Authorize: AuthJWT=Depends()):

    new_client = Clientes(
        Nombre = client.Nombre,
        Apellido = client.Apellido,
        Email = client.Email,
        Telefono = client.Telefono,
        Sexo = client.Sexo
    )

    session.add(new_client)

    session.commit()

    response = {
        "Nombre": new_client.Nombre,
        "Apellido": new_client.Apellido,
        "Email": new_client.Email,
        "Telefono": new_client.Telefono,
        "Sexo": new_client.Sexo
    } 

    return jsonable_encoder(response)


@client_router.get('/get')
async def client_list():
    client = session.query(Clientes).all()

    if client:
       return jsonable_encoder(client)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail='No hay Clientes'
    )

@client_router.get('/get/{id}')
async def get_client(id: int):

    cliente = session.query(Clientes).filter(Clientes.id == id).first()

    if cliente:
        return jsonable_encoder(cliente)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail= f'No hay cliente con el id: {id}'
    )

@client_router.put('/update/{id}')
async def update_client(id: int, client: ClientModel):

    client_to_update = session.query(Clientes).filter(Clientes.id == id).first()

    client_to_update.Nombre = client.Nombre
    client_to_update.Apellido = client.Apellido
    client_to_update.Email = client.Email
    client_to_update.Telefono = client.Telefono
    client_to_update.Sexo = client.Sexo

    response = {
        "Nombre": client_to_update.Nombre,
        "Apellido": client_to_update.Apellido,
        "Email": client_to_update.Email,
        "Telefono": client_to_update.Telefono,
        "Sexo": client_to_update.Sexo
    }

    session.commit()

    return jsonable_encoder(response)
    
@client_router.delete('/delete/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_a_client(id: int, Authorize: AuthJWT=Depends()):
    
    client_to_delete = session.query(Clientes).filter(Clientes.id == id).first()

    session.delete(client_to_delete)

    session.commit()

    return client_to_delete