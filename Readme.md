# Auth test v0.1

First iteration of authentication - authorization test.

Using JWT

Should be able to:
  - Create a new user (stored in db)
  - Sign in user with username/password
  - Request public resources as not signed in user
  - Request protected resources as signed in user

In this first iteration the backend will be the focus.
So creating a user, signing in and requesting resources will be done with curl/postman

## To do

## Doing
  - Multiple routes with different levels of authorization

## Done
  - Two routes (one with protected resources and one without)
  - Implement JWT (verification of JWT)
  - implement functionallity to sign in
  - implement functionallity to create new users
  - Set up the different routes
  - Connect boilerplate code to the database
  - Create schemas for the database
  - Set up database
  - Create boilerplate code