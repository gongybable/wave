# Application Setup
1. Dev Environment:
**Ubuntu**
2. Required Tool:
 1.**Docker version 1.13.1**
 2.**docker-compose version 1.10.0**
3. Set Up:
`docker-compose -f wave.yaml up -d`
4. Access the App
**localhost:3000**

# Project General Description
This application contains three docker contains.
## Angular Container
The angular container has a running Nginx instance hosting the Angular 2 App for the screen.
## API Container
The API Container has a running NodeJs instance hosting the API.
## MySql Container
The MySql Container has a running mysqld instance and hosting the database.

# Design Concepts
## Angular 2 APP
There is one service and one component for the Angular 2 app.
The component module contains the html elements, and uses the service module to send http requests.
The service module handles the communication between Angular 2 app and API.
## API
The API is built on top of Kraken.Js. Once the API spins up, it will connects to the Mysql container.
When there is a request to the API, it will go through the following middlewares:
1. Parser
To parse the req to get the proper arguments.
2. Router
The controllers that handles the api request.
3. Error Handler
Response with proper error messages if there is an error.

There are two routes developed in this API.
1. /api/report - GET
On this route, the controller will do a query in DB to return the payroll reports.
2. /api/upload - POST
On this route, the controller will:
 1. Validation check to ensure there is a file uploaded
 2. Read the last line of the file to get the reportId
  1. If the reportId already exists, response with `duplication: true`
  2. If the reportId does not exist, parse the entire file, save data into DB (with transcation), and response with `duplication: false`
## Mysql DB
The Mysql container is on the same docer network as the API container.
The database files is stored in a mapped volumn on the host. So that even if the image is rebuilt, the database files will not be lost. And if it is the fresh build and no database file found, it will also initialized the DB and create the users and tables.
