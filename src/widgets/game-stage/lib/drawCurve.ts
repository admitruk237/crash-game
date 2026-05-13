import type { Phase } from '@/shared/types';

interface Point {
  x: number;
  y: number;
}

export interface LastPointCoords {
  x: number;
  y: number;
}

export interface DrawColors {
  success: string;
  error: string;
}

const CANVAS_PADDING = 40;
const MIN_VIEW_X = 10000;
const MIN_VIEW_Y = 2;
const VIEW_MARGIN = 1.1;

export const drawCurve = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  points: Point[],
  phase: Phase,
  colors: DrawColors
): LastPointCoords | null => {
  ctx.clearRect(0, 0, w, h);
  if (points.length < 2) return null;

  const lastPoint = points[points.length - 1];
  const maxX = Math.max(MIN_VIEW_X, lastPoint.x * VIEW_MARGIN);
  const maxY = Math.max(MIN_VIEW_Y, lastPoint.y * VIEW_MARGIN);

  const toX = (x: number) => CANVAS_PADDING + (x / maxX) * (w - CANVAS_PADDING * 2);
  const toY = (y: number) => h - CANVAS_PADDING - ((y - 1) / (maxY - 1)) * (h - CANVAS_PADDING * 2);

  const color = phase === 'crashed' ? colors.error : colors.success;
  const grad = ctx.createLinearGradient(0, 0, 0, h);

  grad.addColorStop(0, `color-mix(in srgb, ${color} 20%, transparent)`);
  grad.addColorStop(1, `color-mix(in srgb, ${color} 0%, transparent)`);

  ctx.beginPath();
  ctx.moveTo(toX(points[0].x), toY(points[0].y));
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(toX(points[i].x), toY(points[i].y));
  }
  ctx.lineTo(toX(lastPoint.x), h - CANVAS_PADDING);
  ctx.lineTo(toX(points[0].x), h - CANVAS_PADDING);
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

  const cx = toX(lastPoint.x);
  const cy = toY(lastPoint.y);

  if (phase === 'running') {
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  return { x: cx, y: cy };
};
