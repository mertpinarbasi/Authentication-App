# Authentication-App
The main goal of this project is to implement a login
authentication feature for a website. Except for the basic
operations like registering and log in, the users should retrieve
verification emails after the registration process. In addition to
that, changing the password option and sending a new
verification code in case of expiration.

The login app is implemented by using node.js and
express framework for the back-end and EJS templates are
used for the front-end part of the project. Since the project
has not had too many relational tables MongoDB, which is
no-SQL, is chosen to store information. The tables are created
in the Atlas cloud application that is provided by MongoDB
itself. User schema and login schema for store login
operations can be found in the code files.
# Usage
You can start the application by typing "node app.js" .
Npm Packages
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


In the registration form, all input boxes should be filled.
Also, the password should not be shorter than 5 characters. If
these requirements are not satisfied, the user will be notified
by a warning message top of the form.
If the user has not been verified the account, a button will
be rendered to redirect the user to the verification page.
Hence, the user can enter the verification code which is sent
via email. If the verification code has expired, the user will be
redirected to resend the verification code to get a new email.
When the login process is completed, a new token will be
created and stored in the localStorage, which is an attribute of
the window object in the browser, in order to authorize the
user.

After logging in, the user is able to change the account’s
password. To complete this process, the JWT token must be
taken by using localStorage.If the JWT token is verified, the
user can change the password and the password should be
longer than 5 characters again.
Also, some statistics can be viewed by clicking the admin
panel button on the home page.
 
 ![loginAppWorkflow](https://user-images.githubusercontent.com/56068043/137516254-b6c1c259-8993-459d-9fe7-2c9a301aab49.png)

