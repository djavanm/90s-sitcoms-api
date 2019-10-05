const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.json());
app.set('port', process.env.PORT || 3000)


app.get('/', (req, res)=> {
  res.send('<p>Now, this is a story all about how</p>'
  + '<p>My life got flipped-turned upside down</p>'
  + '<p>And I\'d like to take a minute Just sit right there</p>'
  + '<p>I\'ll tell you how I became the prince of a town called Bel Air...</p>');
});

app.get('/api/v1/sitcoms', (request, response) => {
  database('sitcoms').select()
  .then((sitcoms) => {
    response.status(200).json(sitcoms);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/sitcoms/:id', (request, response) => {
  const sitcomId = parseInt(request.params.id);
  database('sitcoms')
    .where('id', sitcomId)
    .then((data) => response.status(201).json({sitcom: data[0]}))
});

app.get('/api/v1/castMembers/:id', (request, response) => {
  const castId = parseInt(request.params.id);
  database('cast_members')
    .where('id', castId)
    .then((data) => response.status(201).json({castMember: data[0]}))
});

app.get('/api/v1/castMembers', (request, response) => {
  database('cast_members').select()
    .then((castMembers) => {
      response.status(200).json(castMembers);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`App is listening on port ${app.get('port')}`);
});