simgeocode
==========

A simple geo coder (from name to address/coordinates) for node.js, which is very useful when obtain massive geo coordinates in a batch
## Installation

```
npm install simgeocode
```

## Usage
```javascript
simGeocode(<name of place>, 'en')
    .then(result => {
        // result.address is the detailed address of the matched result, and result.coordinate is self-explained
        // your code here
    }).catch(err => {
        // your error processing code
    });
```


Credits
---------------

The crawler depends on the following Node.JS modules:
* [Request]
