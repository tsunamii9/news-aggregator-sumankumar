class Cache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttlSeconds = 300) {
    const expiry = Date.now() + ttlSeconds * 1000;

    this.store.set(key, {
      value,
      expiry
    });
  }

  get(key) {
    const data = this.store.get(key);

    if (!data) return null;

    if (Date.now() > data.expiry) {
      this.store.delete(key);
      return null;
    }

    return data.value;
  }

  delete(key) {
    this.store.delete(key);
  }
}

module.exports = new Cache();