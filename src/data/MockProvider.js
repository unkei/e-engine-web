import { DataProvider } from './DataProvider.js';

/**
 * Mock Data Provider using HTML sliders.
 */
export class MockProvider extends DataProvider {
    constructor() {
        super();
        this.throttle = 0;
        this.speed = 0;
        this.container = null;
    }

    connect() {
        console.log("MockProvider: Connecting...");
        this.createDebugUI();
        this.startLoop();
    }

    createDebugUI() {
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.bottom = '20px';
        this.container.style.right = '20px';
        this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        this.container.style.padding = '15px';
        this.container.style.borderRadius = '8px';
        this.container.style.color = 'white';
        this.container.style.zIndex = '1000';
        this.container.style.fontFamily = 'monospace';

        this.container.innerHTML = `
      <h3>Mock Data Controls</h3>
      <div style="margin-bottom: 10px;">
        <label>Throttle: <span id="debug-throttle-val">0</span>%</label>
        <input type="range" id="debug-throttle" min="0" max="100" value="0" style="width: 100%;">
      </div>
      <div style="margin-bottom: 10px;">
        <label>Speed: <span id="debug-speed-val">0</span> km/h</label>
        <input type="range" id="debug-speed" min="0" max="150" value="0" style="width: 100%;">
      </div>
    `;

        document.body.appendChild(this.container);

        // Event Listeners
        const throttleInput = document.getElementById('debug-throttle');
        const speedInput = document.getElementById('debug-speed');

        throttleInput.addEventListener('input', (e) => {
            this.throttle = parseFloat(e.target.value);
            document.getElementById('debug-throttle-val').innerText = this.throttle;
            this.emitUpdate();
        });

        speedInput.addEventListener('input', (e) => {
            this.speed = parseFloat(e.target.value);
            document.getElementById('debug-speed-val').innerText = this.speed;
            this.emitUpdate();
        });
    }

    startLoop() {
        // In a real scenario, data might come in at a certain frequency.
        // For sliders, we update on event, but we can also simulate a heartbeat if needed.
    }

    emitUpdate() {
        this.notify({
            throttle: this.throttle,
            speed: this.speed,
            voltage: 72.0, // Mock constant
            current: this.throttle * 2.0 // Mock current based on throttle
        });
    }
}
