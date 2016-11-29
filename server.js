const express = require('express');
const app = express();

const path = require('path'); // mostly: path.join()
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const sequelizeConnection = require('./db'); // making a new sequelize connection to the database

const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888
app.listen('8888', () => console.log('Listening on port 8888'));

//serve all of the HTML views, which we'll eventually use to build a simple user interface
app.get('/view/all-songs', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-songs.html'))});
app.get('/view/all-artists', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-artists.html'))});
app.get('/view/artists-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/artists-search.html'))});
app.get('/view/youtube-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/youtube-search.html'))});

//////////
// YOUR CODE HERE: API ENDPOINTS
//////////

// no express router at this point
// simple api routes:
// 
// 1. /api/songs GET all songs
app.get('/api/songs', (req, res) => {
	Song.findAll(  // no argument: find all
		// {
		// 	where: {
		// 		title:
		// 	}
		// }
	)
	.then( data => {
		console.log(data);
		res.send(data);
	} )
})

// 2. /api/songs/id/:id GET specific song by id
app.get('/api/songs/id/:id', (req, res) => {
  Song.findById(req.params.id)
  .then( song => res.send(song)
  )
});

// 3. /api/songs/name/:name GET specific song by name
app.get("/api/songs/name/:name", (req, res) => {
	Song.findOne( {where: {title: req.params.name} } )
	.then( title => res.send(title) )
})

// 4. /api/songs/sort/by-date GET all songs and order by date created
