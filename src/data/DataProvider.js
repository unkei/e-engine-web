/**
 * Abstract base class for Data Providers.
 * Defines the interface for receiving vehicle data.
 */
export class DataProvider {
  constructor() {
    this.listeners = [];
  }

  /**
   * Subscribe to data updates.
   * @param {Function} callback - Function to call with new data { throttle, speed, voltage, current }
   */
  subscribe(callback) {
    this.listeners.push(callback);
  }

  /**
   * Notify all subscribers with new data.
   * @param {Object} data - { throttle, speed, voltage, current }
   */
  notify(data) {
    this.listeners.forEach(cb => cb(data));
  }

  /**
   * Start receiving data.
   */
  connect() {
    throw new Error("Method 'connect()' must be implemented.");
  }
}
