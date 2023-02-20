# Welcome to my Movie Review Application

## How to run in your browser

- npx create-react-app and copy/paste the code in there for the correct loaders or there will be errors

- this app is connected to a mongo db so, if you have mongodb and a select "connect to application", you will get a string and key to enter and save that in a .env file which then the app will create a DB for you in there

- the other env variables include a JWT secret which can be made personally and the JWT_Lifetime which is the amount of time until the token expires and you'd have to login again

- in the client, you must register for a MovieDB api key and stick that into an env file with the variable which must have the prefix REACT_APP, I have separate env variables for the movies and shows because they take a slightly different path,

```
https://api.themoviedb.org/3/search/tv?api_key=
https://api.themoviedb.org/3/search/movie?api_key=
```

-finally in the outermost folder, run npm start and concurrently should run the server and client and show up in your default browser

### What I'm Currently working on

- I am working on the stats page which should be complete within the week along with the search bar for the 'All Movies' and 'All Shows' Pages

### Questions?

- You can reach me at haydengarrett821@gmail.com
