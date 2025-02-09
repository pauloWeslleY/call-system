const storageKey = "@USER_AUTH_CALL_SYSTEM";

export class LocalStorage {
  save(data) {
    const saveData = JSON.stringify(data);
    localStorage.setItem(storageKey, saveData);
  }

  clear() {
    localStorage.removeItem(storageKey);
  }
}
