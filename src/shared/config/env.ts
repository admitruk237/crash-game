const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined');
if (!wsUrl) throw new Error('NEXT_PUBLIC_WS_URL is not defined');

export const API_BASE_URL: string = apiUrl.replace(/\/$/, '');
export const WS_URL: string = wsUrl.replace(/\/$/, '');
