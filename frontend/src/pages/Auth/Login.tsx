import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ===========================
   Interactive Background
   =========================== */
const AntigravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const COLORS = ["#4f46e5", "#818cf8", "#6366f1", "#a5b4fc", "#1e1b4b"];

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx = 0;
      vy = 0;
      size: number;
      color: string;
      friction: number;
      ease: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.friction = 0.94;
        this.ease = 0.05;
      }

      update() {
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 150;

        if (dist < radius) {
          const strength = 1 - dist / radius;
          const angle = Math.atan2(dy, dx);
          const force = strength * 8;
          
          this.vx += Math.cos(angle) * force;
          this.vy += Math.sin(angle) * force;
        }

        this.vx += (this.baseX - this.x) * this.ease;
        this.vy += (this.baseY - this.y) * this.ease;
        
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 60 : 150; 
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    resize();
    
    window.addEventListener("resize", resize);
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />;
};

/* ===========================
   Login Component
   =========================== */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated API Call
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      <AntigravityBackground />

      <div className="relative z-10 w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl shadow-black/50">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20 mb-4">
            R
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Sign in to access the Risk Intelligence Platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400 uppercase ml-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@riskengine.ai"
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400 uppercase ml-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-zinc-600 text-xs font-mono">
          SECURE ACCESS • v1.0.4
        </p>
      </div>
    </div>
  );
};

export default Login;