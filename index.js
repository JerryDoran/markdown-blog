const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const router = require('./routes/articles');
const app = express();

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Set the view engine
app.set('view engine', 'ejs');

// Every single route that is created will be at the end of '/articles'
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: 'desc'
  });
  res.render('articles/index', { articles: articles });
});

const PORT = process.env.PORT || 3000;

app.use('/articles', router);

app.listen(PORT, () => `Server started on port ${PORT}`);
