const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');

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

server.use(bodyParser.json());

server.get('/tweets', function (req, res){
  res.json(tweets);
});

//restful API
// GET /tweets -> get all the tweets
// tweets/1 => get all the tweets with an id of 1

server.get('/tweets/:id', function (req, res){
    const { id } = req.params;

    const findTweetById = tweets.filter(function (tweet) {
      if (tweet.id === id) {
        return true
      }

      return false
    });

if (findTweetById.length > 0) {
  res.json(findTweetById[0]);
} else {
  res.status(404).json({
    message: `Tweet not found with id: ${id}`
  })

}


});

server.post('/tweets', (req, res) => {
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

 res.redirect(`/tweets/${newTweet.id}`)
});
// GET tweets/new -> display a form for making a new tweet
// POST /tweets with {tweets} -> display a form for posting tweets


// GET tweets/edit -> display a form for editing a tweet
// PUT tweets/1 with {tweet} edit a tweet with a body
// DELETE /tweets/1 -> delete a tweet



server.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});
