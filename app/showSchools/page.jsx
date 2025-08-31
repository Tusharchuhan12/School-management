"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);

    // Fetch all schools
    const fetchSchools = async () => {
        const res = await fetch("/api/schools");
        const data = await res.json();
        setSchools(data);
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    // Delete School
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this school?")) return;

        try {
            const res = await fetch(`/api/schools/${id}`, {
                method: "DELETE",
            });

            const result = await res.json();

            if (res.ok) {
                alert(result.message || "School deleted successfully!");
                // Remove from UI
                setSchools(schools.filter((s) => s._id !== id));
            } else {
                alert(result.error || "Failed to delete school");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                📚 Schools List
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {schools.length > 0 ? (
                    schools.map((school, idx) => (
                        <div
                            key={school._id || school.id || idx}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center"
                        >
                            <img
                                src={school.image || "https://via.placeholder.com/250x150"}
                                alt={school.name}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-lg font-semibold text-gray-800">{school.name}</h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {school.address}, {school.city}
                            </p>
                            <p className="text-gray-500 text-sm">{school.state}</p>

                            {/* ✅ Delete Button */}
                            <button
                                onClick={() => handleDelete(school._id)}
                                className="mt-3 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 text-lg col-span-full">
                        No schools found!
                    </p>
                )}
            </div>
        </div>
    );
}
