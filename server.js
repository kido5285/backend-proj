// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const day = (numDay) => {
  switch(numDay){
    case 0:
      return "Sun";
      break;
    case 1: 
      return "Mon";
      break;
    case 2: 
      return "Tue";
      break;
    case 3:
      return "Wed";
      break;
    case 4:
      return "Thur";
      break;
    case 5:
      return "Fri";
      break;
    case 6:
      return "Sat";
      break;
  }
}

const month = (numMonth) => {
  switch(numMonth){
    case 0:
      return "Jan";
      break;
    case 1:
      return "Feb";
      break;
    case 2:
      return "Mar";
      break;
    case 3:
      return "Apr";
      break;
    case 4:
      return "May";
      break;
    case 5:
      return "June";
      break;
    case 6:
      return "July";
      break;
    case 7:
      return "Aug";
      break;
    case 8:
      return "Sept";
      break;
    case 9:
      return "Oct";
      break;
    case 10:
      return "Nov";
      break;
    case 11:
      return "Dec";
      break;
  }
}

const addZero = (num) => {
  return num < 10 ? "0" + num : num; 
}

const checkIfMili = (num) => {
  let reg = /^\d+$/
  if(reg.test(num)){
    return Number(num);
  } else {
    return num;
  }
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/?", function (req, res) {
  let date = new Date();
  res.json({unix: Date.now(), "utc": `${addZero(day(date.getDay()))}, ${addZero(date.getDate())} ${addZero(month(date.getMonth()))} ${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())} GMT`});
});

app.get("/api/:date?", (req, res) => {
  let date = new Date(checkIfMili(req.params.date));
  if(!isNaN(date.getTime())){
    res.json({d: date, unix: + new Date(checkIfMili(req.params.date)), utc: `${addZero(day(date.getDay()))}, ${addZero(date.getDate())} ${addZero(month(date.getMonth()))} ${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())} GMT`});  
  } else {
    res.json({error : "Invalid Date"});
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
