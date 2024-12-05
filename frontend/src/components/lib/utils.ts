import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const frontend_URL = `https://skillverse-z2r9.onrender.com`;
// `http://localhost:5000`;
// ;
