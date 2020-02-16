require("dotenv").config();

const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

const command = process.argv[2]

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
    let artist = procss.argv[3];
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};

function getSpotifyInfo() {
    let song = process.argv[3];
    let Spotify = require('node-spotify-api');

    let spotify = new Spotify({
        id: keys.id,
        secret: keys.secret
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
    var axios = require("axios");
    var movie = process.argv[3];
    axios.get("http://www.omdbapi.com/?t=" + movie + "s&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
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
}