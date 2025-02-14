# NodeJS-ExpressJS-MongoDB

This is a sample repository that contains the basic skeleton of a Node.js project made with Express.js Frameworka nd mongoDB as a database made in typescript.

# Clubcoms-API

## Requirements

- NodeJS Version 18.17.0

- NPM Version 9.6.7

## Common setup

- Clone the repo from GitHub.

- Install the necessary dependencies.

- Command to inatall the dependencies:

  ```bash
  npm install
  ```

- Command to run the application/ start the server

  ```bash
  npm start
  ```

## Multiple language support

- All the APIs in this application provides bilingual support for English and Spanish.

- The API will by default respond in English.

- To get the language specific message, API must get the following **header** in the request.

  - For English:

    ```bash
    Accept-Language : en
    ```

  - For Spanish:

    ```bash
    Accept-Language : es
    ```

- Here a NodeJS library i18next is used for localization or bilingual API support. Consider using the combination of specific versions of the packages for localization/ bilingual API support as mentioned below.

  - i18next @20.0.0

  - i18next-express-middleware @2.0.0

  - i18next-node-fs-backend @2.0.0

## Deploy to Heroku

- This application is deployed on Heroku.

[![](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com)
