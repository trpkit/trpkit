/* tslint:disable */
/* eslint-disable */
/**
*/
export function set_panic_hook(): void;
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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_login_free: (a: number) => void;
  readonly login_new: () => number;
  readonly login_start: (a: number, b: number, c: number, d: number) => void;
  readonly login_finish: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly login_getSessionKey: (a: number, b: number) => void;
  readonly login_getExportKey: (a: number, b: number) => void;
  readonly __wbg_registration_free: (a: number) => void;
  readonly registration_new: () => number;
  readonly registration_start: (a: number, b: number, c: number, d: number) => void;
  readonly registration_finish: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly registration_getExportKey: (a: number, b: number) => void;
  readonly set_panic_hook: () => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
