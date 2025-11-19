/**
 * Dashboard UI using Canvas.
 * Renders RPM, Speed, and Gear.
 */
export class Dashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.rpm = 0;
        this.speed = 0;
        this.gear = 1;
        this.maxRPM = 12000;
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    update(rpm, speed, gear) {
        this.rpm = rpm;
        this.speed = speed;
        this.gear = gear;
        this.draw();
    }

    draw() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const ctx = this.ctx;

        // Clear
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, w, h);

        const centerX = w / 2;
        const centerY = h / 2;

        // Draw Tachometer Arc
        const radius = Math.min(w, h) * 0.35;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI * 0.8, Math.PI * 2.2);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 20;
        ctx.stroke();

        // RPM Value (Bar)
        const startAngle = Math.PI * 0.8;
        const endAngle = Math.PI * 2.2;
        const totalAngle = endAngle - startAngle;
        const currentAngle = startAngle + (this.rpm / this.maxRPM) * totalAngle;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, currentAngle);
        ctx.strokeStyle = this.rpm > 10000 ? '#ff3333' : '#00ccff';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Text Info
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';

        // Speed
        ctx.font = 'bold 60px sans-serif';
        ctx.fillText(Math.floor(this.speed), centerX, centerY + 20);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#888';
        ctx.fillText('km/h', centerX, centerY + 50);

        // Gear
        ctx.font = 'bold 40px sans-serif';
        ctx.fillStyle = '#ffcc00';
        ctx.fillText(this.gear, centerX, centerY - 80);

        // RPM Text
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#888';
        ctx.fillText(`${Math.floor(this.rpm)} RPM`, centerX, centerY + 120);
    }

    showStartButton(callback) {
        const btn = document.createElement('button');
        btn.innerText = "START ENGINE";
        btn.style.position = 'absolute';
        btn.style.top = '50%';
        btn.style.left = '50%';
        btn.style.transform = 'translate(-50%, -50%)';
        btn.style.padding = '20px 40px';
        btn.style.fontSize = '24px';
        btn.style.background = '#00ccff';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';
        btn.style.zIndex = '2000';

        btn.onclick = () => {
            btn.remove();
            callback();
        };

        document.body.appendChild(btn);
    }
}
