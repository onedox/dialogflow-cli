"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _archiver = _interopRequireDefault(require("archiver"));

var _commander = _interopRequireDefault(require("commander"));

var _rawBody = _interopRequireDefault(require("raw-body"));

var _globalFlags = require("../globalFlags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Given a path, compress the files at the path and make a string of the
// contents.
const makeArchive = async path => {
  const archive = (0, _archiver.default)("zip", {});
  const zipStringPromise = (0, _rawBody.default)(archive);
  archive.on("warning", err => {
    if (err.code === "ENOENT") {
      // log warning
      // eslint-disable-next-line no-console
      console.warn(err);
    } else {
      // throw error
      throw err;
    }
  });
  archive.on("error", err => {
    throw err;
  });
  archive.directory(path, ".");
  archive.finalize();
  return await zipStringPromise;
};

const main = async () => {
  const {
    agent,
    path,
    parent
  } = await (0, _globalFlags.handleArguments)(_commander.default);
  const agentContent = await makeArchive(path); // Make Request

  const [operation] = await agent.importAgent({
    parent,
    agentContent
  });
  await operation.promise();
};

const attachCommand = program => {
  program.command("import [path]").description("Zips and imports the files at the specified path into the dialogflow agent").action(() => {
    main();
  });
};

var _default = attachCommand;
exports.default = _default;