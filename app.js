const express = require('express');
const app = express()
const d3 = require('d3-node')().d3;
const fs = require('fs');

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));



app.get('/',function(req,res){

	res.sendFile('merge.html',{root: __dirname })

})


port = 3000 || process.env.PORT ;

app.listen(port, function () {
  console.log('App listening on port ' +  port)
})
