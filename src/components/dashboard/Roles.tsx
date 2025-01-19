// src/components/Roles.tsx

import React, { useState, useEffect } from "react";

// Define the shape of data returned by the "role" table.
interface Role {
    id: string;
    title: string;
    // Add any additional fields you expect in the role table
    description?: string;
    difficulty?: string;
    rewards?: number;
}

// Read your backend base URL from Vite environment variables
const backendUrl = "http://127.0.0.1:8000";

/**
 * Fetch data from the given table.
 * This returns a Promise resolving to an array of Role objects.
 */
async function fetchDataFromTable(table: string): Promise<Role[]> {
    try {
        const response = await fetch(`${backendUrl}/data/${table}`);

        // Check for non-OK responses
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${table}, status: ${response.status}`);
        }

        // The server returns JSON like { data: [...] }
        const jsonData = await response.json();

        // If your API returns { data: [...]} shape, extract the array:
        // e.g., const rolesArray = jsonData.data;
        // Otherwise, if your API returns directly an array, use jsonData.
        const rolesArray = jsonData.data || jsonData;

        // Log for debug
        console.log("Fetched data from table:", table, rolesArray);

        // Return the array of roles
        return rolesArray as Role[];

    } catch (error) {
        console.error("fetchDataFromTable error:", error);
        throw error;
    }
}

const Roles: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the "role" table data on component mount
    useEffect(() => {
        const getRoles = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchDataFromTable("roles");
                setRoles(data);
            } catch (err) {
                console.error("Failed to fetch roles:", err);
                setError("Failed to load roles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getRoles();
    }, []);

    // Render loading or error messages
    if (loading) {
        return (
            <div className="p-4 text-center text-white">
                <p>Loading roles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-400">
                <p>{error}</p>
            </div>
        );
    }

    // Render the list of roles
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">List of Roles</h1>
            {roles.length === 0 ? (
                <p>No roles found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            className="border border-gray-700 rounded-md p-4 bg-gray-800 text-white"
                        >
                            <h2 className="text-lg font-bold mb-2">{role.title}</h2>
                            {/* If you have a description */}
                            {role.description && (
                                <p className="text-gray-300 mb-2">{role.description}</p>
                            )}
                            {/* If you have difficulty or rewards */}
                            <div className="flex justify-between mt-2">
                                {role.difficulty && (
                                    <span className="text-sm italic">Difficulty: {role.difficulty}</span>
                                )}
                                {typeof role.rewards === "number" && (
                                    <span className="text-sm italic">{role.rewards} XP</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Roles;
