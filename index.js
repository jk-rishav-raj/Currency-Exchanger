const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const to = req.body.To;
  const amount = req.body.Amount;
  const from = req.body.From;
  const API_KEY = "eacc1e233ba83770eb9853ec57e72f6c";
  const url = "http://data.fixer.io/api/latest?access_key=" + API_KEY ;

  request(url, function(error, response, body) {
    
    if(error) {
        console.log(error);
        return ;
    }
    
    console.log(response.statusCode);

    const data = JSON.parse(body);

    console.log(data);
    
    const toRate = data.rates[to];
    const fromRate = data.rates[from];

    if(!toRate || !fromRate) {
        res.write("Invalid Currency");
        res.send();
        return ;
    }

    const exchangeAmount = amount * toRate / fromRate;

    res.write("<h1> " + amount + " " + from + " = " + exchangeAmount + " " + to + "</h1>");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server running at 3000");
});
