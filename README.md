
documentacion de ejemplo rest api


# Category API

## Create a new category

* **URL**
  /api/categories

* **Method:**
  POST

* **Request Body**
  ```json
  {
    "name": "Category name"
  }
  ```

* **Success Response:**
  * **Code:** 201 Created
    **Content:**
    ```json
    {
      "id": "generated-id",
      "name": "Category name"
    }
    ```

* **Error Response:**
  * **Code:** 400 Bad Request
    **Content:**
    ```json
    {
      "message": "Validation failed",
      "errors": [
        { "field": "name", "message": "Name is required" }
      ]
    }
    ```

## Get all categories

* **URL**
  /api/categories

* **Method:**
  GET

* **Success Response:**
  * **Code:** 200 OK
    **Content:**
    ```json
    [
      {
        "id": "category-id-1",
        "name": "Category 1"
      },
      {
        "id": "category-id-2",
        "name": "Category 2"
      }
    ]
    ```

## Get a single category by ID

* **URL**
  /api/categories/:id

* **Method:**
  GET

* **URL Parameters**
  id (required)

* **Success Response:**
  * **Code:** 200 OK
    **Content:**
    ```json
    {
      "id": "category-id",
      "name": "Category name"
    }
    ```

* **Error Response:**
  * **Code:** 404 Not Found
    **Content:**
    ```json
    {
      "message": "Category not found"
    }
    ```

## Update a category by ID

* **URL**
  /api/categories/:id

* **Method:**
  PATCH

* **URL Parameters**
  id (required)

* **Request Body**
  ```json
  {
    "name": "Updated category name"
  }
  ```

* **Success Response:**
  * **Code:** 200 OK
    **Content:**
    ```json
    {
      "id": "category-id",
      "name": "Updated category name"
    }
    ```

* **Error Response:**
  * **Code:** 400 Bad Request
    **Content:**
    ```json
    {
      "message": "Validation failed",
      "errors": [
        { "field": "name", "message": "Name is required" }
      ]
    }
    ```
  * **Code:** 404 Not Found
    **Content:**
    ```json
    {
      "message": "Category not found"
    }
    ```

## Delete a category by ID

* **URL**
  /api/categories/:id

* **Method:**
  DELETE

* **URL Parameters**
  id (required)

* **Success Response:**
  * **Code:** 204 No Content

* **Error Response:**
  * **Code:** 404 Not Found
    **Content:**
    ```json
    {
      "message": "Category not found"
    }
    ```

## Authorization

To create, update, or delete categories, the API requires authentication. You can use the provided JWT token in the Authorization header as follows:

    token: <token>


  Replace `<token>` with the actual JWT token received from the login endpoint.\
  Note: The JWT token is generated using the `jsonwebtoken` library and requires a secret key.

