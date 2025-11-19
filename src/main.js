import { MockProvider } from './data/MockProvider.js';
import { VirtualEngine } from './physics/VirtualEngine.js';
import { SoundEngine } from './audio/SoundEngine.js';
import { Dashboard } from './ui/Dashboard.js';

console.log("EV Sound Simulator Starting...");

// Initialize Modules
const dataProvider = new MockProvider();
const virtualEngine = new VirtualEngine();
const soundEngine = new SoundEngine();
const dashboard = new Dashboard('app');

// Start Button for Audio Context
dashboard.showStartButton(async () => {
    await soundEngine.init();
    dataProvider.connect();
});

// Main Loop / Data Subscription
dataProvider.subscribe((data) => {
    // Update Physics
    // Assuming data comes in at ~60fps or we calculate dt
    const physicsState = virtualEngine.update(0.016, data.throttle, data.speed);

    // Update Sound
    soundEngine.update(physicsState.rpm, physicsState.load);

    // Update UI
    dashboard.update(physicsState.rpm, data.speed, physicsState.gear);
});
