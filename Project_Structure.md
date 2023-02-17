# MongoDB Atlas Cloud API

This is an API to connect to MongoDB Atlas Cloud. It is built using the ExpressJS framework.

## Project Structure

The project was initially structured as follows:

```
- lib/
  - routes/
    - courseRoutes.js
    - userRoutes.js
  - controller/
    - courseController.js
    - userController.js
  - service/
    - courseService.js
    - userService.js
  - middleware/
    - courseMiddleware.js
    - userMiddleware.js
  - database/
    - connections/
      - courseConnection.js
      - userConnection.js
    - models/
      - courseModel.js
      - userModel.js
    - schema/
      - courseSchema.js
      - userSchema.js
```

This structure was refactored for better readability and maintainability, as there were two separate databases: Users
and Courses. The refactored structure is as follows:

```
- lib/
  - user/
    - userRoutes.js
    - userConnection.js
    - userController.js
    - userService.js
    - userMiddleware.js
    - userModel.js
    - userSchema.js
  - course/
    - courseRoutes.js
    - courseConnection.js
    - courseController.js
    - courseService.js
    - courseMiddleware.js
    - courseModel.js
    - courseSchema.js
```

The refactored project structure separates the Users and Courses databases into different folders, allowing for easier
readability and maintainability. This also allows developers to easily access the files related to each database, making
the development process more efficient. Furthermore, this structure helps to keep the code organized and modular, making
it easier to debug any errors.
