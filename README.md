
# M1 Garage Mean Stack Project Joharisoa Rotsy API

Application Programming interface for car repair management system. This API is used by angular for fetching data


## API Reference

Full API Reference is available at [Garage Mean Stack M1 API](https://documenter.getpostman.com/view/14904994/2s935hPm5q)

## Environment Variables
[.env.dist](./.env.dist) file can be used as `.env` template.

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`jwtSecret` 

#### Mailgun

`MAILGUN_API_KEY`

`MAILGUN_DOMAIN_NAME`

#### MongDB Connection String

`DB_URI`

#### Mail Secret Token for activating an User Account

`SECRET_MAIL_TOKEN`

#### Firebase

`API_KEY` 

`AUTH_DOMAIN` 

`PROJECT_ID`

`STORAGE_BUCKET`

`MESSAGING_SENDER_ID`

`APP_ID`

`MEASUREMENT_ID`

## Constants Variables

List of variables used in the project 

#### Base Url path constants (src/constants/Url.js)
`USER_ROUTE` : /users

#### User Roles constants
`ROLE_USER_CLIENT` : ROLE_USER_CLIENT

`ROLE_USER_ATELIER` : ROLE_USER_ATELIER

`ROLE_USER_FINANCE` : ROLE_USER_FINANCE
## Run Locally

Install Github CLI first [Github CLI](https://github.com/cli/cli#installation)

Clone the project

```bash
  gh repo clone Junx2001/m1p10mean-joharisoa-rotsy_API
```

Create `.env` using `.env.dist` as a template and fill with required environnement variables

Go to the project directory

```bash
  cd m1p10mean-joharisoa-rotsy_API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

You can now access the server at [http://localhost:3000](http://localhost:3000) or any PORT specified in .env


## Librairies

 - [Bcrypt](https://www.npmjs.com/package/bcrypt)
 - [body-parser](https://www.npmjs.com/package/body-parser)
 - [cors](https://www.npmjs.com/package/cors)
  - [dotenv](https://www.npmjs.com/package/dotenv)
 - [express](https://www.npmjs.com/package/express)
 - [express-fileupload](https://www.npmjs.com/package/express-fileupload)
  - [firebase](https://www.npmjs.com/package/firebase)
 - [firebase-admin](https://www.npmjs.com/package/firebase-admin)
 - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
 - [mailgun-js](https://www.npmjs.com/package/mailgun-js-sdk)
 - [mongoose](https://www.npmjs.com/package/mongoose)
 - [morgan](https://www.npmjs.com/package/morgan)
 - [multer](https://www.npmjs.com/package/multer)
 - [path](https://www.npmjs.com/package/path)
 - [xhr2](https://www.npmjs.com/package/xhr2)

## Authors

- [@junx2001](https://github.com/Junx2001)


## Demo

Official link to API online : https://m1p10mean-joharisoa-rotsyapi-production.up.railway.app/

Official link to the angular car repair management system which is using the last version of this API : https://m1p10mean-joharisoa-rotsy.vercel.app



## Tech Stack

**Server:** Node, Express

**Databse:** MongoDb

**Mailign:** Mailgun

**File Storage:** Firebase



## Documentation

Will Be available soon


## Installation

Install m1p10mean-joharisoa-rotsy_API with npm

```bash
  npm install m1p10mean-joharisoa-rotsy_API
  cd m1p10mean-joharisoa-rotsy_API
```
    
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


## Deployment

Hosted by (https://railway.app/)

