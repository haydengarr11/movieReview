# Welcome to my Movie Review Application

## How to run in your browser

- npx create-react-app and copy/paste the code in there for the correct loaders or there will be errors

- this app is connected to a mongo db so, if you have mongodb and a select "connect to application", you will get a connection string and have to enter your mongodb password. Save that in an .env file on the top level with the variable named CONNECTION= and after the "/" and before the "?", create your database name. For example, mine is /MovieDB?... which then the app made a collection named MovieDB

- the other env variables include a JWT secret which can be made personally and the JWT_Lifetime which is the amount of time until the token expires and you'd have to login again. both of these environment variables are used in the User Model.

- in the client, you must register for a MovieDB api key and stick that into an env file in the client folder with the variable which must have the prefix REACT_APP, I have separate env variables for the movies and shows because they take a slightly different path,

```
REACT_APP_MOVIE_KEY=https://api.themoviedb.org/3/search/movie?api_key=<yourKey>language=en-US&
REACT_APP_SHOW_KEY=https://api.themoviedb.org/3/search/tv?api_key=<yourKey>language=en-US&
```

-finally in the outermost folder, run npm start and concurrently should run the server and client and show up in your default browser

### What I'm Currently working on

- I am working on the stats page which should be complete within the week along with the search bar for the 'All Movies' and 'All Shows' Pages

### Questions?

- You can reach me at haydengarrett821@gmail.com
