// implement your API here

const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

// | Method | URL            | Description                                                                                                                       |
// | ------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                                              |
// | GET    | /api/users     | Returns an array of all the user objects contained in the database.                                                               |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                                                  |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                                            |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |

// When the client makes a `POST` request to `/api/users`:
// using the insert function in db.js

// - If the request body is missing the `name` or `bio` property:
//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

// - If the information about the _user_ is valid:

//   - save the new _user_ to the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _user document_.

// - If there's an error while saving the _user_:
//   - cancel the request.
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ error: "There was an error while saving the user to the database" }`.

server.post('/api/users', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;

    if (!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user." });
        return;
    }

    db.insert({
        name,
        bio
    })
        .then(user => {
            console.log(user);
            res.status(201).json({user});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        })
});

// When the client makes a `GET` request to `/api/users`:

// - If there's an error in retrieving the _users_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The users information could not be retrieved." }`.

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).json({error: "The users information could not be retrieved.", err })
    });
});

// When the client makes a `GET` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If there's an error in retrieving the _user_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The user information could not be retrieved." }`.

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
    .then(user => {
        if (user.length === 0) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        } else {
            res.json(user);
        }
    })
    .catch(err => {
        res.status(500).json({error: "The user information could not be retrieved."})
    });
});



server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
