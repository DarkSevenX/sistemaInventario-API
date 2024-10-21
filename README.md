

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![CORS](https://img.shields.io/badge/cors-000000?style=for-the-badge&logo=cors&logoColor=white)
![Joi](https://img.shields.io/badge/joi-0865A6?style=for-the-badge&logo=joi&logoColor=white)
![Morgan](https://img.shields.io/badge/morgan-000000?style=for-the-badge&logo=morgan&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)


<div style="text-align: center; font-size:60px;">
API Inventario
</div>
<br>

La **API Inventario** es una solución basada en REST que permite gestionar eficientemente productos, categorías, proveedores y existencias en un sistema de inventario. Esta API facilita la creación, actualización, eliminación y consulta de información relacionada con el inventario, proporcionando un conjunto de endpoints para que los usuarios puedan integrarse fácilmente y gestionar sus recursos de inventario.

## Características

- **Gestión de productos**: Crea, actualiza, elimina y consulta productos con atributos como nombre, descripción, precio y cantidad disponible.
- **Gestión de categorías**: Organiza productos en categorías para una mejor administración y consulta de inventario.
- **Gestión de proveedores**: Añade y actualiza información sobre los proveedores que suministran los productos.
- **Control de inventario**: Consulta y actualiza las cantidades de productos disponibles en el inventario.
- **Seguridad**: Autenticación de usuarios mediante tokens JWT para asegurar que solo usuarios autorizados puedan acceder o modificar la información.
- **Registros de transacciones**: Lleva un historial de las entradas y salidas de productos para mantener un control de las existencias.

## Tecnologías

- **Node.js** 
- **Express**
- **JWT (JSON Web Tokens)**
- **Prisma ORM**
- **Bcrypt**
- **Joi**

## Rutas

### Auth
<details>
 <summary><code>POST</code> <code><b>/auth/register</b></code> <code>(crea un nuevo producto)</code></summary>


#### parametros

> ninguno

##### Body
- ##### headers

 `Content-Type: application/json`

| name          | type      | data type | descripción                     |
| ------------- | --------- | --------- | ------------------------------- |
| `username`    | requerido | string    | nombre de usuario |
| `password`    | requerido | string    | password |

```json
{
  "username": "new user",
  "password": "new password"
}
```

##### Responses

- **`200`** `Registro exitoso, devuelve un token JWT`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- **`409`** `Conflict`
    ```json
    {
      "error": "username is already taken"
    }
    ```
- **`400`** `bad request faltan campos`
    ```json
    {
        "error": "password is required"
    }
    ```
- **`500`** `Internal Server Error`
    ```json
    {
      "error": "error message..."
    } 
    ```
</details>     

### Product 

<details>
<summary><code>POST</code> <code><b>/product</b></code> <code>(crea un nuevo producto)</code></summary>

##### parámetros

> ninguno

#### Body
- ##### headers

 `Content-Type: application/json`

 `token: <token proporcionado al loguearse>`

| name          | type      | data type | descripción                     |
| ------------- | --------- | --------- | ------------------------------- |
| `name`        | requerido | string    | nombre del producto       |
| `categoryId`  | requerido | int       | id de la categoria |
| `supplierId`  | requerido | int       | id del proveedor
| `price`       | requerido | int       | precio del producto
| `stock`       | requerido | int       | stock disponible del producto

```json
{
  "name": "new",
  "categoryId": 1,
  "supplierId": 1,
  "price": 1,
  "stock": 100
}
```

##### Respuestas


- `201` `prodcuto creado correctamente`

    ``` json
    {
        "id":1,
        "name":"new product",
        "price":9.99,
        "stock":10,
        "categoryId":1,
        "supplierId":1
    }
    ```
- `400` `bad request`
    ``` json 
    {
        "message": ["mensaje de error de validacion"]
    }
    ```

- **`401`** `Token inválido o expirado`
    ```json
    {
      "error": "invalid token"
    }

- **`403`** `no se proporciono un token en la solicitud`
    ```json
    {
      "message": "no token provided"
    }

- `404` `cateogria o proveedor no encontrado`

    ```json
    { "message":"Categoría no encontrada" }
    ```
    ``` json
    { "message":"Proveedor no encontrado" }
    ```

- `500` `internal server error`

    ```json
    { "message": "Error creando el producto" }
    ```

</details>

<details>
 <summary><code>GET</code> <code><b>/product</b></code> <code>(obtiene todos los productos)</code></summary>

##### Parámetros

> Ninguno

##### Respuestas

-  **`200`** `ok`
    ```json 
    [
        {
          "id": 1,
          "name": "product 1",
          "categoryId": 1,
          "providerId": 1,
          "price": 1,
          "stock": 98,
          "userId": 1,
        },
        {
          "id": 2,
          "name": "product2",
          "categoryId": 1,
          "providerId": 1,
          "price": 1,
          "stock": 100,
          "userId": 1,
        },
        ...
    ]
    ```

- **`401`** `Token inválido o expirado`
    ```json
    {
      "error": "invalid token"
    }

- **`403`** `no se proporciono un token en la solicitud`
    ```json
    {
      "message": "no token provided"
    }
- **`500`** `internal server error`
    ```json
    { 
      "message": "Error obteniendo los productos"
    }
    ```

</details>

<details>
 <summary><code>GET</code> <code><b>/product/{id}</b></code> <code>(obtiene un producto por su ID)</code></summary>

##### Parámetros

> | name   | type      | data type | descripción        |
> | ----   | --------- | --------- | ------------------ |
> | **id** | requerido | int       | El ID del producto |

##### Respuestas

- **`200`** `ok`
    ```json
    {
      "id": 1,
      "name": "new",
      "categoryId": 1,
      "providerId": 1,
      "price": 1,
      "stock": 98,
      "userId": 1,
    }
    ```
- **`400`** `id type error`
    ```json
    {
      "messaje": "invalid Id"
    }
    ```

- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }

- **`404`** `no encontrado`

    ```json
    { "message": "Producto no encontrado" }
    ```
- **`500`** `internal server error`
    ```json 
    { "message": "Error obteniendo el producto"  }
    ```

</details>

<details>
 <summary><code>PATCH</code> <code><b>/product/{id}</b></code> <code>(actualiza un producto por su ID)</code></summary>

##### Parámetros

 | name   | type      | data type     | descripción                        |
 | ------ | --------- | ------------- | ---------------------------------- |
 | `id`   | requerido | int           | El ID del producto                 |

##### Body

- headers

`Content/type: applicationjson`

| name          | type      | data type | descripción                     |
| ------------- | --------- | --------- | ------------------------------- |
| `name`        | opcional | string    | nombre del producto       |
| `categoryId`  | opcional | int       | id de la categoria |
| `supplierId`  | opcional | int       | id del proveedor
| `price`       | opcional | int       | precio del producto
| `stock`       | opcional | int       | stock disponible del producto

##### Respuestas

- **`200`** `ok` 

    ``` json
    {
      "id": 1,
      "name": "product Updated",
      "categoryId": 1,
      "providerId": 1,
      "price": 1,
      "stock": 98,
      "userId": 1,
    }
    ```
- **`400`** `errores de validacion / id type error`
    ```json
    {
      "message": ["mensaje de error de validacion"]
    }
    ```
    ```json
    { "messaje": "invalid Id" }
    ```

- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }
    ```

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }
    ```

- **`404`** `no encontrado` 

    ``` json 
    { "message": "Producto no encontrado" }   

    ```                                                                          


- **`500`**  `internal server error` 
    ```json
    { "message": "Error actualizando el producto" } 
    ```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/product/{id}</b></code> <code>(elimina un producto por su ID)</code></summary>

##### Parámetros

> | name | type      | data type | descripción        |
> | ---- | --------- | --------- | ------------------ |
> | `id` | requerido | int       | El ID del producto |

##### Respuestas

- **`204`** `eliminado correctamente`                               

- **`400`** `Id type error`
    ```json
    { "messaje": "invalid Id" }
    ```

- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }
    ```

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }
    ```
- **`404`** `not found` 
    ```json
    { "message": "Producto no encontrado" }
    ```

- **`500`**  `internal server error` 
    ```json
    { "message": "Error eliminando el producto" }
    ```
</details>

---
### Category
<details>
 <summary><code>POST</code> <code><b>/category</b></code> <code>(crea una nueva categoría)</code></summary>

##### Body 
- **Headers**

`Content-Type: application/json`

`token: {{token}}`

 | name          | type      | data type | descripción                     |
 | ------------- | --------- | --------- | ------------------------------- |
 | `name`        | requerido | string    | El nombre de la categoría       |
 | `description` | requerido  | string    | Una descripción de la categoría |
    

```json
{
  "name": "deporte",
  "description": "categoria de deporte"
}
```
##### Respuestas

- **`201`** `categoria creada`

    ```json
    {
      "id": 2,
      "name": "deporte",
      "description": "esta es la categoria de deporte",
      "userId": 1
    }
    ```
- `400` `bad request`
    ``` json 
    {
      "message": ["mensaje de error de validacion"]
    }
    ```

- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }
    ```

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }
    ```
- **`500`** `internal server error` 
    ```json
    {
      "message": "error creando la categoria"
    }
    ```
</details>

<details>
 <summary><code>GET</code> <code><b>/category</b></code> <code>(obtiene todas las categorías)</code></summary>

##### Parámetros

> Ninguno

##### headers
**`token: token de autenticacion`**

##### Respuestas

- **`200`** `application/json` 
    ```json 
    [
      {
        "id": 1,
        "name": "deporte",
        "description": "esta es la categoria de deporte",
        "userId": 1,
        "products": [
          {
            "id": 1,
            "name": "producto 1",
            "categoryId": 1,
            "providerId": 1,
            "price": 1,
            "stock": 98,
            "userId": 1
          },
          {
            "id": 2,
            "name": "producto 2",
            "categoryId": 1,
            "providerId": 1,
            "price": 1,
            "stock": 100,
            "userId": 1
          }
        ]
      }
    ]

    ```
- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }
    ```

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }
    ```
- **`500`** `intenal server error` 

    ```json
    { "message": "Error getting categories" }
    ```

</details>

<details>
 <summary><code>GET</code> <code><b>/categories/{id}</b></code> <code>(obtiene una categoría por su ID)</code></summary>

##### Parámetros

 | name | type      | data type | descripción           |
 | ---- | --------- | --------- | --------------------- |
 | `id` | requerido | int       | El ID de la categoría |

##### headers 
**`token: token de autenticacion`**

##### Respuestas

- **`200`**

    ``` json
    {
      "id": 1,
      "name": "deporte",
      "description": "esta es la categoria de deporte",
        "userId": 1,
        "products": [
          {
            "id": 1,
            "name": "producto 1",
            "categoryId": 1,
            "providerId": 1,
            "price": 1,
            "stock": 98,
            "userId": 1
          },
          {
            "id": 2,
            "name": "producto 2",
            "categoryId": 1,
            "providerId": 1,
            "price": 1,
            "stock": 100,
            "userId": 1
          }
        ]
    }
    ```

- **`400`** `Id type error`
    ```json
    { "messaje": "invalid Id" }
    ```

- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }
    ```

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }
    ```
- **`404`** `not found`  
    ```json
    { "message": "Category not found" }
    ```
- **`500`** `intenal server error` 

    ```json
    { "message": "Error getting categories" }
    ```

</details>

<details>
 <summary><code>PATCH</code> <code><b>/category/{id}</b></code> <code>(actualiza una categoría por su ID)</code></summary>

##### Parámetros

 | name   | type      | data type     | descripción                        |
 | ------ | --------- | ------------- | ---------------------------------- |
 | `id`   | requerido | int           | El ID de la categoría              |

##### body

- headers

`token: token de autenticacion`

`Content-Type: application/json`

 | name          | type      | data type | descripción                     |
 | ------------- | --------- | --------- | ------------------------------- |
 | `name`        | opcional | string    | El nombre de la categoría       |
 | `description` | opcional  | string    | Una descripción de la categoría |
    
##### Respuestas

- **`200`** `ok` 
    ```json
    {
      "id": 2,
      "name": "categoria editada",
      "description": "esta es la categoria de deporte",
      "userId": 1
    }
    ```
- **`400`** `Id type error`
    ```json
    { 
      "messaje": "invalid Id" 
    }
    ```

- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }
    ```

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }
    ```
- **`404`** `not found`  
    ```json
    { "message": "Category not found" }
    ```

- **`500`** `intenal server error` 

    ```json
    { "message": "Error getting categories" }
    ```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/categories/{id}</b></code> <code>(elimina una categoría por su ID)</code></summary>

##### Parámetros

> | name | type      | data type | descripción           |
> | ---- | --------- | --------- | --------------------- |
> | `id` | requerido | int       | El ID de la categoría |

##### Respuestas

- **`204`** `ok` 

- **`400`** `Id type error`
    ```json
    { 
      "messaje": "invalid Id" 
    }
    ```

- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }
    ```

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }
    ```
- **`404`** `not found`  
    ```json
    { "message": "Category not found" }
    ```

- **`500`** `intenal server error` 

    ```json
    { "message": "Error getting categories" }
    ```

</details>

---

### Provider

<details>
<summary><code>POST</code> <code><b>/provider</b></code> <code>(crea un nuevo proveedor)</code></summary>

#### Body
- ##### Parámetros

> Ninguno

- ##### headers

 `Content-Type: application/json`

 `token: <token proporcionado al loguearse>`

| name       | type      | data type | descripción           |
| ---------- | --------- | --------- | --------------------- |
| `name`     | requerido | string    | nombre del proveedor   |
| `contact`  | requerido | int       | numero de contacto del proveedor |
| `email`    | requerido | string    | email del proveedor    |

```json
{
  "name": "Provider Name",
  "contact": 1234574564,
  "email": "provider@example.com"
}
```

##### Respuestas

- **`201`** `proveedor creado correctamente`
    ```json
    {
      "id": 1,
      "name": "Provider Name",
      "contact": "Contact Info",
      "email": "provider@example.com",
      "userId": 1
    }
    ```

- **`401`** `Token inválido o expirado`

    ```json
    {
      "error": "invalid token"
    }
    ```

- **`403`** `no se proporciono un token en la solicitud`

    ```json
    {
      "message": "no token provided"
    }
    ```

- **`500`** `internal server error`
    ```json
    { "message": "Error creating the provider" }
    ```

</details>

<details>
 <summary><code>GET</code> <code><b>/provider</b></code> <code>(obtiene todos los proveedores)</code></summary>

##### Parámetros

> Ninguno

##### Respuestas

- **`200`** `ok`
    ```json
    [
      {
        "id": 1,
        "name": "Provider 1",
        "contact": "Contact Info 1",
        "email": "provider1@example.com",
        "userId": 1
      },
      {
        "id": 2,
        "name": "Provider 2",
        "contact": "Contact Info 2",
        "email": "provider2@example.com",
        "userId": 1
      }
    ]
    ```
- **`500`** `internal server error`
    ```json
    { "message": "Error retrieving the providers" }
    ```

</details>

<details>
 <summary><code>GET</code> <code><b>/provider/{id}</b></code> <code>(obtiene un proveedor por su ID)</code></summary>

##### Parámetros

| name       | type      | data type | descripción          |
| ---------- | --------- | --------- | -------------------- |
| `id`       | requerido | int       | El ID del proveedor   |

##### Respuestas

- **`200`** `ok`
    ```json
    {
      "id": 1,
      "name": "Provider 1",
      "contact": "Contact Info 1",
      "email": "provider1@example.com",
      "userId": 1
    }
    ```
- **`404`** `proveedor no encontrado`
    ```json
    { "message": "Provider not found" }
    ```
- **`500`** `internal server error`
    ```json
    { "message": "Error retrieving the provider" }
    ```

</details>

<details>
 <summary><code>PATCH</code> <code><b>/provider/{id}</b></code> <code>(actualiza un proveedor por su ID)</code></summary>

##### Parámetros

| name   | type      | data type | descripción          |
| ------ | --------- | --------- | -------------------- |
| `id`   | requerido | int       | El ID del proveedor   |

##### Body

- headers

`Content-Type: application/json`

| name       | type      | data type | descripción           |
| ---------- | --------- | --------- | --------------------- |
| `name`     | opcional  | string    | nombre del proveedor   |
| `contact`  | opcional  | string    | contacto del proveedor |
| `email`    | opcional  | string    | email del proveedor    |

```json
{
  "name": "Updated Provider",
  "contact": "Updated Contact Info",
  "email": "updated@example.com"
}
```

##### Respuestas

- **`200`** `ok`
    ```json
    {
      "id": 1,
      "name": "Updated Provider",
      "contact": "Updated Contact Info",
      "email": "updated@example.com",
      "userId": 1
    }
    ```
- **`404`** `proveedor no encontrado`
    ```json
    { "message": "Provider not found" }
    ```
- **`500`** `internal server error`
    ```json
    { "message": "Error updating the provider" }
    ```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/provider/{id}</b></code> <code>(elimina un proveedor por su ID)</code></summary>



##### Parámetros

| name   | type      | data type | descripción          |
| ------ | --------- | --------- | -------------------- |
| `id`   | requerido | int       | El ID del proveedor   |

##### Respuestas

- **`204`** `proveedor eliminado correctamente`

- **`404`** `proveedor no encontrado`
    ```json
    { "message": "Provider not found" }
    ```
- **`500`** `internal server error`
    ```json
    { "message": "Error deleting the provider" }
    ```

</details>

---

### Venta

<details>
<summary><code>POST</code> <code><b>/venta</b></code> <code>(crea una nueva venta)</code></summary>

#### Body

- ##### Parámetros

> Ninguno

- ##### headers

 `Content-Type: application/json`

 `token: <token proporcionado al loguearse>`

| name        | type      | data type | descripción             |
| ----------- | --------- | --------- | ----------------------- |
| `productId` | requerido | int       | ID del producto a vender |
| `quantity`  | requerido | int       | cantidad del producto    |

```json
{
  "productId": 1,
  "quantity": 2
}
```

##### Respuestas

- **`201`** `venta creada correctamente`
    ```json
    {
      "venta": {
        "id": 1,
        "productId": 1,
        "userId": 1,
        "quantity": 2,
        "createdAt": "2024-10-21T00:00:00.000Z"
      }
    }
    ```

- **`400`** `no hay stock suficiente`
    ```json
    { "error": "No hay stock suficiente" }
    ```

- **`404`** `producto no encontrado`
    ```json
    { "error": "Producto no encontrado" }
    ```

- **`500`** `error del servidor`
    ```json
    { "error": "Error creando la venta" }
    ```

</details>

<details>
 <summary><code>GET</code> <code><b>/venta</b></code> <code>(obtiene todas las ventas del usuario)</code></summary>

##### Parámetros

> Ninguno

##### Respuestas

- **`200`** `ok`
    ```json
    [
      {
        "id": 1,
        "productId": 1,
        "quantity": 2,
        "userId": 1,
        "createdAt": "2024-10-21T00:00:00.000Z"
      },
      {
        "id": 2,
        "productId": 2,
        "quantity": 1,
        "userId": 1,
        "createdAt": "2024-10-21T00:10:00.000Z"
      }
    ]
    ```

- **`500`** `error del servidor`
    ```json
    { "error": "Error obteniendo las ventas" }
    ```

</details>

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/usuario/inventario-api.git
    ```

2. Instala las dependencias:

    ```bash
    cd inventario-api
    npm install
    ```

3. Configura las variables de entorno en un archivo `.env`:

    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=inventario_db
    JWT_SECRET=tu_clave_secreta
    ```

4. Ejecuta las migraciones de la base de datos:

    ```bash
    npx sequelize db:migrate
    ```

5. Inicia el servidor:

    ```bash
    npm start
    ```

