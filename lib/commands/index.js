"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCommands = void 0;

var _import = _interopRequireDefault(require("./import"));

var _export = _interopRequireDefault(require("./export"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commands = [_import.default, _export.default];

const registerCommands = program => commands.forEach(registerCommand => registerCommand(program));

exports.registerCommands = registerCommands;