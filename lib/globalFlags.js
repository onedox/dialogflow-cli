"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleArguments = void 0;

var _dialogflow = require("dialogflow");

const handleArguments = async program => {
  // Assert Path
  const [path] = program.args;

  if (!path) {
    throw new TypeError(`The path wasn't specified.`);
  } // Assert Credentials


  if (!program.credentials) {
    throw new TypeError(`The --credentials flag wasn't provided`);
  }

  const {
    credentials: credentialsPath
  } = program; // Make Agent

  const agent = new _dialogflow.AgentsClient({
    keyFilename: credentialsPath
  }); // Wait for authentication.

  const auth = await agent.auth.authClientPromise; // Create Project Path String

  const parent = agent.projectPath(auth.projectId);
  return {
    parent,
    auth,
    path,
    agent
  };
};

exports.handleArguments = handleArguments;