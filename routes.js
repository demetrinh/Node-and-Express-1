"use strict";
//imports (require) the express library that was downloaded via npm
const express = require("express");

//router is what controls all of the routes/endpoints that the API can handle
const routes = express.Router();

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    year: 2019,
    animated: false,
  },
  {
    id: 2,
    title: "Avatar",
    year: 2009,
    animated: false,
  },
  {
    id: 3,
    title: "The Lion King",
    year: 1994,
    animated: true,
  },
  {
    id: 4,
    title: "Up",
    year: 2010,
    animated: true,
  },
];
let nextId = 5;

//GET /movies - respond with a JSON array of movies

routes.get("/movies", (req, res) => {
  const minYear = parseInt(req.query.minYear);
  if (minYear) {
    const filteredMovies = movies.filter((movie) => movie.year >= minYear);
    res.json(filteredMovies);
  } else {
    res.json(movies);
  }
  res.json(movies);
});

//GET /movies/:id - respond with a JSON movie or with a 404 string (res.send) and status code.

routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    //res.send will send back a string as a response
    res.send(`404 Not found - No movie with id ${id} exists.`);
  }
});

//POST /movies - add a movie to the JSON array

routes.post("/movies", (req, res) => {
  //to add a movie, you need the data that is in the body of the request, req.body will request the data
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
  console.log("Running");
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  //res.send() or res.json is required, there has to be a response from server to client
  res.send();
  console.log("finished");
});

//exports routes for use in server.js using the (module.exports)
module.exports = routes;
