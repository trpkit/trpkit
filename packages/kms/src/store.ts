import { base64, utf8 } from "@scure/base";

/**
 * Get the value of the window.top.name
 */
function getWindowName() {
  if (!window.top?.name || window.top.name === "") {
    return null;
  }

  try {
    return JSON.parse(window.top.name);
  } catch {
    return {};
  }
}

/**
 * Save the value of the window.top.name property
 *
 * @param name The name of the property to save
 * @param data The data to save
 */
function saveWindowName(name: string, data: string) {
  const current = getWindowName();
  current[name] = data;
  window.top!.name = JSON.stringify(current);
}

/**
 * Find the value of the window.top.name property
 *
 * @param name The name of the property to find
 */
function findWindowName(name: string) {
  const current = getWindowName();

  if (!(name in current)) {
    return null;
  }

  const { [name]: data, ...rest } = current;
  const json = JSON.stringify(rest);
  window.top!.name = json === "{}" ? "" : json;

  return data || null;
}

/**
 * Combine the window.top.name and window.sessionStorage
 *
 * @param windowPart The window.top.name part
 * @param sessionPart The window.sessionStorage part
 */
function combineParts(windowPart: string, sessionPart: string) {
  if (!windowPart || !sessionPart) {
    return null;
  }

  const windowBuffer = base64.decode(windowPart);
  const sessionBuffer = base64.decode(sessionPart);

  const data = new Uint8Array(windowBuffer.length);
  for (const i in data) {
    data[i] = windowBuffer[i] ^ sessionBuffer[i];
  }

  return utf8.encode(data);
}

/**
 * Split the input into two parts
 *
 * @param input The input to split
 */
function splitParts(input: string) {
  const output = utf8.decode(input);
  const nonce = window.crypto.getRandomValues(new Uint8Array(output.length));
  const copy = new Uint8Array(nonce);

  for (const i in output) {
    copy[i] = copy[i] ^ output[i];
  }

  return [base64.encode(nonce), base64.encode(copy)];
}

// The store object
export type StoreObject = {
  value: string;
};

/**
 * Load the store from the window.top.name and window.sessionStorage
 */
export function loadStore() {
  const windowPart = findWindowName("trpkit:kms:store");
  const sessionPart = window.sessionStorage.getItem("trpkit:kms:store");

  window.sessionStorage.removeItem("trpkit:kms:store");
  if (!windowPart || !sessionPart) {
    return;
  }

  const combined = combineParts(windowPart, sessionPart);
  if (!combined) {
    return;
  }

  const store: [string, StoreObject][] = JSON.parse(combined);

  return new Map(
    store.map(([key, value]) => {
      return [key, value];
    })
  );
}

/**
 * Save the store to the window.top.name and window.sessionStorage
 *
 * @param store The store to save
 */
export function saveStore(store: Map<string, StoreObject>) {
  const data = JSON.stringify(Array.from(store.entries()));
  const [windowPart, sessionPart] = splitParts(data);

  saveWindowName("trpkit:kms:store", windowPart);
  window.sessionStorage.setItem("trpkit:kms:store", sessionPart);
}
