import { LocalStorage } from "./local-storage";

function makeLocalStorage() {
  return new LocalStorage();
}

export const storage = makeLocalStorage();
