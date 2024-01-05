## Challenge 3 - Node & AWS

This challenge it's a CRUD system for managing Users and Events. The application will feature token authentication for Users and store information in a MongoDB database. The project is developed using Express.js and Typescript, with input validation using Joi.Prettier/ESLint is used for code formatting, and JWT authentication is implemented with tokens sent in headers for enhanced security.

## Starting
These instructions will help you to get started!

What do you need to install for the software and how to install it?
TypeScript
Express
MongoDB
Jest
Supertest
Bcrypt
Eslint
Prettier


## Installation
Clone this repository:
$ git clone https://github.com/AlessaniAntoniazzi/Third-Challenge.git

Go to repository folder:
$ cd Third-Challenge

Install dependencies:
npm install

Run the application:
npm run dev

Execution port call:
http://localhost:3000



##Routes:
Post - User sign-up:
http://localhost:3000/users/sign-up
Post - User sign-in
http://localhost:3000/users/sign-in
POST - Create an Event
http://localhost:3000/events
GET - Get events by the day of the week
http://localhost:3000/events?<insert-the-dayofweek>
DELETE - Delete events by the day of the week
http://localhost:3000/events?<insert-the-dayofweek>
GET - Get events by the id
http://localhost:3000/events/<insert-the-id>
DELETE - Delete events by id
http://localhost:3000/events/<insert-the-id>

*After you sign-in, you have to insert the token in the Authorization, in order to deal with events
