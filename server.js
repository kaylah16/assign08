const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

PORT=8080;

/////////////////////////////////////////////
// connect to db

let db;
(async () => {
	db = await open({
		filename: 'quotes.sqlite',
		driver: sqlite3.Database
	});
})();

/////////////////////////////////////////////
// express and middleware setup

app = express();

// encoding for form POSTs
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 	//added json middleware

// serve static files
app.use(express.static(path.join(__dirname, 'static')));

/////////////////////////////////////////////
// routes
app.get('/quotes', async (req, res) =>{	//get quotes from db
	/*const result = [ 	//did in class
		{name: 'stan', yes: 'no'},
		{name: 'sta', yes: 'mayhaps'},
		{name: 'stany', yes: 'yes'}
	]*/
	const getQuotes = await db.all('SELECT * FROM quotes')
	res.json(getQuotes); //js object
});

/*app.get('/quote_search', async (req,res) =>{	//test route
	const fakestring = "listen read"; 
	const separate = fakestring.split(" "); //split words into array
	const listen = separate[0]; //listen is on index 0
	const read = separate[1]; //read is on index 1

	// get id to separate quotes for easier reading
	const quotes = await db.all('SELECT id, text FROM quotes WHERE (text like ?) OR (text like ?)' ,[`%${listen}%`, `%${read}%`]);

	res.json(quotes); 
});*/

//in class
/*app.get('/test', async (req,res) =>{	//test route
	const query = 'worse book road';
	const terms = query.split(' ').map(word => `%${word}%`);
	const clauses = terms.map(e => ' (text like ?)').join(' OR ');
	
	/*terms = [];
	for(let word of query.split(' ')){
		terms.push(`%${word}%`);
	}*/
	
	//console.log(terms);

	//let sql = `SELECT * FROM quotes WHERE ${clauses}`
	/*for (let term of terms.slice(1)){
		sql += 'OR (text like ?)'
	}*/
	/*console.log(sql);
	const result  = await sb.all(sql, [terms])
	res.json(result); 
}); */

app.post('/quote_search', async (req,res) =>{	//test route -> change to post
	const quote = req.body.search;  //post body
	
	//const search = await db.all('SELECT * FROM quotes WHERE text like ?' ,[`%${quote}%`]);
	const terms = quote.split(' ').map(word => `%${word}%`);
	const clauses = terms.map(e => ' (text like ? )').join(' OR ');
	let sql = `SELECT * FROM quotes WHERE ${clauses}`;
	const search = await db.all(sql, terms);

	res.json(search); 
}); 

// followed in class
/* app.post('/add_quote', async (req, res) => {
	const result = await db.all('SELECT * FROM quotes')
	res.json(result);
}) */

	//done in class
	const fakedata = [
		{id: 7, label: "the seventh option"},
		{id: 8, label: "the eight option"},
		{id: 9, label: "the ninth option"}
	]
app.get('/select_data', async(req,res) => {
	//db call
	console.log("running");
	res.json(fakedata);
});

//get route to delete quote with id
app.get('/delete/:id', async(req,res) => {
	//get database to remove quote through id
	let id = req.params['id']; //similar to index from prev assign, but gets id instead
	const remove = await db.run('DELETE FROM quotes WHERE id = ?', [id]);
	res.json(remove);
});


/////////////////////////////////////////////
// start up server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
