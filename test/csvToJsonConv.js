const assert = require('assert')
const path = require('path')
const fs = require('fs')
const csvConv = require('../csvToJsonConv')

var convObj = new csvConv()
it('Should return error on passing invalid file path', function(done) {
  convObj.convFromCSVFile(path.join(__dirname,'noSuchFileExists.csv'), function(err) {
      if (err) {
        done()
      } else {
        done(err)
      }
  });
})

it('Should return error on passing file with invalid ext', function(done) {
  convObj.convFromCSVFile(path.join(__dirname,'fileWithNonCSVExt.csv'), function(err) {
    if (err) {
      assert.equal(err.message, "Invalid extension. Only CSV files should be uploaded")
      done()
    }
  })
})

it('Should not return error on passing valid file path', function(done) {
  convObj.convFromCSVFile(path.join(__dirname,'test.csv'), function(err) {
    if (err) {
      done(err)
    } else {
      done()
    }
  })
})

it('Should convert data in CSV to JSON', function(done) {
  convObj.convFromCSVFile(path.join(__dirname,'test.csv'), function(err) {
    if (err) {
      done(err)
    } else {
      var data = require('fs').readFileSync('test.txt')
      assert.deepEqual(JSON.parse(data), [{'title1':'hai','title2':'hello'},{'title1':'edx','title2':'rocks'}])
      done()
    }
  })
})
