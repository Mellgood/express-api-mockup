# API Mockup app

This is intended to be used like a sketch to implement simple API services. I will expand basic mock functionalities as soon as I will need them in real projects.

## Purpose

This is a fast and minimal setup for a backbone nodejs-based using express framework, mongoose and dotenv.

## Install

First step is to build the .env file. Then you can install and run the project.

### Create the .env file

Create your .env file in the root of this project and fill it with your DB_CONNECTION login info and the TOKEN_SECRET value. It has to look like:

```File
DB_CONNECTION=mongodb+srv://<USERNAME>:<PASSWORD>@<YOUR-DATABASE>
TOKEN_SECRET=<YOUR-SECRET-FOR-JWT>

```

The TOKEN_SECRET can be any value like "sgrdFjgkdjDGR45d" or "hshjdh". It is up to you to chose a secret and keep it safe!

### Install dependencies

Just clone the repository and run npm install.

```Shell
npm install
```

### Run the project

Finally you can run the project with npm start.

```Shell
npm start
```

## Test

This basic project provides APIs to:

- Register a new user
- Login existing users (by getting back JWT)
- CRUD on posts

APIs are:

- /posts            GET,POST
- /posts/:postId    GET,DELETE,PATCH
- /auth/register    POST
- /auth/login       POST

To run API requests, I use "Advanced REST client", but you can use any other tool.
The default port value is 3000 so your app will answer at:
[http://localhost:3000/](http://localhost:3000/).

Appending the API's path you can run requests like:

- HTTP GET @ [http://localhost:3000/posts](http://localhost:3000/posts).
- HTTP POST @ [http://localhost:3000/auth/register](http://localhost:3000/auth/register).

The body content depends on the specific request. I will provide some examples running a typical workflow.

### App flow

First you need to register a new user.
Use the /auth/register POST api, passing to the body:

```API
{
  "name": "testuser",
  "email": "testuser@testuser.it",
  "password": "testuser"
}
```

The server will answer with the user's ID.

Now you can get the JWT token with a POST request to /auth/login with the body request:

```API
{
  "email": "testuser@testuser.it",
  "password": "testuser"
}
```

The server will answer with the JWT token. You need to *Copy* and hold it as it will be your identity yo  forward other requests as logged-in user.

You can also use [https://jwt.io/](https://jwt.io/) to decode your token's informations.

Now it is time to do requests to the posts api. Only logged-in users can do that so you need to add a header to your request. The header must be named auth-token as defined in verifyToken.js file. The value has to be your JWT token.

With your token you can perform actions like GET requests to /posts.
Example of HTML header:

```API
content-type: application/json
auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNiODdiYzJjYjc3YTFiZGUwOThhZWQiLCJpYXQiOjE2MTQ1MTQxMjF9.u52Lbjv3FWa6fxjKetcrR06ZazFZ6RPplAr-ukI52mM
```

## ToDo

- ...
