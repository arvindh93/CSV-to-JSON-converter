# edX - Node JS - Mod 1
## CsvToJsonConverter

### Usage
```
const path = require('path')
const fs = require('fs')
const CsvConv = require('./csvToJsonConv')

var convObj = new CsvConv()

convObj.convFromCSVFile(path.join(__dirname,'files','customer-data.csv'), (err) => {
  if (err) {
    console.log("Error in converting CSV to JSON - " + err.message)
  }
})
```

### Sample Execution
```
npm handle.js
```

### Running test
Install `mocha` module for testing.
```
mocha
```
