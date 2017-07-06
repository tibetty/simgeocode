simgeocode
==========

A simple geo coder (from name to address/coordinates) for node.js, which is very useful when obtain massive geo coordinates in a batch
## Installation

```
npm install simgeocode
```

## Usage
```javascript
const simGeocode = require('simgeocode');

// "address" argument can be either the address in string, or an options object (for advanced user only) for request, e.g.
//  let address = {
//      url: 'http://maps.googleapis.com/maps/api/geocode/json',
//      qs: {
//          address: 'LvBiaoZhen',
//          language: 'cn'
//      }
//      headers: {
//          'User-Agent': 'triple agent for KGB, CIA & MI6'
//      }
//  }
simGeocode(address, lang)
    .then(result => {
        // result is an object parsed from the json data returned from google map geocode/geodecode service
        // for more information, please visit https://developers.google.com/maps/documentation/geocoding/intro
        // below 2 fields are for backward compatibility purpose only, not recommended: 
        // 1. address is the shorthanded formatted_address of results[0]
        // 2. coordinate is the arrary of lat and lng, digested from results[0]
        // your business logic here
    }).catch(err => {
        // your error processing code
    });
```


Credits
---------------

This geocoder depends on the following Node.JS modules:
* [request]
