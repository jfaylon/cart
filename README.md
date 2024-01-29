
# Cart Frontend

A NextJS application for retrieving products from fakestoreapi.com and creation of a shopping cart. This is in tandem with https://github.com/jfaylon/cart-backend

## Prerequisites

- Node v18.17.1
- NextJS 14.1.0
- Usage of 127.0.0.1 instead of localhost.
- Running the cart-backend

## Installation

- Clone the repository and perform

```
npm install
```

- Add the ENVs to a `.env` file or copy the `.env.example` file

```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

## Running the Application

- Running in development mode 

```
npm run dev
```

- Running in production mode
```
npm run build && npm run start
```

The page is accessible by using `http://127.0.0.1:3000`

## Unit Tests
```bash
# unit tests
$ npm run test
```

## Pages
- List of products
- Product details
- Cart page


## Tech limitations, Assumptions
- NextJS was used because create-react-app is deprecated and it was recommended in react.dev (Source: https://react.dev/learn/start-a-new-react-project and https://dev.to/ag2byte/create-react-app-is-officially-dead-h7o)
- There are known issues for Server side rendering for handling sessions. Thus, some components are Client components.
- Node v18.17.1 and NextJS 14.1.0 were used in developing the application. There is no guarantee that it will work for versions other than the ones mentioned.
- Please use `127.0.0.1` instead of localhost for the creation of the cookie. It is a known issue that the cookie is not created when using `localhost`.
- The default port is 3000. There are no changes in port as the workaround for setting the port is hard coded in the package.json. Ideally the port should be modifiable via environment variables.
- For state management, Props drilling was used because of the nature of the components. The components are not complex enough to merit a Context API or Redux. In line with this, if the use cases permit, the application can be refactored to use either Context API or Redux.

## Possible Improvements
- Better error handling
- Better error logging
- Integration tests
- Better `cors` handling for cookies
- Assets for logos, icons and other UI components.
- Search product functionality
- Localisation (prices, and language)