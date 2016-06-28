const express = require('express');
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

server.get('/tweets', function (req, res){
  res.json(tweets);
});

//restful API
// GET /tweets -> get all the tweets
// tweets/1 => get all the tweets with an id of 1

server.get('/tweets/:id', function (req, res){
    const { id } = req.params;

    const tweet = tweets.filter(function (tweet) {
      if (tweet.id === id) {
        return true
      }

      return false
    });

res.json(tweet[0]);

});

// GET tweets/new -> display a form for making a new tweet
// POST /tweets with {tweets} -> display a form for posting tweets
// GET tweets/edit -> display a form for editing a tweet
// PUT tweets/1 with {tweet} edit a tweet with a body
// DELETE /tweets/1 -> delete a tweet



server.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});
