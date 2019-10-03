const express = require('express');
const app = express();

app.use(express.json());
app.set('port', 3000);

app.listen(app.get('port'), () => {
  console.log(`App is listening on port ${app.get('port')}`);
});

app.get('/', (req, res)=> {
  res.send('<p>Now, this is a story all about how</p>'
    + '<p>My life got flipped-turned upside down</p>'
    + '<p>And I\'d like to take a minute Just sit right there</p>'
    + '<p>I\'ll tell you how I became the prince of a town called Bel Air...</p>');
});
