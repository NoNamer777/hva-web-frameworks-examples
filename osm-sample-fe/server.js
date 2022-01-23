const express = require('express');

const app = express();

app.use(express.static('./dist/osm-sample-fe'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/osm-sample-fe'});
});

app.listen(process.env.PORT || 8080);
