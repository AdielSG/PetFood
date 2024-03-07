from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Reemplaza 'tu_usuario', 'tu_contraseña', 'tu_servidor' y 'tu_base_de_datos' con tus propios detalles de conexión
usuario = 'sa'
contraseña = '1234'
servidor = 'SANTOSGUZMAN'
base_de_datos = 'Alimentos'

# Cadena de conexión SQLAlchemy para SQL Server
cadena_conexion = f"mssql+pyodbc://{usuario}:{contraseña}@{servidor}/{base_de_datos}?driver=ODBC+Driver+17+for+SQL+Server"

# Crear un objeto de motor de SQLAlchemy
engine = create_engine(cadena_conexion,
 echo= True
)

Base = declarative_base()

Session = sessionmaker()