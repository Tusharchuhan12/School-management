"use client"; // if you're using Next.js App Router (app/ folder)

import Link from "next/link";

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-lg w-full">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">
                    🎓 School Management
                </h1>
                <p className="text-gray-600 mb-6">
                    Manage schools efficiently with simple tools.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        href="/addSchool"
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        ➕ Add a School
                    </Link>
                    <Link
                        href="/showSchools"
                        className="px-5 py-2 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
                    >
                        📚 View Schools
                    </Link>
                </div>
            </div>
        </div>
    );
}
