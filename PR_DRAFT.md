# Pull Request: EV Engine Sound Simulator

## Summary
This PR implements the initial version of the EV Engine Sound Simulator.
It includes a Mock Data Provider, a Physics Engine with Virtual Gears, a Synthesized Sound Engine, and a Dashboard UI.

## Changes
- **Data Layer**: `MockProvider` with UI sliders for Throttle and Speed.
- **Physics**: `VirtualEngine` that calculates RPM and simulates 6-speed gearbox logic.
- **Sound**: `SoundEngine` using Web Audio API (Sawtooth + Square waves) with dynamic pitch and filtering.
- **UI**: Canvas-based Dashboard showing RPM, Speed, and Gear.
- **Tests**: Unit tests for Physics and E2E tests for UI.

## Test Results
- **Unit Tests**: 4/4 Passed (Vitest)
- **E2E Tests**: 1/1 Passed (Playwright)

## How to Verify
1. Checkout this branch.
2. Run `npm install`.
3. Run `npm run dev`.
4. Click "START ENGINE" and use the sliders.

## Deployment
This repo is configured with GitHub Actions to deploy to GitHub Pages automatically on push to `main`.
