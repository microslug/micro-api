'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('winston'),
    createLogger = _require.createLogger,
    format = _require.format,
    transports = _require.transports;

var logger = exports.logger = createLogger({
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()]
});
//# sourceMappingURL=logger.js.map