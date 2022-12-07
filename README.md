# Authentication-App

The main goal of the project is to implement a login OTP
authentication feature for a website.

The login app is implemented by using node.js and
express framework for the back-end and EJS templates are
used for the front-end part of the project. Since the project
has not had too many relational tables MongoDB, which is
no-SQL, is chosen to store information. The tables are created
in the Atlas cloud application that is provided by MongoDB
itself. User schema and login schema for store login
operations can be found in the code files.

# Usage

You can start the application by typing "node app.js" or "nodemon app.js" to the terminal.

# Npm Packages

1. “bcryptjs” is used for hashing the users passwords to
   store in the database.
2. “jsonwebtoken” is used for authorization of the users
   after they logged in to the system if they need to change
   their password.
3. “moment” is used for creating Date type variables and
   make adjustments on the variable to store as an email
   token.
4. “sendgrid” which is an email delivery provider is used for
   email operations like send verification code and retrieve
   new password via email.
5. “crypto” is used for creating random passwords if the user
   forgets the account’s password. In addition to that, it’s
   used for creating verification codes in the UUID form for
   uniqueness.
6. “mongoose-type-email” is used to store email input in the
   “email” type in the user schema.
   Also, “eslint” and “nodemon” are added as developer
   dependencies.
