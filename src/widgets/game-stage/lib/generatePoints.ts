interface Point {
  x: number;
  y: number;
}

const HISTORY_POINTS_STEPS = 50;

export const generateHistoryPoints = (currentMs: number, currentMultiplier: number): Point[] => {
  const points: Point[] = [];
  for (let i = 0; i <= HISTORY_POINTS_STEPS; i++) {
    const t = i / HISTORY_POINTS_STEPS;
    const ms = currentMs * t;
    const mult = 1 + (currentMultiplier - 1) * Math.pow(t, 2);
    points.push({ x: ms, y: mult });
  }
  return points;
};
