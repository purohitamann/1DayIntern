import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Role {
  id: number;
  title: string;
  company_id: number;
  description: string;
  points: number;
  required_skills: string;
}
const backendURL = import.meta.env.VITE_BACKEND_URL;
// Function to fetch the data from the User
export async function fetchDataFromAPI(tableName: string): Promise<Role[]> {
  try {
    const response = await fetch(`${backendURL}/data/${tableName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data as Role[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return backendURL;
  }
 
}

// Example usage