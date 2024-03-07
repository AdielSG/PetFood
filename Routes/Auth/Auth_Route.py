from database import Session, engine
from Schemas.Schema import SignUpModel, LoginModel
from Model.Models import User
from fastapi.exceptions import HTTPException
from fastapi import status, APIRouter, Depends, Form
from fastapi.encoders import jsonable_encoder
from werkzeug.security import generate_password_hash, check_password_hash
from fastapi_jwt_auth import AuthJWT

auth_router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

session = Session(bind=engine)

@auth_router.post("/signup",
 status_code=status.HTTP_201_CREATED,
 response_model=SignUpModel
)
async def signup(user: SignUpModel):
    db_email = session.query(User).filter(User.email==user.email).first()

    if db_email is not None:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
            detail='Correo ya registrado'
        )
    
    db_username = session.query(User).filter(User.username == user.username).first()

    if db_username is not None:
        return HTTPException(status_code= status.HTTP_400_BAD_REQUEST,
            detail="usuario ya registrado"
        )
    
    new_user=User(
        username = user.username,
        email = user.email,
        password = generate_password_hash(user.password),
        is_active = user.is_active,
        is_staff = user.is_staff
    )

    session.add(new_user)

    session.commit()

    return new_user

@auth_router.post('/login', response_model=dict)
async def login(user: LoginModel, Authorize: AuthJWT=Depends()):
    db_user = session.query(User).filter(User.username == user.username).first()

    if db_user and check_password_hash(db_user.password, user.password):
        access_token = Authorize.create_access_token(subject=db_user.username)
        refresh_token = Authorize.create_refresh_token(subject=db_user.username)

        response = {
            "access": access_token,
            "refresh": refresh_token
        }

        return jsonable_encoder(response)
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid Username Or Password",
        headers={"WWW-Authenticate": "Bearer"}
    )