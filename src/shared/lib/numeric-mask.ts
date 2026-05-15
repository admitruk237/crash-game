export const sanitizeNumeric = (raw: string): string => {
  let cleaned = raw.replace(/[^\d.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot !== -1) {
    cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
  }
  return cleaned;
};

export const clampNumericString = (value: string, max: number): string => {
  if (value === '' || value === '.') return value;
  const num = parseFloat(value);
  if (!Number.isFinite(num)) return value;
  return num > max ? max.toString() : value;
};
