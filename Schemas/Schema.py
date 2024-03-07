from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pydantic import Field

class SignUpModel(BaseModel):
    id : Optional[int]
    username : str
    password :str
    email : str
    is_staff: Optional[bool]
    is_active : Optional[bool]

    class Config:
        orm_mode = True
        schema_extra = {
            'example':{
                "username": "Adiel",
                "email":"Adiel@gmail.com",
                "password": "1234",
                "is_staff": False,
                "is_active": True,
            }
        }

class Settings(BaseModel):
    authjwt_secret_key:str = 'a384d44de701a71c1042315b532151bce5a6c1dad79f36e1e874e89e0dabc70b'

class LoginModel(BaseModel):
    username : str 
    password: str

class ProductModel(BaseModel):
    id: Optional[int]
    Nombre : str
    Precio : int
    Expiracion : Optional[datetime]

    class Config():
        orm_mode = True
        schema_extra = {
           "example": {
            "Nombre": "Purina",
            "Precio": 100
           }
        }

class StockModel(BaseModel):
    product_id: int 
    estado: str = "DISPONIBLE"
    cantidad: int

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "product_id": 1,
                "estado": "DISPONIBLE",
                "cantidad": 1
            }
        }

class StockModelUpdate(BaseModel):
    cantidad: int

class ClientModel(BaseModel):
    id: Optional[int]
    Nombre : str
    Apellido : str
    Email:  str
    Telefono : str
    Sexo: str

    class Config():
        orm_mode = True
        schema_extra = {
           "example": {
            "Nombre": "Jose",
            "Apellido": "Santos",
            "Email": "Jose@gmail.com",
            "Telefono": "809-965-7896",
            "Sexo": "Masculino",
           }
        }