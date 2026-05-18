// fireworks.js - 烟花控制模块
(function () {
  "use strict";

  // ---------- 日期区间 ----------
  const START_DATE = "2026-02-17";
  const END_DATE = "2026-03-03";

  function isInDateRange() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayStr = `${year}-${month}-${day}`;
    return todayStr >= START_DATE && todayStr <= END_DATE;
  }

  // ---------- 烟花系统变量 ----------
  let active = false; // 当前是否有烟花正在播放
  let currentOverlay = null;
  let particles = [];
  let animationFrame = null;
  let spawnInterval = null;
  let autoEndTimeout = null;
  let resizeHandler = null;
  let keydownHandler = null;

  // ---------- 清理函数 ----------
  function cleanupFireworks() {
    if (!active) return;

    active = false;

    if (spawnInterval) {
      clearInterval(spawnInterval);
      spawnInterval = null;
    }
    if (autoEndTimeout) {
      clearTimeout(autoEndTimeout);
      autoEndTimeout = null;
    }
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    if (keydownHandler) {
      document.removeEventListener("keydown", keydownHandler);
      keydownHandler = null;
    }
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
      resizeHandler = null;
    }
    if (currentOverlay && currentOverlay.parentNode) {
      currentOverlay.parentNode.removeChild(currentOverlay);
      currentOverlay = null;
    }
    particles = [];
  }

  // ---------- 启动烟花（核心逻辑）----------
  function startFireworks() {
    // 如果已有烟花在播放，先清理（重新开始计时）
    cleanupFireworks();

    // 再次检查日期区间
    if (!isInDateRange()) return;

    active = true;

    // 创建遮罩层
    const overlay = document.createElement("div");
    overlay.id = "fireworks-overlay";
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            pointer-events: none;
            z-index: 9999;
        `;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
            display: block;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);
    currentOverlay = overlay;
    const ctx = canvas.getContext("2d");

    // ---------- 粒子系统函数 ----------
    function createFirework(centerX, centerY) {
      const particleCount = 30 + Math.floor(Math.random() * 25);
      const baseHue = Math.random() * 360;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 6;
        const vx = Math.cos(angle) * speed * (0.6 + Math.random() * 0.8);
        const vy = Math.sin(angle) * speed * (0.6 + Math.random() * 0.8) - 1.2;
        const color = `hsl(${baseHue + (Math.random() * 30 - 15)}, 90%, 65%)`;
        particles.push({
          x: centerX,
          y: centerY,
          vx: vx,
          vy: vy,
          size: 3 + Math.random() * 5,
          color: color,
          life: 1.0,
          decay: 0.012 + Math.random() * 0.015,
        });
      }
    }

    function spawnRandomFirework() {
      if (!active) return;
      const margin = 80;
      const x = margin + Math.random() * (canvas.width - margin * 2);
      const y = margin + Math.random() * (canvas.height * 0.6);
      createFirework(x, y);
    }

    function updateFireworks() {
      if (!active) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= p.decay;

        const alpha = Math.min(p.life * 0.9, 0.9);
        if (
          p.life <= 0.02 ||
          p.y > canvas.height + 100 ||
          p.x < -100 ||
          p.x > canvas.width + 100
        ) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 绘制红色祝福文字
      ctx.globalAlpha = 1.0;
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.font =
        'bold 120px "Microsoft YaHei", "PingFang SC", "SimHei", sans-serif';
      ctx.fillStyle = "#ff0000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("新年快乐", canvas.width / 2, canvas.height / 2 - 50);

      ctx.font = '28px "Microsoft YaHei", "PingFang SC", "SimHei", sans-serif';
      ctx.fillStyle = "#ff0000";
      ctx.fillText("", canvas.width / 2, canvas.height / 2 + 30);

      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      animationFrame = requestAnimationFrame(updateFireworks);
    }

    // 初始几发烟花
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (active) spawnRandomFirework();
      }, i * 100);
    }

    // 定时生成
    spawnInterval = setInterval(() => {
      if (active) spawnRandomFirework();
    }, 300);

    // 启动动画
    updateFireworks();

    // 5秒自动结束
    autoEndTimeout = setTimeout(() => {
      cleanupFireworks();
    }, 5000);

    // ESC手动结束
    keydownHandler = function (e) {
      if (e.key === "Escape" && active) cleanupFireworks();
    };
    document.addEventListener("keydown", keydownHandler);

    // 窗口大小自适应
    resizeHandler = function () {
      if (!active) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);
  }

  // ---------- 暴露给外部的调用接口 ----------
  window.playFireworks = function () {
    startFireworks();
  };

  // ---------- 页面加载时自动播放（如果日期符合）----------
  if (isInDateRange()) {
    // 等待 DOM 加载完成再启动，避免 canvas 尺寸获取问题
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startFireworks);
    } else {
      startFireworks();
    }
  }
})();
