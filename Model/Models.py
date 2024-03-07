from database import Base
from sqlalchemy import Column, Integer, Boolean, Text, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy_utils.types import ChoiceType

class User(Base):
    __tablename__='user'
    id = Column(Integer, primary_key=True)
    username = Column(String(25), unique=True)
    email = Column(String(80), unique=True)
    password = Column(Text, nullable=False)
    is_active = Column(Boolean, default=False)
    is_staff = Column(Boolean, default=False)

class Productos(Base):
    __tablename__='Productos'
    id =Column(Integer, primary_key=True)
    Nombre = Column(String, nullable=False)
    Precio = Column(Integer, nullable=False)
    Expiracion = Column(Date)
    Stock = relationship('Stock', back_populates='Productos')

def __repr__(self):
    return f"<Nombre {self.Nombre}"

class Stock(Base):

    Product_Status = (
        ('DISPONIBLE', 'disponible'),
        ('NO DISPONIBLE', 'no disponible')
    )

    __tablename__='Stock'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('Productos.id'))  
    estado = Column(ChoiceType(choices=Product_Status), default="DISPONIBLE")
    cantidad =  Column(Integer, nullable=False)
    Productos = relationship("Productos", back_populates="Stock")

class Clientes(Base):
    __tablename__='Clientes'
    id = Column(Integer, primary_key=True)
    Nombre = Column(String, nullable=False)
    Apellido = Column(String, nullable=False)
    Email = Column(String, nullable=False)
    Telefono = Column(String, nullable=False)
    Sexo = Column(String, nullable=False)
    