require("dotenv").config();

var axios = require("axios");

const keys = require("./keys.js");

const command = process.argv[2];

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

function getConcertInfo() {

    let artist = process.argv[3];
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryURL).then(
        function(response) {
          console.log(response);
        })
        .catch(function(error) {
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
    let song = process.argv[3];
    const Spotify = require('node-spotify-api');
    const keys = require("./keys.js");

    let spotify = new Spotify({
         id: keys.spotify.id,
         secret: keys.spotify.secret
         
                });
            
                spotify
        .search({type: 'track', query: song })
        .then(function(response) {
                    console.log(response);
         })
  .catch(function(err) {
                    console.log(err);
              });}

function getMovieInfo() {
    const axios = require("axios");
    let movie = process.argv[3];
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
  function(data) {
      var data = data.data;
    console.log("\n-------------\n")
    console.log("Title: " + movie + "\nRelease Year: " + data.Year +
    "\nIMDB Rating: " + data.imdbRating + "\nRotten Tomatoes Rating: " + data.Ratings[1].Value + "\nCountry: " +
    data.Country + "\nLanguage: " + data.Language + "\nPlot: " + data.Plot + "\nActors: " + data.Actors);
    console.log("\n-------------\n")
}).catch(function(error) {
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
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(", ");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        dataArr[0] = command; 
      
      });


}