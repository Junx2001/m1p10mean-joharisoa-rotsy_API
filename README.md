# M1P10MEAN-JOHARISOA-ROTSY-API #

Car reparation management system

## Environment Variables

This project uses *different .env files* for each environment stage.

| NODE_ENV      | Filename           | Description            |
| :------------ | :----------------- | :--------------------- |
| `development` | `.env.development` | For local development  |
| `staging`     | `.env.staging`     | For software testing   |
| `production`  | `.env.production`  | Production environment |

To switch between environments we need to run :

```bash
  # Linux
  export NODE_ENV=development
  # export NODE_ENV=staging
  # Windows
  set NODE_ENV=development 
  # set NODE_ENV=staging
```
[.env.dist](./.env.dist) file can be used as `.env.your-environment` template.

To run this project, you will need to add the following environment variables to your `.env.your-environment` file

`PORT` : in case the port 3000 is already used locally

`DBURI` : the MongoDB Server Connection String (example: mongodb+srv://server.example.com/?connectTimeoutMS=300000&authSource=aDifferentAuthDB)

### Mongo Database configurations
`DB_HOST` : 

`DB_USER` : Mongo user

`DB_PASSWORD` : user password

`DB_NAME` : database name

### Mailgun configurations
`MAILGUN_API_KEY` : Mailgun private key

`MAILGUN_DOMAIN`

`MAILGUN_USER_NAME`

`MAILGUN_SENDER_NAME` : Garage Team

`MAILGUN_SENDER_EMAIL` : garage@mean.mg

## Constants Variables

List of variables used in the project 

### Base Url path constants (src/constants/Url.js)
`USER_ROUTE` : /users

### User Roles constants
`ROLE_USER_CLIENT` : ROLE_USER_CLIENT
`ROLE_USER_ATELIER` : ROLE_USER_ATELIER
`ROLE_USER_FINANCE` : ROLE_USER_FINANCE




## Run Locally

Clone the project

```bash
  git clone https://DevelopperBusinessSolution@bitbucket.org/businesssolutionnexthope/manoova-payment.git
```

Go to the project directory

```bash
  cd manoova-payment
```

Install dependencies

```bash
  npm install
```

Set up environment*

```bash
  export NODE_ENV=development;
```

Start the server in development mode

```bash
  npm run start:dev
```

You can now access the server at [http://localhost:3000](http://localhost:3000) or any PORT specified in .env

## Documentation

- [Mailing](https://documentation.mailgun.com/en/latest/user_manual.html#sending-via-api)

- [Puppeteer dependencies](https://stackoverflow.com/questions/64361897/puppeteer-not-working-on-vps-but-running-locally)


```bash
  sudo apt-get install libnss3-dev

  sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev
```

### Libraries

- [HttpClient](https://www.npmjs.com/package/axios) 

- [Puppeteer](https://www.npmjs.com/package/puppeteer)

- [Mailgun.js](https://www.npmjs.com/package/mailgun.js)

## API Reference

Return `PDF File`

#### Login User

```http
  POST /users/login/
```

| Parameter      | Type            | Description                                  |
| :------------- | :-------------- | :------------------------------------------- |
| `email`        | **String**      | **Required**. Email of user in database.     |
| `password`     | **String**      | **Required**. Id of reservation in database. |

Return `PDF File`


```json
  {
    "email": example@domain.com,
    "password": examplepassword,
  }
```


#### Signup User

```http
  POST /users/signup/
```

| Parameter      | Type            | Description                                                   |
| :------------- | :-------------- | :------------------------------------------------------------ |
| `email`        | **String**      | **Required**. Email of User                                   |
| `name`         | **String**      | **Required**. Name of User                                    |
| `password`     | **String**      | **Required**. Password of User                                |
| `role`         | **String**      | **Required**. User Role                                       |

Return `PDF File`

**Note:** Roles are defined in src/constants/UserRole.js

```json
  {
    "email": example@domain.com,
    "name": examplename,
    "password": examplepassword,
    "role": ROLE_USER_CLIENT,
    
    
  }
```

