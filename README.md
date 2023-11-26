# weframe_internship_assignment



# Testing Guide

## To Run Unit Tests:

 ### Execute the command **"npm test"** in the terminal to run the unit tests.

 ### To Start the server Execute the command **"npm start"** in the terminal.

**_NOTE:_**: **Insert your mongodb atlas url in .env file** The tester needs to pass the token in the Authorization header with the format: **"Bearer [token]"** or use the string **"mockToken"** for testing purposes.
Ensure that the Authorization header is correctly set in all authenticated requests.It is recommended to test the endpoints in the specified order (signup, login, and then other endpoints) to ensure proper authentication.

1. Test Signup Endpoint (POST /signup):
Objective: Verify that new users can be registered.

Steps:

Send a POST request to http://localhost:5000/signup.
In the request body, provide user signup details.

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "[new_user_password]"
}
```


Expected Response:
Status: 201 Created
Body: A JSON object with the newly created user's username and token.
Example Response:
```json

{
    "username": "newuser",
    "token": "[Generated Token]",
    "message": "User created successfully"
}
```
2. Test Login Endpoint (POST /login):
Objective: Ensure that users can successfully log in.

Steps:

Send a POST request to http://localhost:5000/login.
In the request body, provide user login credentials.
```json
{
  "username": "testuser",
  "password": "[user_password]"
}
```

Expected Response:
Status: 200 OK
Body: A JSON object with the user's username and token.
Example Response:
```json

{
    "username": "newuser",
    "token": "[Generated Token]"
}
```
3. Test Task Creation Endpoint (POST /createTask):
Objective: Ensure that a new task can be created successfully.

Steps:

Send a POST request to http://localhost:5000/createTask.
Set the Authorization header with a valid token. Should look like "bearer <token>"
In the request body, provide task data in JSON format.
```json
{
  "title": "Test Task",
  "description": "This is a test task",
  "assignedUser": "testuser",
  "dueDate": "2023-12-31"
}
```
Expected Response:
Status: 201 Created
Body: A JSON object with the details of the created task.
Example Response:
```json

{
    "title": "Task1",
    "description": "This is a test task",
    "assignedUser": "testuser1",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "completionStatus": false,
    "_id": "[Generated Task ID]",
    "createdAt": "[Timestamp]",
    "updatedAt": "[Timestamp]",
    "__v": 0
}
```
4. Test Get All Tasks Endpoint (GET /task):
Objective: Verify that all tasks can be retrieved.

Steps:

Send a GET request to http://localhost:5000/task.
Set the Authorization header with a valid token.
Expected Response:
Status: 200 OK
Body: An array of task objects.
Example Response:
```json

[
    {
        "_id": "[Task ID]",
        "title": "Test Task",
        "description": "This is a test task.",
        "assignedUser": "testuser",
        "dueDate": "2023-12-31T00:00:00.000Z",
        "completionStatus": false,
        "createdAt": "[Timestamp]",
        "updatedAt": "[Timestamp]",
        "__v": 0
    },
    {
        "_id": "[Another Task ID]",
        "title": "Test Task",
        "description": "This is a test task",
        "assignedUser": "testuser",
        "dueDate": "2023-12-31T00:00:00.000Z",
        "completionStatus": false,
        "createdAt": "[Another Timestamp]",
        "updatedAt": "[Another Timestamp]",
        "__v": 0
    },
    // ... More tasks
]
```
5. Test Get Single Task Endpoint (GET /task/:id):
Objective: Confirm that a single task can be retrieved by ID.

Steps:

Send a GET request to http://localhost:5000/task/[task_id].
Set the Authorization header with a valid token.
Expected Response:
Status: 200 OK
Body: A JSON object with details of the requested task.
Example Response:
```json

{
    "_id": "[Task ID]",
    "title": "Test Task",
    "description": "This is a test task",
    "assignedUser": "testuser",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "completionStatus": false,
    "createdAt": "[Timestamp]",
    "updatedAt": "[Timestamp]",
    "__v": 0
}
```
6. Test Update Task Endpoint (PUT /task/:id):
Objective: Ensure that an existing task can be updated.
```json

{
    "_id": "[Task ID]",
    "title": "Updated Task",
    "description": "This is an updated task",
    "assignedUser": "testuser",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "completionStatus": false,
    "createdAt": "[Timestamp]",
    "updatedAt": "[New Timestamp]",
    "__v": 0
}
```
Steps:

Send a PUT request to http://localhost:5000/task/[task_id].
Set the Authorization header with a valid token.
In the request body, provide updated task data in JSON format.
Expected Response:
Status: 200 OK
Body: A JSON object with the details of the updated task.
Example Response:
```json

{
    "_id": "[Task ID]",
    "title": "Updated Task",
    "description": "This is an updated task",
    "assignedUser": "testuser",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "completionStatus": true,
    "createdAt": "[Timestamp]",
    "updatedAt": "[New Timestamp]",
    "__v": 0
}
```
7. Test Delete Task Endpoint (DELETE /task/:id):
Objective: Confirm that an existing task can be deleted.

Steps:

Send a DELETE request to http://localhost:5000/task/[task_id].
Set the Authorization header with a valid token.
Expected Response:
Status: 204 No Content or 200 OK
Body: A JSON object with a success message.
Example Response:

```json
{
    "message": "Task deleted successfully"
}
```
Additional Information:
The tester needs to pass the token in the Authorization header with the format: "Bearer [token]" or use the string "mockToken" for testing purposes.
Ensure that the Authorization header is correctly set in all authenticated requests.
It is recommended to test the endpoints in the specified order (signup, login, and then other endpoints) to ensure proper authentication.

## Additional Security Measures:
### Password Hashing with Bcrypt:
All user passwords are hashed and salted using the Bcrypt hashing algorithm before being stored in the MongoDB database. This adds an additional layer of security to protect user credentials.

### JWT for Authorization and Authentication:
JSON Web Tokens (JWT) are used for both authorization and authentication. When a user logs in, a JWT is generated and included in subsequent requests as the Authorization header. This ensures secure communication between the client and the server.

### Secure Storage of Secrets using .env:
Sensitive information, such as the JWT secret key, is stored in a separate .env file. This practice helps to keep sensitive data secure and prevents accidental exposure in the codebase.
