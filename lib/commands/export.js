"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stream = require("stream");

var _unzipper = _interopRequireDefault(require("unzipper"));

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  handleArguments
} = require("../globalFlags");

const main = async () => {
  const {
    agent,
    path,
    parent
  } = await handleArguments(_commander.default); // Make Request

  const [operation] = await agent.exportAgent({
    parent
  });
  const [response] = await operation.promise();

  const unzipper = _unzipper.default.Extract({
    path
  });

  const bufferStream = new _stream.PassThrough();
  bufferStream.end(response.agentContent);
  bufferStream.pipe(unzipper);
};

const attachCommand = program => {
  program.command("export [output]").description("Exports the dialogflow agent to the specified path.").action(() => {
    main();
  });
};

var _default = attachCommand;
exports.default = _default;