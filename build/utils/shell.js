'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shell = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var shell = exports.shell = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cmd) {
        var _ref2, stdout, stderr;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return exec(cmd);

                    case 3:
                        _ref2 = _context.sent;
                        stdout = _ref2.stdout;
                        stderr = _ref2.stderr;

                        if (stderr) {
                            _context.next = 10;
                            break;
                        }

                        return _context.abrupt('return', stdout);

                    case 10:
                        return _context.abrupt('return', stderr);

                    case 11:
                        _context.next = 16;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', 'Error: Command ' + cmd + ' failed');

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 13]]);
    }));

    return function shell(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = _util2.default.promisify(require('child_process').exec);
//# sourceMappingURL=shell.js.map