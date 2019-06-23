var csv = require('csv');
var obj = csv();
var stringify = require('csv-stringify');
var fs = require('fs');
var async = require('async');

async.waterfall([
    function processFile(callback){
        obj.from.path('./public/HyperparameterVSCount.csv').to.array(function (fileData) {

            var data = [];
            var columnArr = [];
            var rowArr = [];

            columnArr.push('alpha');

            // console.log(fileData.length);

            for(var i=0;i<56;i++){
                columnArr.push(i)
            }
            data.push(columnArr)

            for (var i = 0; i < fileData.length; i ++) {
                rowArr = [];
                for(var j=0; j<56; j++){
                    if(j < fileData[i].length){
                        var tmp = fileData[i][j];
                        if(j == 0){
                            if(tmp.length > 5)
                            tmp = tmp.substring(0,5);
                        }
                        rowArr.push(tmp);
                    }
                    else
                    rowArr.push('0');
                }
                data.push(rowArr);
            }

            // Creating the actual predicted row
            rowArr = []
            rowArr.push('actual');
            newArr = [26441,2025,576,276,132,123,68,51,32,36,17,16,17,16,53,6,7,7,5,6,6,6,5,3,4,2,2,2,19,6,3,1,1,1,1,0,3,2,2,1,0,0,2,9,3,0,0,2,3,0,0,1,0,0,0,0];

            for(var i=0;i<newArr.length; i++){
                rowArr.push(newArr[i]);
            }
            data.push(rowArr);

            callback(null, data);
        });
    },
    function writeIntoFile(writeData, callback){
        stringify(writeData, (err, output) => {
          if (err) throw err;
        //   console.log(output);
          fs.writeFile('./public/my.csv', output, (err) => {
            if (err) throw err;
            console.log('my.csv file is Saved');
          });
        });

        callback(null, null);
    }
], function(error){
    if(error)
    console.log(error);
});
