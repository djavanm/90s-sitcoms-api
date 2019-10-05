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

app.post('/api/v1/sitcoms', (request, response) => {
  const sitcom = request.body;
  const { title, seasons, episodes, premiere_date, finale_date } = sitcom;
  for (let requiredKey of ['title', 'seasons', 'episodes', 'premiere_date', 'finale_date']) {
    if(!sitcom[requiredKey]) {
      return response.status(404).send({error: `You are missing a required value for ${requiredKey}`})
    }
  }
  database('sitcoms').insert({title, seasons, episodes, premiere_date, finale_date}, 'id')
    .then(id => response.status(201).json({id: id}))
    .catch(error => response.status(500).json({ error }))
});

app.get('/api/v1/sitcoms/:id', (request, response) => {
  const sitcomId = parseInt(request.params.id);
  database('sitcoms')
    .where('id', sitcomId)
    .then((query) => {
      if(!query.length) {
        return response.status(404).json({error: 'Data does not exist.'})
      } else {
        return query[0];
      }
    })
    .then(sitcom => {
      database('cast_members')
      .where('sitcom_id', sitcomId)
      .then(cast => response.status(201).json({sitcom: sitcom, cast: cast}))
    });
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

app.post('/api/v1/castMembers', (request, response) => {
  const castMember = request.body;
  const { name, character, original, sitcom_id} = castMember;
  for (let requiredKey of ['name', 'character', 'original', 'sitcom_id']) {
    if(!castMember[requiredKey]) {
      return response.status(404).send({error: `You are missing a required value for ${requiredKey}`})
    }
  }
  database('cast_members').insert({name, character, original, sitcom_id}, 'id')
    .then(id => response.status(201).json({id: id}))
    .catch(error => response.status(500).json({ error }))
});


app.get('/api/v1/castMembers/:id', (request, response) => {
  const castId = parseInt(request.params.id);
  database('cast_members')
    .where('id', castId)
    .then((data) => {
      if(data.length) {
        return response.status(201).json({castMember: data[0]})
      } else {
        return response.status(404).json({error: 'Data does not exist.'})
      }
    });
});


app.listen(app.get('port'), () => {
  console.log(`App is listening on port ${app.get('port')}`);
});