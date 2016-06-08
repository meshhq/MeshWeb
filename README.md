
# Mesh Web App
Web app for mesh.io

## Setup

```
$ npm install
```

## Running

Local Development
=================

In order to have the web app look toward `localhost:3000` for a mesh server, run:
```
$ npm run local
```

The web app will be available at `localhost:5000

Local Development (Facing Live Server)
======================================

To have the webapp face our hosted server, run
```
$ npm start
```

The web app will be available at `localhost:5000

## Deployment

To deploy the app to our dev instance, simply run

```
$ npm run deploy-dev
// http://dev.app.meshdata.io
```

To deploy the app to our prod instance, simply run

```
$ npm run deploy-prod
// http://app.meshdata.io
```

The app will be available shortly at our remote hosting site.

# Todo

## Users
-  As a user, I need a `User View` which allows me to see a table of my Mesh users.
-   As a user, I need a `User Detail View` which allows me to see all of the data on an individual user.
  - User resource data.
  - List memberships
  - Integrations in which the user resides

## Users Action Bar
- As a user, I need a `New` button which allows me to create a new record.
- As a user, I need a `Merge` button which allows me to merge multiple records.
- As a user, I need a `Delete` button which allows me to delete records.
- As a user, I need a `Publish` button which allows me to publish records to my integrations.
- As a user, I need an `Add To` button which allows me to add Users to Lists or Organizations.

## Organizations
- As a user, I need an `Organization View` which allows me to see a table of my Mesh organizations.
- As a user, I need am `Organization Detail View` which allows me to see all of the data on an individual organization.
  - Organization resource data
  - Users belonging to the organization
  - List memberships
  - Integrations in which the organization resides

## Organization Action Bar
- As a user, I need a `New` button which allows me to create a new record.
- As a user, I need a `Merge` button which allows me to merge multiple records.
- As a user, I need a `Delete` button which allows me to delete records.
- As a user, I need a `Publish` button which allows me to publish records to my integrations.

## Lists
- As a user, I need a `List View` which allows me to see a table of my Mesh lists.
- As a user, I need a `List Detail View` which allows me to see all of the data on an individual list.
  - List resource data
  - Items
  - Integrations in which the list resides

## Lists Action Bar
- As a user, I need a `New` button which allows me to create a new record.
- As a user, I need a `Delete` button which allows me to delete records.
- As a user, I need a `Publish` button which allows me to publish records to my integrations.

## Publication
- As a user, I need a `Publication View` which allows me to select all of the integrations to which I want to publish data.

## Activation
- As a user, I need all of my users sync'ed from my activated integration.
- As a user, I need all of my organizations sync'ed from my activated integration.
- As a user, I need all of my lists sync'ed from my activated integration.
- As a user, I need all of my organizations's users sync'ed from my activated integration.
- As a user, I need all of my list's users sync'ed from my activated integration.

## Uniqueness Constraints
- User - Email key only for Mesh origin users.
- Organization - Domain key only for Mesh origin organizations.
