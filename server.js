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
// simple api routes: NOTE: NEED "/" in front of "api/...""
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

app.get("/api/songs/sort/by-date", (req, res) => {
	Song.findAll({
		order: [ // takes an array of items to order the query by
			["createdAt", "DESC"]
		]
	})
	.then( songs => res.send(songs) )
})

// 5. api/songs/sort/a-z GET all songs sorted alphabetically by title
app.get("/api/songs/sort/a-z", (req, res) => {
	Song.findAll({
		order: [ // takes an array of items to order the query by
			["title", "ASC"] // "ASC" optional/default
		]
	})
	.then( songs => res.send(songs) )
})

// 6. api/songs/count GET the count of the number of songs in the database
app.get("/api/songs/count", (req, res) => {
	Song.count()
	.then( count => res.send("There are " + count + " entries in the songs table")
	)
})

// 7. api/songs/first-five GET the first five songs, ordered by date created. You should return exactly five songs.
app.get("/api/songs/first-five", (req, res) => {
	Song.findAll({
		limit: 5,
		order: [ ["createdAt", "DESC"] ]
	})
	.then( firstFive => res.send(firstFive) )
})
