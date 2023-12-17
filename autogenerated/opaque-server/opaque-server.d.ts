/* tslint:disable */
/* eslint-disable */
/**
*/
export function set_panic_hook(): void;
/**
*/
export class HandleLogin {
  free(): void;
/**
* @param {ServerSetup} setup
*/
  constructor(setup: ServerSetup);
/**
* @param {Uint8Array | undefined} password_file
* @param {Uint8Array} identifier
* @param {Uint8Array} credential_request
* @returns {Uint8Array}
*/
  start(password_file: Uint8Array | undefined, identifier: Uint8Array, credential_request: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} credential_finish
* @returns {Uint8Array}
*/
  finish(credential_finish: Uint8Array): Uint8Array;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} serialized_state
* @param {ServerSetup} setup
* @returns {HandleLogin}
*/
  static deserialize(serialized_state: Uint8Array, setup: ServerSetup): HandleLogin;
}
/**
*/
export class HandleRegistration {
  free(): void;
/**
* @param {ServerSetup} setup
*/
  constructor(setup: ServerSetup);
/**
* @param {Uint8Array} identifier
* @param {Uint8Array} registration_request
* @returns {Uint8Array}
*/
  start(identifier: Uint8Array, registration_request: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} registration_finish
* @returns {Uint8Array}
*/
  finish(registration_finish: Uint8Array): Uint8Array;
}
/**
*/
export class Login {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} password
* @returns {Uint8Array}
*/
  start(password: string): Uint8Array;
/**
* @param {string} pass
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
  finish(pass: string, message: Uint8Array): Uint8Array;
/**
* @returns {Uint8Array}
*/
  getSessionKey(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  getExportKey(): Uint8Array;
}
/**
*/
export class Registration {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} password
* @returns {Uint8Array}
*/
  start(password: string): Uint8Array;
/**
* @param {string} pass
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
  finish(pass: string, message: Uint8Array): Uint8Array;
/**
* @returns {Uint8Array}
*/
  getExportKey(): Uint8Array;
}
/**
*/
export class ServerSetup {
  free(): void;
/**
*/
  constructor();
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} input
* @returns {ServerSetup}
*/
  static deserialize(input: Uint8Array): ServerSetup;
}
