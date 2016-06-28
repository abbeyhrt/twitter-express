const express = require('express');
const faker = require('faker');

const server = express();

const tweets = [];

for (let i = 0; i < 20; i++) {
  tweets[i] = {
    body: faker.lorem.sentences(),
    author: {
      username: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      email: faker.internet.email()
    }
  };
}



server.get('/', function (req, res){
    res.json(tweets);
} )

server.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});
