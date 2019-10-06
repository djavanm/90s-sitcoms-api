const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.json());
app.set('port', process.env.PORT || 3000)

// ENDPOINT FOR MAIN SITE - RESPONSE CONTAINS LYRICS FROM THE 90S HIT FRESH PRINCE OF BEL-AIR
app.get('/', (req, res)=> {
  res.send('<p>Now, this is a story all about how</p>'
  + '<p>My life got flipped-turned upside down</p>'
  + '<p>And I\'d like to take a minute Just sit right there</p>'
  + '<p>I\'ll tell you how I became the prince of a town called Bel Air...</p>');
});

// ENDPOINT THAT RETRIEVES DATA FOR ALL SITCOMS
app.get('/api/v1/sitcoms', (request, response) => {
  // KNEX DATABASE QUERY -  EX: SELECT * FROM sitcoms;
  database('sitcoms').select()
  .then((sitcoms) => {
    response.status(200).json(sitcoms);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

// ENDPOINT TO POST A NEW SITCOM
app.post('/api/v1/sitcoms', (request, response) => {
  // CREATES SITCOM OBJECT - USED IN LINE 36 FOR ERROR HANDLING
  const sitcom = request.body;
  // DESTRUCTURE SITCOM OBJECT FOR DATABASE INSERTION ON LINE 42
  const { title, seasons, episodes, premiere_date, finale_date } = sitcom;
  for (let requiredKey of ['title', 'seasons', 'episodes', 'premiere_date', 'finale_date']) {
    if(!sitcom[requiredKey]) {
      return response.status(422).send({error: `Entity missing a required value for ${requiredKey}`})
    }
  }
  // INSERT NEW OBJECT IN TO DATABASE - ONLY USING THE KEYS NEEDED FOR EACH TABLE COL
  database('sitcoms').insert({title, seasons, episodes, premiere_date, finale_date}, 'id')
    .then(id => response.status(201).json({id: id}))
    .catch(error => response.status(500).json({ error }))
  // SUCCESS RESPONSE CONTAINS ID FROM LINE 42 KNEX FUNCTION // ERROR IF UNABLE TO POST TO DATABASE
});

// ENDPOINT TO GET A SPECIFIC SITCOM BY ID
app.get('/api/v1/sitcoms/:id', (request, response) => {
  // PULL SITCOM ID FROM REQ, MAY NOT NEED TO PARSE INT HERE BUT YOLO
  const sitcomId = parseInt(request.params.id);
  database('sitcoms')
    .where('id', sitcomId)
    .then((query) => {
      // CHECK TO SEE IF QUERY RETURNED MY OBJECT TO DETERMINE WHAT KIND OF RESPONSE
      if(!query.length) {
        // RESPONSE IF THE OBJECT IS NOT FOUND
        return response.status(404).json({error: 'Data does not exist.'})
      } else {
        // QUERY RETURNS AN ARRAY BUT I AM NOT A MONSTER AND SIMPLY RETURN ONE OBJECT #thisisnotSWAPI
        return query[0];
      }
    })
    .then(sitcom => {
      // GRABBED THE SITCOM WE WANT, BUT WE AINT DONE YET...
      database('cast_members')
      .where('sitcom_id', sitcomId)
      .then(cast => response.status(201).json({sitcom: sitcom, cast: cast}))
      // CREATED AN ARRAY OF ALL THE CAST MEMBERS WITHIN THE SUCCESSFULLY QUERY FOR THAT SITCOM
      // DO NOT NEED AN ERROR HERE SINCE THE ARRAY WILL BE EMPTY IF NO CAST MEMBERS ARE PRESENT 
      // WITHIN THE DATABASE... 
    });
});
// ENDPOINT TO GET ALL CAST MEMBERS
app.get('/api/v1/castMembers', (request, response) => {
  // KNEX DATABASE QUERY -  EX: SELECT * FROM cast_members;
  database('cast_members').select()
    .then((castMembers) => {
      response.status(200).json(castMembers);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/castMembers', (request, response) => {
  // CREATES AN OBJECT FROM REQUEST BODY, USED IN LINE 91 TO CHECK EACH KEY
  const castMember = request.body;
  // DESCTRUCTURE EACH KEY FOR DATABASE INSERTION ON LINE 96
  const { name, character, original, sitcom_id} = castMember;
  // FANCY FOR LOOP TO CHECK EACH KEY ON THE CASTMEMBER OBJECT
  for (let requiredKey of ['name', 'character', 'original', 'sitcom_id']) {
    if(!castMember[requiredKey]) {
      return response.status(422).send({error: `Entity missing a required value for ${requiredKey}`})
    }
  }
  // INSERT NEW CAST MEMBER OBJECT - BUT ONLY WITH THE KEYS NECESSARY FOR EACH COL IN DATABASE
  database('cast_members').insert({name, character, original, sitcom_id}, 'id')
    .then(id => response.status(201).json({id: id}))
    .catch(error => response.status(500).json({ error }))
});

// DYNAMIC ENDPOINT TO FIND A SPECIFIC CAST MEMBER
app.get('/api/v1/castMembers/:id', (request, response) => {
  // THERE I GO AGAIN WITH THAT PARSE INT...
  const castId = parseInt(request.params.id);
  database('cast_members')
    .where('id', castId)
    .then((data) => {
      if(data.length) {
        // IF QUERY RETURNS AN ARRAY, I SEND THE FIRST OBJECT FROM THAT QUERY
        return response.status(201).json({castMember: data[0]})
      } else {
        // IF THE QUERY RETURNS AN EMPTY ARRAY, 404 FOR YOU
        return response.status(404).json({error: 'Data does not exist.'})
      }
    });
});
// DYNAMIC ENDPOINT FOR DELETING
app.delete('/api/v1/castMembers/:id', (request, response) => {
  // INTEGERS INTEGERS INTEGERS...
  const castId = parseInt(request.params.id);
  database('cast_members')
    .where('id', castId)
    .then(data => {
      if(data.length) {
        // IF THE DATA EXISTS, THEN WE DELETE.
        database('cast_members').where('id', castId).delete()
          .then(() => response.status(201).json("Deleted"))
      } else {
        // IF THE DATA DOES NOT EXIST, WE SEND AN ERROR.
        return response.status(404).json({error: "This cast member does not exist."})
      }
    });
});
// APPARENTLY THIS GOES AT THE BOTTOM, HAVE A NICE WEEK <3
app.listen(app.get('port'), () => {
  console.log(`App is listening on port ${app.get('port')}`);
});