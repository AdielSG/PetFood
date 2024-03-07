from database import engine, Base
from Model.Models import Stock, User, Productos

Base.metadata.create_all(bind = engine)