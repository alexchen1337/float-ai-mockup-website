import { useEffect, useRef } from 'react';
import './BackgroundLines.css';

const BackgroundLines = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size to match the max-width from app-container
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      // Match the max-width from .app-container
      const maxWidth = Math.min(1200, window.innerWidth);
      canvas.width = maxWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${maxWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    // Particle class
    class Particle {
      constructor() {
        // Center the particle spawn area
        const maxWidth = Math.min(1200, canvas.width);
        this.x = (canvas.width - maxWidth) / 2 + Math.random() * maxWidth;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the centered container boundaries
        const maxWidth = Math.min(1200, canvas.width);
        const leftBound = (canvas.width - maxWidth) / 2;
        const rightBound = leftBound + maxWidth;

        if (this.x < leftBound || this.x > rightBound) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 108, 255, 0.5)';
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const numberOfParticles = 50;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect particles within range
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 108, 255, ${0.2 * (1 - distance/maxDistance)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    setCanvasSize();
    init();
    animate();

    window.addEventListener('resize', () => {
      setCanvasSize();
      init();
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="background-lines" 
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '1200px',
        width: '100%',
      }}
    />
  );
};

export default BackgroundLines; 