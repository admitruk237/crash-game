interface Point {
  x: number;
  y: number;
}

export const generateHistoryPoints = (currentMs: number, currentMultiplier: number): Point[] => {
  const points: Point[] = [];
  const steps = 50;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ms = currentMs * t;
    const mult = 1 + (currentMultiplier - 1) * Math.pow(t, 2);
    points.push({ x: ms, y: mult });
  }
  return points;
};
