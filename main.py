from fastapi import FastAPI
from fastapi_jwt_auth import AuthJWT
from Schemas.Schema import Settings
from Routes.Auth.Auth_Route import auth_router
from Routes.Productos.Product_Route import product_router
from Routes.Stock.Stock_Route import stock_router
from Routes.Clientes.Client_Route import client_router
from fastapi.middleware.cors import CORSMiddleware

FRONTEND_URL = "http://localhost:5173"

app = FastAPI()

origins = [FRONTEND_URL]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True,
                    allow_methods=["*"], allow_headers=["*"])

@AuthJWT.load_config
def get_config():
    return Settings()

app.include_router(auth_router)
app.include_router(product_router)
app.include_router(stock_router)
app.include_router(client_router)