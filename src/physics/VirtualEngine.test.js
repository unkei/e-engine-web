import { describe, it, expect, beforeEach } from 'vitest';
import { VirtualEngine } from './VirtualEngine.js';

describe('VirtualEngine', () => {
    let engine;

    beforeEach(() => {
        engine = new VirtualEngine();
    });

    it('should initialize with idle RPM', () => {
        expect(engine.currentRPM).toBe(1000);
        expect(engine.currentGear).toBe(0);
    });

    it('should rev in neutral when stopped', () => {
        // Speed 0, Throttle 50%
        const state = engine.update(0.016, 50, 0);
        expect(state.rpm).toBeGreaterThan(1000);
        expect(state.gear).toBe(1); // Display gear is 1-based
    });

    it('should increase RPM with speed in gear', () => {
        // Speed 10km/h, Gear 0 (Ratio 150) -> 1500 RPM
        const state = engine.update(0.016, 0, 10);
        expect(state.rpm).toBeCloseTo(1500, -1);
    });

    it('should shift up when RPM is high', () => {
        // Force high speed to trigger shift
        // Gear 0 Ratio 150. Shift Up at 9000.
        // Speed 70 -> 10500 RPM -> Should shift

        // First update to set state
        engine.update(0.016, 100, 70);

        // Advance time by shiftDelay + small buffer
        const start = Date.now();
        while (Date.now() - start < 600) {
            // busy wait simulation for test (mocking Date.now would be better but this is simple)
        }
        // Or better, we can just override lastShiftTime if we could access it, 
        // but let's just call update again and rely on the logic.
        // Actually, the logic uses Date.now(). For robust tests we should mock time, 
        // but for this simple test let's just verify the logic flow if we force the condition.

        // Let's just check the logic by simulating a sequence
        engine.lastShiftTime = 0; // Force ready to shift
        const state = engine.update(0.016, 100, 70);

        // Should have shifted to Gear 1 (2nd gear)
        expect(engine.currentGear).toBe(1);
    });
});
