import { type ClassValue, clsx } from "clsx"
import { table } from "console"
import { twMerge } from "tailwind-merge"
const backendUrl = import.meta.env.VITE_BACKEND_URL as string
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchDataFromTable(table: string) {
    const res = await fetch(`${backendUrl}/data/${table}`);
    const data = await res.json();
    return data;

  // fetch data from table
}