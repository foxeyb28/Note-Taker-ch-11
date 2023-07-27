const express = require('express');

const path = require('path');

const fs = require ("fs")

const PORT = 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// get route at /api/notes
app.get('/api/notes', (req, res) => {

    const notes = require('./db/db.json');
    // return the data in db.json
    res.json(notes);

}
);

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    //add to db.json

    //return nre note to client

    //give each noteb unique id

    //res.json(`${req.method}`)
    // res.end()
    const notes = fs.readFileSync("./db/db.json");
    let notesObject= JSON.parse(notes);
    notesObject.push(req.body)
    fs.writeFile("db.json", JSON.stringify(notesObject), (err) => {
        // Error checking
        if (err) throw err;
        // console.log("New data added");
      });
    console.log(notesObject)
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);

