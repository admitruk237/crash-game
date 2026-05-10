import type { Phase } from '@/shared/types/common';

interface Point {
  x: number;
  y: number;
}

export interface LastPointCoords {
  x: number;
  y: number;
}

const COLORS: Record<Phase, string> = {
  running: '#22c55e',
  crashed: '#ef4444',
  waiting: '#22c55e',
};

export const drawCurve = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  points: Point[],
  phase: Phase
): LastPointCoords | null => {
  ctx.clearRect(0, 0, w, h);
  if (points.length < 2) return null;

  const pad = 40;
  const lastPoint = points[points.length - 1];
  const maxX = Math.max(10000, lastPoint.x * 1.1);
  const maxY = Math.max(2, lastPoint.y * 1.1);

  const toX = (x: number) => pad + (x / maxX) * (w - pad * 2);
  const toY = (y: number) => h - pad - ((y - 1) / (maxY - 1)) * (h - pad * 2);

  const color = COLORS[phase];
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, `${color}33`);
  grad.addColorStop(1, `${color}00`);

  ctx.beginPath();
  ctx.moveTo(toX(points[0].x), toY(points[0].y));
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(toX(points[i].x), toY(points[i].y));
  }
  ctx.lineTo(toX(lastPoint.x), h - pad);
  ctx.lineTo(toX(points[0].x), h - pad);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.moveTo(toX(points[0].x), toY(points[0].y));
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(toX(points[i].x), toY(points[i].y));
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  return { x: toX(lastPoint.x), y: toY(lastPoint.y) };
};
