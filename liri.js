require("dotenv").config();

const axios = require("axios");

let command = process.argv[2];

let nodeArgs = process.argv;

let userChoice = "";

for (let i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    userChoice = userChoice + "+" + nodeArgs[i];
  } else {
    userChoice += nodeArgs[i];

  }
}

function checkCommand() {

  if (command === "concert-this") {
    getConcertInfo();
  } else if (command === "spotify-this-song") {
    getSpotifyInfo();
  } else if (command === "movie-this") {
    getMovieInfo();
  } else if (command === "do-what-it-says") {
    getTextFile();
  } else {
    console.log("Please enter a valid command.")
  }

}

checkCommand();

function getConcertInfo() {
  const moment = require('moment')
  let artist = userChoice;
  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  axios.get(queryURL).then(
    function (response) {
      console.log(response);
      data = response.data

      console.log()

      for (i = 0; i < 5; i++) {
        console.log("Artist: " + data[0].artist.name + "\nVenue: " + data[i].venue.name +
          ", " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country +
          "\nDate of the Event: " + moment(data[i].datetime).format('MM DD YYYY'))
          console.log("\n---------\n");
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

function getSpotifyInfo() {
  let song = userChoice;
  console.log(userChoice)
  console.log(typeof userChoice);
  const SpotifyWebApi = require('node-spotify-api');
  const keys = require("./keys.js");
  console.log("keys: " + JSON.stringify(keys));
  let spotify = new SpotifyWebApi({
    id: keys.spotify.id,
    secret: keys.spotify.secret

  })

  spotify.search({ type: "track", query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("made it here")
    console.log(data.tracks.items);
  });
}

function getMovieInfo() {
  const axios = require("axios");
  let movie = userChoice;
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function (data) {
      var data = data.data;
      console.log("\n-------------\n")
      console.log("Title: " + data.Title + "\nRelease Year: " + data.Year +
        "\nIMDB Rating: " + data.imdbRating + "\nRotten Tomatoes Rating: " + data.Ratings[1].Value + "\nCountry: " +
        data.Country + "\nLanguage: " + data.Language + "\nPlot: " + data.Plot + "\nActors: " + data.Actors);
      console.log("\n-------------\n")
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function getTextFile() {

  const fs = require("fs");
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);
    // Then split it by commas (to make it more readable)
    let dataArr = data.split(", ");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    if (dataArr.length === 2) {
      command = dataArr[0];
      userChoice = dataArr[1];
      checkCommand();
    } else (
      console.log("Check text format in random.txt. Format should be --- command, 'searchTerm'.")
    )
  })

}