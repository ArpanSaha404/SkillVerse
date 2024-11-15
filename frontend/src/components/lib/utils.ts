import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const frontend_URL_dev = `http://localhost:5000`;
export const frontend_URL_prod = `https://skillverse-z2r9.onrender.com`;
