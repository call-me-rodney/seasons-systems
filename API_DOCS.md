# API Documentation

This document contains the current documentation for all backend API endpoints, grouped by feature/module.

## Authentication

### Login
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/auth/login`
*   **Description:** Authenticates a user and returns a JWT token.
*   **Required Permissions:** None (public endpoint)
*   **Request Body:**
    ```json
    {
        "name": "string",
        "password": "string"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "token": "jwt_token_string",
        "user": {
            "id": "number",
            "name": "string",
            "role": "string",
            "department": "string"
        }
    }
    ```
*   **Response Body (Error - 401 Unauthorized):**
    ```json
    {
        "error": "Invalid credentials"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"testuser\",\"password\":\"testpassword\"}" http://localhost:4000/api/auth/login
    ```

## HR (Employees)

### Get All Employees
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/employees`
*   **Description:** Retrieves a list of all employees.
*   **Required Permissions:** Role: `admin`, Department: `HR`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "employeeID": "number",
            "name": "string",
            "role": "string",
            "dateOfHire": "date",
            "dateOfFire": "date | null",
            "contact": "string | null",
            "isActive": "boolean",
            "department": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Response Body (Error - 401 Unauthorized | 403 Forbidden):**
    ```json
    {
        "error": "Unauthorized"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/employees
    ```

### Get Employee by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/employees/:id`
*   **Description:** Retrieves a single employee by their ID.
*   **Required Permissions:** Role: `admin`, Department: `HR`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "employeeID": "number",
        "name": "string",
        "role": "string",
        "dateOfHire": "date",
        "dateOfFire": "date | null",
        "contact": "string | null",
        "isActive": "boolean",
        "department": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Response Body (Error - 404 Not Found | 401 Unauthorized | 403 Forbidden):**
    ```json
    {
        "error": "Employee not found"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/employees/1
    ```

### Create Employee
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/employees`
*   **Description:** Creates a new employee record.
*   **Required Permissions:** Role: `admin`, Department: `HR`
*   **Request Body:**
    ```json
    {
        "name": "string",
        "role": "enum('user', 'admin')",
        "dateOfHire": "date (YYYY-MM-DD)",
        "password": "string",
        "department": "enum('HR', 'equipment', 'inventory', 'sales', 'field', 'crop', 'livestock', 'procurement')",
        "contact": "string | null"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "employeeID": "number",
        "name": "string",
        "role": "string",
        "dateOfHire": "date",
        "dateOfFire": "date | null",
        "contact": "string | null",
        "isActive": "boolean",
        "department": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Response Body (Error - 500 Internal Server Error | 401 Unauthorized | 403 Forbidden):**
    ```json
    {
        "error": "Error message"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"name\":\"New Employee\",\"role\":\"user\",\"dateOfHire\":\"2024-01-01\",\"password\":\"securepass\",\"department\":\"sales\"}" http://localhost:4000/api/employees
    ```

### Update Employee
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/employees/:id`
*   **Description:** Updates an existing employee record.
*   **Required Permissions:** Role: `admin`, Department: `HR`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "name": "string",
        "role": "enum('user', 'admin')",
        "dateOfHire": "date (YYYY-MM-DD)",
        "dateOfFire": "date (YYYY-MM-DD) | null",
        "contact": "string | null",
        "isActive": "boolean",
        "department": "enum('HR', 'equipment', 'inventory', 'sales', 'field', 'crop', 'livestock', 'procurement')"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "employeeID": "number",
        "name": "string",
        "role": "string",
        "dateOfHire": "date",
        "dateOfFire": "date | null",
        "contact": "string | null",
        "isActive": "boolean",
        "department": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Response Body (Error - 404 Not Found | 500 Internal Server Error | 401 Unauthorized | 403 Forbidden):**
    ```json
    {
        "error": "Error message"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"name\":\"Updated Name\",\"isActive\":false}" http://localhost:4000/api/employees/1
    ```

### Delete Employee
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/employees/:id`
*   **Description:** Deletes an employee record by ID.
*   **Required Permissions:** Role: `admin`, Department: `HR`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Response Body (Error - 404 Not Found | 500 Internal Server Error | 401 Unauthorized | 403 Forbidden):**
    ```json
    {
        "error": "Error message"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/employees/1
    ```

## Field Management

### Crops

#### Get All Crops
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/crops`
*   **Description:** Retrieves a list of all crop records.
*   **Required Permissions:** Role: `user` or `admin`, Department: `crop`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "cropID": "number",
            "type": "string",
            "plantingDate": "date",
            "expectedHarvestDate": "date",
            "actualHarvestDate": "date | null",
            "yieldQuantity": "number",
            "yieldUnit": "string",
            "fieldID": "number",
            "status": "string",
            "isInfested": "boolean",
            "infestation": "string | null",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/crops
    ```

#### Get Crop by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/crops/:id`
*   **Description:** Retrieves a single crop record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `crop`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "cropID": "number",
        "type": "string",
        "plantingDate": "date",
        "expectedHarvestDate": "date",
        "actualHarvestDate": "date | null",
        "yieldQuantity": "number",
        "yieldUnit": "string",
        "fieldID": "number",
        "status": "string",
        "isInfested": "boolean",
        "infestation": "string | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/crops/1
    ```

#### Create Crop
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/crops`
*   **Description:** Creates a new crop record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `crop`
*   **Request Body:**
    ```json
    {
        "type": "string",
        "plantingDate": "date (YYYY-MM-DD)",
        "expectedHarvestDate": "date (YYYY-MM-DD)",
        "yieldQuantity": "number",
        "yieldUnit": "string",
        "fieldID": "number",
        "status": "string",
        "isInfested": "boolean",
        "infestation": "string | null"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "cropID": "number",
        "type": "string",
        "plantingDate": "date",
        "expectedHarvestDate": "date",
        "actualHarvestDate": "date | null",
        "yieldQuantity": "number",
        "yieldUnit": "string",
        "fieldID": "number",
        "status": "string",
        "isInfested": "boolean",
        "infestation": "string | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"type\":\"Wheat\",\"plantingDate\":\"2024-04-01\",\"expectedHarvestDate\":\"2024-09-01\",\"yieldQuantity\":200,\"yieldUnit\":\"bushels\",\"fieldID\":1,\"status\":\"growing\",\"is_infested\":false,\"infestation\":null}" http://localhost:4000/api/crops
    ```

#### Update Crop
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/crops/:id`
*   **Description:** Updates an existing crop record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `crop`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "type": "string",
        "plantingDate": "date (YYYY-MM-DD)",
        "expectedHarvestDate": "date (YYYY-MM-DD)",
        "actualHarvestDate": "date (YYYY-MM-DD) | null",
        "yieldQuantity": "number",
        "yieldUnit": "string",
        "fieldID": "number",
        "status": "string",
        "isInfested": "boolean",
        "infestation": "string | null"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "cropID": "number",
        "type": "string",
        "plantingDate": "date",
        "expectedHarvestDate": "date",
        "actualHarvestDate": "date | null",
        "yieldQuantity": "number",
        "yieldUnit": "string",
        "fieldID": "number",
        "status": "string",
        "isInfested": "boolean",
        "infestation": "string | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"status\":\"harvested\",\"actualHarvestDate\":\"2024-08-20\"}" http://localhost:4000/api/crops/1
    ```

#### Delete Crop
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/crops/:id`
*   **Description:** Deletes a crop record by ID.
*   **Required Permissions:** Role: `admin`, Department: `crop`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/crops/1
    ```

### Fields

#### Get All Fields
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/fields`
*   **Description:** Retrieves a list of all field records.
*   **Required Permissions:** Role: `user` or `admin`, Department: `field`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "fieldID": "number",
            "name": "string",
            "location": "string",
            "size": "number",
            "soilType": "string",
            "lastFertilizedDate": "date",
            "isActive": "boolean",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/fields
    ```

#### Get Field by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/fields/:id`
*   **Description:** Retrieves a single field record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `field`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "fieldID": "number",
        "name": "string",
        "location": "string",
        "size": "number",
        "soilType": "string",
        "lastFertilizedDate": "date",
        "isActive": "boolean",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/fields/1
    ```

#### Create Field
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/fields`
*   **Description:** Creates a new field record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `field`
*   **Request Body:**
    ```json
    {
        "name": "string",
        "location": "string",
        "size": "number",
        "soilType": "string",
        "lastFertilizedDate": "date (YYYY-MM-DD)",
        "isActive": "boolean"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "fieldID": "number",
        "name": "string",
        "location": "string",
        "size": "number",
        "soilType": "string",
        "lastFertilizedDate": "date",
        "isActive": "boolean",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"name\":\"Field 2\",\"location\":\"Farm B, Section 1\",\"size\":150,\"soilType\":\"Clay\",\"lastFertilizedDate\":\"2024-02-01\",\"isActive\":true}" http://localhost:4000/api/fields
    ```

#### Update Field
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/fields/:id`
*   **Description:** Updates an existing field record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `field`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "name": "string",
        "location": "string",
        "size": "number",
        "soilType": "string",
        "lastFertilizedDate": "date (YYYY-MM-DD)",
        "isActive": "boolean"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "fieldID": "number",
        "name": "string",
        "location": "string",
        "size": "number",
        "soilType": "string",
        "lastFertilizedDate": "date",
        "isActive": "boolean",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"isActive\":false}" http://localhost:4000/api/fields/1
    ```

#### Delete Field
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/fields/:id`
*   **Description:** Deletes a field record by ID.
*   **Required Permissions:** Role: `admin`, Department: `field`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/fields/1
    ```

### Livestock

#### Get All Livestock
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/livestock`
*   **Description:** Retrieves a list of all livestock records.
*   **Required Permissions:** Role: `user` or `admin`, Department: `livestock`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "animalID": "number",
            "species": "string",
            "breed": "string",
            "birthDate": "date",
            "acquisitionDate": "date",
            "isHealthy": "boolean",
            "affliction": "string | null",
            "penID": "number",
            "status": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/livestock
    ```

#### Get Livestock by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/livestock/:id`
*   **Description:** Retrieves a single livestock record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `livestock`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "animalID": "number",
        "species": "string",
        "breed": "string",
        "birthDate": "date",
        "acquisitionDate": "date",
        "isHealthy": "boolean",
        "affliction": "string | null",
        "penID": "number",
        "status": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/livestock/1
    ```

#### Create Livestock
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/livestock`
*   **Description:** Creates a new livestock record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `livestock`
*   **Request Body:**
    ```json
    {
        "species": "string",
        "breed": "string",
        "birthDate": "date (YYYY-MM-DD)",
        "acquisitionDate": "date (YYYY-MM-DD)",
        "isHealthy": "boolean",
        "affliction": "string | null",
        "penID": "number",
        "status": "string"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "animalID": "number",
        "species": "string",
        "breed": "string",
        "birthDate": "date",
        "acquisitionDate": "date",
        "isHealthy": "boolean",
        "affliction": "string | null",
        "penID": "number",
        "status": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"species\":\"Pigs\",\"breed\":\"Yorkshire\",\"birthDate\":\"2023-06-01\",\"acquisitionDate\":\"2023-08-01\",\"isHealthy\":true,\"affliction\":null,\"penID\":1,\"status\":\"active\"}" http://localhost:4000/api/livestock
    ```

#### Update Livestock
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/livestock/:id`
*   **Description:** Updates an existing livestock record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `livestock`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "species": "string",
        "breed": "string",
        "birthDate": "date (YYYY-MM-DD)",
        "acquisitionDate": "date (YYYY-MM-DD)",
        "isHealthy": "boolean",
        "affliction": "string | null",
        "penID": "number",
        "status": "string"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "animalID": "number",
        "species": "string",
        "breed": "string",
        "birthDate": "date",
        "acquisitionDate": "date",
        "isHealthy": "boolean",
        "affliction": "string | null",
        "penID": "number",
        "status": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"isHealthy\":false,\"affliction\":\"Foot-and-mouth disease\"}" http://localhost:4000/api/livestock/1
    ```

#### Delete Livestock
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/livestock/:id`
*   **Description:** Deletes a livestock record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `livestock`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/livestock/1
    ```

### Pens

#### Get All Pens
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/pens`
*   **Description:** Retrieves a list of all pen records.
*   **Required Permissions:** Role: `user` or `admin`, Department: `pen`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "penID": "number",
            "name": "string",
            "location": "string",
            "type": "string",
            "capacity": "number",
            "lastCleanedDate": "date",
            "isFull": "boolean",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/pens
    ```

#### Get Pen by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/pens/:id`
*   **Description:** Retrieves a single pen record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `pen`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "penID": "number",
        "name": "string",
        "location": "string",
        "type": "string",
        "capacity": "number",
        "lastCleanedDate": "date",
        "isFull": "boolean",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/pens/1
    ```

#### Create Pen
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/pens`
*   **Description:** Creates a new pen record.
*   **Required Permissions:** Role: `admin`, Department: `pen`
*   **Request Body:**
    ```json
    {
        "name": "string",
        "location": "string",
        "type": "string",
        "capacity": "number",
        "lastCleanedDate": "date (YYYY-MM-DD)",
        "isFull": "boolean"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "penID": "number",
        "name": "string",
        "location": "string",
        "type": "string",
        "capacity": "number",
        "lastCleanedDate": "date",
        "isFull": "boolean",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"name\":\"Pen 2\",\"location\":\"Barn 2\",\"type\":\"Stall\",\"capacity\":5,\"lastCleanedDate\":\"2024-03-01\",\"isFull\":false}" http://localhost:4000/api/pens
    ```

#### Update Pen
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/pens/:id`
*   **Description:** Updates an existing pen record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `pen`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "name": "string",
        "location": "string",
        "type": "string",
        "capacity": "number",
        "lastCleanedDate": "date (YYYY-MM-DD)",
        "isFull": "boolean"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "penID": "number",
        "name": "string",
        "location": "string",
        "type": "string",
        "capacity": "number",
        "lastCleanedDate": "date",
        "isFull": "boolean",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"isFull\":true}" http://localhost:4000/api/pens/1
    ```

#### Delete Pen
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/pens/:id`
*   **Description:** Deletes a pen record by ID.
*   **Required Permissions:** Role: `admin`, Department: `pen`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/pens/1
    ```

## Equipment & Inventory

### Equipment

#### Get All Equipment
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/equipment`
*   **Description:** Retrieves a list of all equipment records.
*   **Required Permissions:** Role: `user` or `admin`, Department: `equipment`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "equipmentID": "number",
            "name": "string",
            "model": "string",
            "purchaseDate": "date",
            "status": "string",
            "supplierID": "number | null",
            "isInUse": "boolean",
            "employeeID": "number | null",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/equipment
    ```

#### Get Equipment by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/equipment/:id`
*   **Description:** Retrieves a single equipment record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `equipment`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "equipmentID": "number",
        "name": "string",
        "model": "string",
        "purchaseDate": "date",
        "status": "string",
        "supplierID": "number | null",
        "isInUse": "boolean",
        "employeeID": "number | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/equipment/1
    ```

#### Create Equipment
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/equipment`
*   **Description:** Creates a new equipment record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `equipment`
*   **Request Body:**
    ```json
    {
        "name": "string",
        "model": "string",
        "purchaseDate": "date (YYYY-MM-DD)",
        "status": "string",
        "supplierID": "number | null",
        "isInUse": "boolean",
        "employeeID": "number | null"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "equipmentID": "number",
        "name": "string",
        "model": "string",
        "purchaseDate": "date",
        "status": "string",
        "supplierID": "number | null",
        "isInUse": "boolean",
        "employeeID": "number | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"name\":\"Plow\",\"model\":\"P-100\",\"purchaseDate\":\"2023-07-01\",\"status\":\"new\",\"supplierID\":1,\"isInUse\":false,\"employeeID\":null}" http://localhost:4000/api/equipment
    ```

#### Update Equipment
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/equipment/:id`
*   **Description:** Updates an existing equipment record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `equipment`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "name": "string",
        "model": "string",
        "purchaseDate": "date (YYYY-MM-DD)",
        "status": "string",
        "supplierID": "number | null",
        "isInUse": "boolean",
        "employeeID": "number | null"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "equipmentID": "number",
        "name": "string",
        "model": "string",
        "purchaseDate": "date",
        "status": "string",
        "supplierID": "number | null",
        "isInUse": "boolean",
        "employeeID": "number | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"isInUse\":true,\"employeeID\":1}" http://localhost:4000/api/equipment/1
    ```

#### Delete Equipment
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/equipment/:id`
*   **Description:** Deletes an equipment record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `equipment`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/equipment/1
    ```

### Inventory

#### Get All Inventory Items
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/inventory`
*   **Description:** Retrieves a list of all inventory records.
*   **Required Permissions:** Role: `user` or `admin`, Department: `inventory`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "itemID": "number",
            "name": "string",
            "quantity": "number",
            "units": "string",
            "pricePerUnit": "number",
            "expiryDate": "date | null",
            "cropID": "number | null",
            "animalID": "number | null",
            "type": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/inventory
    ```

#### Get Inventory Item by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/inventory/:id`
*   **Description:** Retrieves a single inventory record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `inventory`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "itemID": "number",
        "name": "string",
        "quantity": "number",
        "units": "string",
        "pricePerUnit": "number",
        "expiryDate": "date | null",
        "cropID": "number | null",
        "animalID": "number | null",
        "type": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/inventory/1
    ```

#### Create Inventory Item
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/inventory`
*   **Description:** Creates a new inventory record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `inventory`
*   **Request Body:**
    ```json
    {
        "name": "string",
        "quantity": "number",
        "units": "string",
        "pricePerUnit": "number",
        "expiryDate": "date (YYYY-MM-DD) | null",
        "cropID": "number | null",
        "animalID": "number | null",
        "type": "string"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "itemID": "number",
        "name": "string",
        "quantity": "number",
        "units": "string",
        "pricePerUnit": "number",
        "expiryDate": "date | null",
        "cropID": "number | null",
        "animalID": "number | null",
        "type": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"name\":\"Milk\",\"quantity\":100,\"units\":\"liters\",\"pricePerUnit\":1.2,\"expiryDate\":\"2024-09-01\",\"cropID\":null,\"animalID\":1,\"type\":\"meat_produce\"}" http://localhost:4000/api/inventory
    ```

#### Update Inventory Item
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/inventory/:id`
*   **Description:** Updates an existing inventory record.
*   **Required Permissions:** Role: `admin`, Department: `inventory`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "name": "string",
        "quantity": "number",
        "units": "string",
        "pricePerUnit": "number",
        "expiryDate": "date (YYYY-MM-DD) | null",
        "cropID": "number | null",
        "animalID": "number | null",
        "type": "string"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "itemID": "number",
        "name": "string",
        "quantity": "number",
        "units": "string",
        "pricePerUnit": "number",
        "expiryDate": "date | null",
        "cropID": "number | null",
        "animalID": "number | null",
        "type": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"quantity\":90,\"expiryDate\":\"2024-08-28\"}" http://localhost:4000/api/inventory/1
    ```

#### Delete Inventory Item
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/inventory/:id`
*   **Description:** Deletes an inventory record by ID.
*   **Required Permissions:** Role: `user` or `admin`, Department: `inventory`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/inventory/1
    ```

### Suppliers

#### Get All Suppliers
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/suppliers`
*   **Description:** Retrieves a list of all supplier records.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "supplierID": "number",
            "name": "string",
            "contacts": "string",
            "address": "string",
            "specialty": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/suppliers
    ```

#### Get Supplier by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/suppliers/:id`
*   **Description:** Retrieves a single supplier record by ID.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "supplierID": "number",
        "name": "string",
        "contacts": "string",
        "address": "string",
        "specialty": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/suppliers/1
    ```

#### Create Supplier
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/suppliers`
*   **Description:** Creates a new supplier record.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Request Body:**
    ```json
    {
        "name": "string",
        "contacts": "string",
        "address": "string",
        "specialty": "string"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "supplierID": "number",
        "name": "string",
        "contacts": "string",
        "address": "string",
        "specialty": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"name\":\"New Supplier Co.\",\"contacts\":\"Jane Doe\",\"address\":\"456 Oak Ave\",\"specialty\":\"Seeds\"}" http://localhost:4000/api/suppliers
    ```

#### Update Supplier
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/suppliers/:id`
*   **Description:** Updates an existing supplier record.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "name": "string",
        "contacts": "string",
        "address": "string",
        "specialty": "string"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "supplierID": "number",
        "name": "string",
        "contacts": "string",
        "address": "string",
        "specialty": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"contacts\":\"Jane Smith\"}" http://localhost:4000/api/suppliers/1
    ```

#### Delete Supplier
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/suppliers/:id`
*   **Description:** Deletes a supplier record by ID.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/suppliers/1
    ```

## Sales

### Sales

#### Get All Sales
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/sales`
*   **Description:** Retrieves a list of all sales records.
*   **Required Permissions:** Role: `admin`, Department: `sales`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "saleID": "number",
            "saleDetailsID": "number",
            "saleDate": "date",
            "employeeID": "number",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/sales
    ```

#### Get Sale by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/sales/:id`
*   **Description:** Retrieves a single sales record by ID.
*   **Required Permissions:** Role: `admin`, Department: `sales`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "saleID": "number",
        "saleDetailsID": "number",
            "saleDate": "date",
            "employeeID": "number",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/sales/1
    ```

#### Create Sale
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/sales`
*   **Description:** Creates a new sales record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `sales`
*   **Request Body:**
    ```json
    {
        "saleDetailsID": "number",
        "saleDate": "date (YYYY-MM-DD)",
        "employeeID": "number"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "saleID": "number",
        "saleDetailsID": "number",
        "saleDate": "date",
        "employeeID": "number",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"saleDetailsID\":1,\"saleDate\":\"2024-08-24\",\"employeeID\":1}" http://localhost:4000/api/sales
    ```

#### Update Sale
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/sales/:id`
*   **Description:** Updates an existing sales record.
*   **Required Permissions:** Role: `admin`, Department: `sales`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "saleDetailsID": "number",
        "saleDate": "date (YYYY-MM-DD)",
        "employeeID": "number"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "saleID": "number",
        "saleDetailsID": "number",
        "saleDate": "date",
        "employeeID": "number",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"saleDate\":\"2024-08-25\"}" http://localhost:4000/api/sales/1
    ```

#### Delete Sale
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/sales/:id`
*   **Description:** Deletes a sales record by ID.
*   **Required Permissions:** Role: `admin`, Department: `sales`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/sales/1
    ```

### Sales Details

#### Get All Sales Details
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/salesdetails`
*   **Description:** Retrieves a list of all sales details records.
*   **Required Permissions:** Role: `admin`, Department: `sales`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "salesDetailsID": "number",
            "item": "number",
            "quantitySold": "number",
            "unitPrice": "number",
            "saleTotal": "number",
            "paymentMethod": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/salesdetails
    ```

#### Get Sales Details by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/salesdetails/:id`
*   **Description:** Retrieves a single sales details record by ID.
*   **Required Permissions:** Role: `admin`, Department: `sales`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "salesDetailsID": "number",
        "item": "number",
        "quantitySold": "number",
        "unitPrice": "number",
        "saleTotal": "number",
        "paymentMethod": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/salesdetails/1
    ```

#### Create Sales Details
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/salesdetails`
*   **Description:** Creates a new sales details record.
*   **Required Permissions:** Role: `user` or `admin`, Department: `sales`
*   **Request Body:**
    ```json
    {
        "item": "number",
        "quantitySold": "number",
        "unitPrice": "number",
        "saleTotal": "number",
        "paymentMethod": "string"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "salesDetailsID": "number",
        "item": "number",
        "quantitySold": "number",
        "unitPrice": "number",
        "saleTotal": "number",
        "paymentMethod": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"item\":1,\"quantitySold\":5,\"unitPrice\":10,\"saleTotal\":50,\"paymentMethod\":\"Credit Card\"}" http://localhost:4000/api/salesdetails
    ```

#### Update Sales Details
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/salesdetails/:id`
*   **Description:** Updates an existing sales details record.
*   **Required Permissions:** Role: `admin`, Department: `sales`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "item": "number",
        "quantitySold": "number",
        "unitPrice": "number",
        "saleTotal": "number",
        "paymentMethod": "string"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "salesDetailsID": "number",
        "item": "number",
        "quantitySold": "number",
        "unitPrice": "number",
        "saleTotal": "number",
        "paymentMethod": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"quantitySold\":12}" http://localhost:4000/api/salesdetails/1
    ```

#### Delete Sales Details
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/salesdetails/:id`
*   **Description:** Deletes a sales details record by ID.
*   **Required Permissions:** Role: `admin`, Department: `sales`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/salesdetails/1
    ```

## Procurement

### Resupply

#### Get All Resupply Requests
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/resupplies`
*   **Description:** Retrieves a list of all resupply requests.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Response Body (Success - 200 OK):**
    ```json
    [
        {
            "requestID": "number",
            "requestDate": "date",
            "itemID": "number",
            "supplierID": "number",
            "quantity": "number",
            "unitPrice": "number",
            "subtotal": "number",
            "deliveryDate": "date | null",
            "invoiceNo": "string | null",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/resupplies
    ```

#### Get Resupply Request by ID
*   **HTTP Method:** `GET`
*   **Endpoint URL:** `/api/resupplies/:id`
*   **Description:** Retrieves a single resupply request by ID.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "requestID": "number",
        "requestDate": "date",
        "itemID": "number",
        "supplierID": "number",
        "quantity": "number",
        "unitPrice": "number",
        "subtotal": "number",
        "deliveryDate": "date | null",
        "invoiceNo": "string | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X GET -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/resupplies/1
    ```

#### Create Resupply Request
*   **HTTP Method:** `POST`
*   **Endpoint URL:** `/api/resupplies`
*   **Description:** Creates a new resupply request.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Request Body:**
    ```json
    {
        "requestDate": "date (YYYY-MM-DD)",
        "itemID": "number",
        "supplierID": "number",
        "quantity": "number",
        "unitPrice": "number",
        "subtotal": "number",
        "deliveryDate": "date (YYYY-MM-DD) | null",
        "invoiceNo": "string | null"
    }
    ```
*   **Response Body (Success - 201 Created):**
    ```json
    {
        "requestID": "number",
        "requestDate": "date",
        "itemID": "number",
        "supplierID": "number",
        "quantity": "number",
        "unitPrice": "number",
        "subtotal": "number",
        "deliveryDate": "date | null",
        "invoiceNo": "string | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"requestDate\":\"2024-08-24\",\"itemID\":1,\"supplierID\":1,\"quantity\":50,\"unitPrice\":0.8,\"subtotal\":40,\"deliveryDate\":null,\"invoiceNo\":null}" http://localhost:4000/api/resupplies
    ```

#### Update Resupply Request
*   **HTTP Method:** `PUT`
*   **Endpoint URL:** `/api/resupplies/:id`
*   **Description:** Updates an existing resupply request.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Request Body:** (Partial update allowed)
    ```json
    {
        "requestDate": "date (YYYY-MM-DD)",
        "itemID": "number",
        "supplierID": "number",
        "quantity": "number",
        "unitPrice": "number",
        "subtotal": "number",
        "deliveryDate": "date (YYYY-MM-DD) | null",
        "invoiceNo": "string | null"
    }
    ```
*   **Response Body (Success - 200 OK):**
    ```json
    {
        "requestID": "number",
        "requestDate": "date",
        "itemID": "number",
        "supplierID": "number",
        "quantity": "number",
        "unitPrice": "number",
        "subtotal": "number",
        "deliveryDate": "date | null",
        "invoiceNo": "string | null",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
*   **Example Usage (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d "{\"deliveryDate\":\"2024-09-05\",\"invoiceNo\":\"INV-001\"}" http://localhost:4000/api/resupplies/1
    ```

#### Delete Resupply Request
*   **HTTP Method:** `DELETE`
*   **Endpoint URL:** `/api/resupplies/:id`
*   **Description:** Deletes a resupply request by ID.
*   **Required Permissions:** Role: `admin`, Department: `procurement`
*   **Response Body (Success - 204 No Content):**
    *   No content
*   **Example Usage (curl):**
    ```bash
    curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/resupplies/1
    ```
