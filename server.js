import express from 'express';
import compression from 'compression';

// Initialize express
const app = express();

// Initialize port
const PORT = 3000;

// Compress files
app.use(compression());

// Serve up static files
app.use(express.static(`${process.cwd()}/assets`));

const handlebars = require('express-handlebars');

app.set('port', (process.env.PORT || 3000));
app.set('view cache', true);
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`You are listening to port ${PORT}`);
});
