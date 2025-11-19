/**
 * Physics Engine to calculate Virtual RPM based on vehicle data.
 * Simulates a virtual gearbox for realistic sound feedback.
 */
export class VirtualEngine {
    constructor() {
        // Configuration
        this.idleRPM = 1000;
        this.maxRPM = 12000;
        this.redlineRPM = 11000;

        // Gear settings
        // Ratios: Higher number = higher RPM for same speed.
        // These are arbitrary "virtual" ratios tuned for feel.
        this.gearRatios = [150, 100, 75, 60, 50, 45];
        this.shiftUpRPM = 9000;
        this.shiftDownRPM = 4000;

        // State
        this.currentGear = 0; // 0-indexed (1st gear)
        this.currentRPM = this.idleRPM;
        this.lastShiftTime = 0;
        this.shiftDelay = 500; // ms between shifts
    }

    /**
     * Update the engine state.
     * @param {number} dt - Delta time in seconds (unused for now but good for smoothing)
     * @param {number} throttle - 0 to 100
     * @param {number} speed - km/h
     * @returns {Object} { rpm, gear, load }
     */
    update(dt, throttle, speed) {
        const now = Date.now();
        let targetRPM = this.idleRPM;

        // Neutral / Stopped logic
        if (speed < 1.0) {
            // Revving in neutral
            // Map throttle 0-100 to Idle-Max
            targetRPM = this.idleRPM + (throttle / 100) * (this.maxRPM - this.idleRPM);
            this.currentGear = 0; // Reset to 1st gear when stopped
        } else {
            // In Gear logic
            const ratio = this.gearRatios[this.currentGear];
            targetRPM = speed * ratio;

            // Clamp to Idle (engine braking / coasting)
            if (targetRPM < this.idleRPM) targetRPM = this.idleRPM;

            // Auto-shift Logic
            if (now - this.lastShiftTime > this.shiftDelay) {
                // Shift Up
                if (targetRPM > this.shiftUpRPM && this.currentGear < this.gearRatios.length - 1) {
                    this.currentGear++;
                    this.lastShiftTime = now;
                    // Recalculate RPM for new gear to avoid jump in this frame (optional, but sound engine handles smoothing)
                    targetRPM = speed * this.gearRatios[this.currentGear];
                }
                // Shift Down
                else if (targetRPM < this.shiftDownRPM && this.currentGear > 0) {
                    this.currentGear--;
                    this.lastShiftTime = now;
                    targetRPM = speed * this.gearRatios[this.currentGear];
                }
            }
        }

        // Smoothing / Physics Inertia could go here
        // For now, we return the raw calculated RPM and let the SoundEngine smooth it if needed.
        this.currentRPM = targetRPM;

        return {
            rpm: this.currentRPM,
            gear: this.currentGear + 1, // Display 1-based
            load: throttle / 100 // 0-1
        };
    }
}
