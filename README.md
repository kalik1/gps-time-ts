# gps-time-ts

[![Downloads][downloads-image]][npm-url]

Small utility to convert times between GPS epoch (midnight January 6, 1980) and Unix epoch (midnight January 1, 1970), taking into account leap seconds.

It's not such a trivial matter as adding a constant number of leap seconds to all time inputs!  For any two times, a different number of leap seconds may have elapsed between them.  This utility helps figure out exactly how many have elapsed.

No dependencies!  Very small: 464 bytes gzipped.

Works on the client and on the server (in Node.js).

# Node.js installation
```bash
npm i --save gps-time
```

# Usage
AMD and CommonJS are supported, with a fallback that defines this utility at window.gpsTime

In Node, you can bring in this utility with this:

```typescript
import {toGPSMS, toUnixMS} from 'gps-time-ts';
```


## Converting from Unix time to GPS time.
```typescript
const unixMS = Date.now();  // 1454168480000
toGPSMS(unixMS);  // 1138203697000
```

## Converting from GPS time to Unix time.
```typescript
const gpsMS = 1138203697000;
toUnixMS(gpsMS);  // 1454168480000
```

# Tests
This comes with a small test suite which can be run like this:

```
$ npm install
$ npm test
```

# License
[Licenced under MIT](https://github.com/davidcalhoun/gps-time.js/blob/master/LICENSE)


[downloads-image]: https://img.shields.io/npm/dm/gps-time.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/gps-time-ts
