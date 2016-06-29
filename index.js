const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const server = express();

const tweets = [];

for (let i = 0; i < 20; i++) {
  tweets[i] = {
    id: `${i + 1}`,
    body: faker.lorem.sentences(),
    author: {
      username: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      email: faker.internet.email()
    }
  };
}
//Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride('_method'));

//Templating

server.engine('.hbs', hbs ({
  defaultLayout: 'main',
  extname: '.hbs',
}));
server.set('view engine', '.hbs');


server.get('/tweets', function (req, res){
  res.json(tweets);
});



//restful API
// GET /tweets -> get all the tweets
// tweets/1 => get all the tweets with an id of 1

server.get('/tweets/new', (req, res) =>{
  res.sendFile(path.resolve(__dirname, 'views/tweets.new.html'));
});


server.get('/tweets/:id', function (req, res){
    const { id } = req.params;

    const tweet = findTweetById(id)

    if (tweet) {
      res.json(tweet)
    } else {
      res.status(404).json({
        message: `Tweet not found with id: ${id}`
      });
    }
});

// post a NEW tweet

server.post('/tweets', (req, res) => {



console.log(req.body)
res.redirect('/tweets');


const { body } = req.body;
const createTweet = (body) => ({
  id: faker.random.uuid(),
  body,
  author: {
    username: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email()
  }
});

const newTweet = createTweet(body);

tweets.push(newTweet);
//
//  res.redirect(`/tweets/${newTweet.id}`)
res.redirect('/tweets');

});


// GET tweets/new -> display a form for making a new tweet
// POST /tweets with {tweets} -> display a form for posting tweets


// type TweetType= {
//   id: string,
//   body: string,
//   author: AuthorType;
// }
//
// //findTweetById(id: string): false | TweetType

function findTweetById(id) {
  const tweet = tweets.filter( function(tweet) {
    if(tweet.id === id) {
      return true
    }
      return false
  });

if (!tweet[0]) {
  return false;
}

  return tweet[0];
}

//EDIT a tweet
server.get('/tweets/:id/edit', (req, res) => {
 const { id } = req.params;
 const tweet = findTweetById(id)

 res.render('tweets/edit', { tweet });
});
// GET tweets/edit -> display a form for editing a tweet



// PUT tweets/1 with {tweet} edit a tweet with a body
server.put('/tweets/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  res.redirect(`/tweets/${id}`);
});

// DELETE /tweets/1 -> delete a tweet



server.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});
