## Descripcion

El proyecto consta de una API realizada en django la cual cuenta con autenticacion usando JWT y endpoints protegidos solo accesibles por usuarios administrados, con un frontend en react, el cual permite la gestion de empleados, con la posibilidad de crear, editar y eliminar empleados, ademas de una tabla con la informacion de cada empleado. Al registrar un nuevo empleado se envia un correo electronico al empleado con la informacion de su registro. Los datos de el correo se encuentran hardcodeados con fines de prueba y facilitacion del uso de la aplicacion por eso no estan añadidos en el archivo .env .

## Requerimientos

Esta lista consta de las versiones de cada tecnologia que fueron usadas al momento de crear el proyecto

* Python 3.10.6
* Node 20.11.1
* Postgres 

## Valores de inicializacion

Primero que todo debemos editar el archivo .env.example y cambiarle el nombre a .env y cambiar los valores de las variables de entorno con los datos de la base de datos que se va a usar.


## Instalacion de dependencias

Para crear la instalacion de dependencias de el proyecto de django se deben correr ls siguientes comandos en la carpeta raiz del proyecto

Primero se debe crear un entorno virtual con el siguiente comando

```
python -m venv venv
```

Despues se debe activar el entorno virtual con el siguiente comando

```
venv\Scripts\activate
```

Despues se debe instalar las dependencias con el siguiente comando

```
pip install -r requirements.txt
```

Para el proyecto de react se deben correr los siguientes comandos estando en la carpeta empleados_frontend

```
npm install
```

## Ejecucion de la aplicacion

Despues de esto debemos generar las migraciones con el siguiente comando

```
python manage.py makemigrations empleados_api
python manage.py makemigrations
python manage.py migrate
```

Esto nos creara las tablas necesarias en la base de datos

Despues debemos correr el siguiente comando para crear un superusuario, este usuario sera con el que iniciaremos sesion en la aplicacion

```
python manage.py createsuperuser
```
Debemos seguir los pasos que nos pide el comando para crear el superusuario

Despues de esto debemos correr el siguiente comando para iniciar el servidor de django

```
python manage.py runserver
```

Ahora debemos movernos a la carpeta empleados_frontend y correr el siguiente comando para iniciar el servidor de react

```
npm run dev
```

Ahora podemos acceder a la aplicacion en la siguiente direccion

```
http://localhost:5173/
```


## Diagrama de la base de datos

![alt text](https://i.imgur.com/SCdNwG0.png)

