# EV Engine Sound Simulator

A web application that simulates internal combustion engine sounds for electric motorcycles.
It uses the Web Audio API to synthesize engine sounds in real-time based on throttle and speed data.

## Features
- **Synthesized Sound Engine**: Generates a Single Cylinder engine sound using oscillators and dynamic filtering.
- **Virtual Gearbox**: Simulates a 6-speed transmission with automatic shifting logic for a realistic riding feel.
- **Dashboard**: Visualizes RPM, Speed, and Gear using HTML5 Canvas.
- **Mock Data Mode**: Includes debug sliders to simulate riding without connecting to a real bike.
- **Extensible Data Layer**: Designed to easily switch from Mock data to Web Bluetooth (BLE) in the future.

## Tech Stack
- **Frontend**: Vanilla JavaScript, Vite
- **Audio**: Web Audio API
- **Testing**: Vitest (Unit), Playwright (E2E)
- **CI/CD**: GitHub Actions (Deploys to GitHub Pages)

## Setup & Run

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open the local URL (e.g., `http://localhost:5173`) and click **"START ENGINE"**.

### Testing
```bash
# Unit Tests
npm run test

# E2E Tests
npm run test:e2e
```

## Session History (2025-11-20)

### 1. Initial Request
- **Goal**: Create a Web App to simulate engine sounds for an EV bike.
- **Inputs**: Throttle, Speed, Voltage, Current.
- **Logic**: Calculate RPM from inputs and synthesize sound.

### 2. Planning & Specification
- **Data Connection**: Decided to start with a **Mock Provider** (Sliders) and support **BLE** later.
- **Sound Profile**: Selected **Single Cylinder** (Thumper) sound.
- **Transmission**: Decided to implement **Virtual Gears** (RPM drops on shift) for better feedback.

### 3. Implementation
- **Project Setup**: Initialized Vite (Vanilla JS).
- **Modules**:
    - `MockProvider`: Simulates vehicle data.
    - `VirtualEngine`: Physics engine with gear ratios and auto-shift logic.
    - `SoundEngine`: Web Audio API implementation (Sawtooth + Square waves).
    - `Dashboard`: Canvas-based UI for RPM/Speed/Gear.
- **Integration**: Wired everything in `main.js`.

### 4. Debugging & Testing
- **Issue**: Initial startup issues (missing package.json configuration).
- **Fix**: Configured `package.json` for ESM and added scripts.
- **Tests Added**:
    - **Unit**: Verified `VirtualEngine` logic (RPM calculation, Shifting).
    - **E2E**: Verified Dashboard loading and Start button using Playwright.

### 5. Deployment
- **GitHub**: Initialized repo and committed code.
- **CI/CD**: Created GitHub Actions workflow (`deploy.yml`) for GitHub Pages.
- **Troubleshooting**:
    - Fixed GitHub Auth permission error (`gh auth refresh`).
    - Fixed GitHub Pages 404 error by adding `base: '/e-engine-web/'` to `vite.config.js`.

### 6. Result
- The app is deployed to GitHub Pages.
- Fully functional simulator with visual and audio feedback.
