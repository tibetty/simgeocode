simgeocode
==========

A simple promisified geocoder for node.js, which is very useful when you want to obtain massive geo coordinates in a batch
## Installation

```
npm install simgeocode
```

## Usage
```javascript
const simGeocode = require('simgeocode');

let address = "LvBiaoZhen", lang = 'zh-CN';
// "address" argument can be either the address in string, or an options object (for advanced users only) for request, e.g.
//  let address = {
//      url: 'http://maps.googleapis.com/maps/api/geocode/json',
//      qs: {
//          address: 'LvBiaoZhen',
//          language: 'zh-CN'
//      }
//      headers: {
//          'User-Agent': 'triple agent for KGB, CIA & MI6'
//      }
//  }
simGeocode(address, lang)
    .then(result => {
        // result is an object parsed from the json data returned from google map geocode/geodecode service
        // for more information, please visit https://developers.google.com/maps/documentation/geocoding/intro
        // below fields are reserved for backward compatibility purpose only, not recommended: 
        // 1. address is the shorthanded formatted_address of results[0]
        // 2. coordinate/coordinates refer to the same arrary comprise of lat & lng pairs, digested from results[0]
        // your business logic here
    }).catch(err => {
        // your error processing code
    });
```


Credits
---------------

This geocoder depends on the following Node.JS modules:
* [request]
