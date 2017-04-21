//console.log('hi m working');
// Use require to use the predefined modules of node js and also to use the contents exported from the other folders


var express = require('express'),
  bodyParser = require('body-parser'),
  config = require('./config/config'),
  User = require('./models/user'),
  app = express();

config.connectDB();
// bodyParser is used to parse the body of the incoming request and exposes it on req.body

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(port) you can use localhost:port to access the response of the request
app.get('/', function (req, res) {
  res.status(200).sendFile(__dirname + '/client/index.html');
});
app.post('/newUser', function (req, res) {
  var data = req.body;
  console.log(data);
  var user = new User();
  user.name = data.name;
  user.pwd = data.pwd;// req.body.name
  user.email = data.email;
  user.mobile = data.mobile;
  user.save(function (err, doc) {
    if (err) {
      console.error(err);
    } else {
      console.log(doc);
      res.send(doc);
    }
  });
});

app.put('/login', function (req, res) {
  var data = req.body;
  console.log(typeof data.name);
  User.findOne({ name: data.name }, function (err, doc) {
    if (err) {
      res.send(err)
    } else if (doc) {
      if (doc.pwd == data.pwd) {
        //res.send('authenticated')
        // window.location="https://www.google.co.in/?gfe_rd=cr&ei=iCgcWMTPMfLI8AfsmJnQAw";
        //return  res.redirect('./login.html');
        res.status(200).sendFile(__dirname + '/client/login.html');

      } else {
        res.send('not authenticated')
                //res.status(200).sendFile(__dirname + '/client/login.html');

      }
    } else {
      res.send("User doesn't exist");
    }
  });
});

/*app.put('/login', function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            age: req.body.age
        }
    });
}) */

app.listen(3007);
console.log(' Connected and running on port 3007');
//app.get('/', function (req, res) {
  //res.send('Hello!');
//});

