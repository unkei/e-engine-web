/**
 * Sound Engine using Web Audio API.
 * Synthesizes engine sounds based on RPM and Load.
 */
export class SoundEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;

        // Nodes
        this.osc1 = null; // Fundamental
        this.osc2 = null; // Harmonics
        this.noise = null; // Intake/Exhaust noise
        this.filter = null;

        this.isRunning = false;
    }

    async init() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = 0.5;

        // Create Filter (Lowpass for muffling)
        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.value = 400;
        this.filter.Q.value = 1;
        this.filter.connect(this.masterGain);

        // Oscillator 1 (Sub/Fundamental - Sawtooth for "bite")
        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sawtooth';
        this.osc1.frequency.value = 50;
        this.osc1.connect(this.filter);

        // Oscillator 2 (Square for "body")
        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'square';
        this.osc2.frequency.value = 100;
        const osc2Gain = this.ctx.createGain();
        osc2Gain.gain.value = 0.3;
        this.osc2.connect(osc2Gain);
        osc2Gain.connect(this.filter);

        // Start Oscillators
        this.osc1.start();
        this.osc2.start();

        this.isRunning = true;
        console.log("SoundEngine: Started");
    }

    /**
     * Update sound parameters.
     * @param {number} rpm - Engine RPM
     * @param {number} load - Engine Load (0-1)
     */
    update(rpm, load) {
        if (!this.isRunning) return;

        // Calculate fundamental frequency (Hz)
        // Single cylinder fires once every 2 revolutions (4-stroke) or once every rev (2-stroke).
        // Let's assume 1 fire per rev for a "thumper" feel at lower RPMs.
        // Hz = RPM / 60
        const fundamentalHz = Math.max(rpm, 100) / 60;

        // Update Pitch
        if (this.osc1) this.osc1.frequency.setTargetAtTime(fundamentalHz, this.ctx.currentTime, 0.05);
        if (this.osc2) this.osc2.frequency.setTargetAtTime(fundamentalHz * 0.5, this.ctx.currentTime, 0.05); // Sub-octave

        // Update Filter (Timbre)
        // Filter opens up with RPM and Load
        const baseFreq = 200;
        const rpmMod = rpm * 0.5;
        const loadMod = load * 1000;
        const targetFreq = baseFreq + rpmMod + loadMod;

        if (this.filter) this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);

        // Update Volume (Load)
        // Idle volume + Load volume
        const targetGain = 0.2 + (load * 0.8);
        // this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
}
