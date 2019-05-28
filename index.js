// implement your API here

const express = require('express');
const server = express();

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
    const user = req.body;

    db.insert(user)
        .then(user => {
            res.status(201).json({ created: true, user });
        })
        .catch(err => {
            res.status(400).json({ created: false, err });
        })
});



server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
