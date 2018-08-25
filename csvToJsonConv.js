const fs = require('fs')
const path = require('path')

class Converter {
  convFromCSVFile(filepath, callback) {
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err) {
          callback(err)
      } else {
        if (path.extname(filepath) !== '.csv') {
          callback(new Error("Invalid extension. Only CSV files should be uploaded"))
        }
        let data = '';
        fs.readFile(filepath, 'utf8', (err, data) => {
          if (err) {
            console.log("Error in reading file...")
          } else {
            //console.log(data)
            data = this.convStrToJson(data, (err, data) => {
              if (err) {
                console.log("Error in converting string to json" + err)
              } else {
                var resultFileName = path.basename(filepath).split('.')[0];
                var resultFileDir = path.dirname(filepath);
                fs.writeFileSync(path.join(resultFileDir,resultFileName + '.txt'), JSON.stringify(data, null, 2))
                callback(null);
              }
            });
          }
        });
      }
    })
  }

  convStrToJson(data, callback) {
    let result = [];
    var dataSplit = data.split('\n')
    //var headers = dataSplit[0];
    var headers = ('' + dataSplit.splice(0,1)).split(',')
    //console.log(dataSplit);
    for (var i =0; i < dataSplit.length; i++) {
      if ((dataSplit[i] !== "") && (typeof dataSplit[i] != 'undefined'))  {
        var rowSplit = ('' + dataSplit[i]).split(',');
        let row = {};
        for (var j = 0; j < rowSplit.length; j++) {
            row[headers[j]] = rowSplit[j]
        }
        result.push(row);
      }
    }
    callback(null, result);
  }
}

module.exports = Converter
