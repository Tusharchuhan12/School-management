"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchool() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/schools", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
                setMessage(result.message || "School added successfully!");
                // ✅ 1 second baad Home page par redirect
                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                setMessage(result.error || "Failed to add school");
            }
        } catch (error) {
            setMessage("Something went wrong!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    ➕ Add a School
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            {...register("name", { required: true })}
                            placeholder="School Name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">School Name required</p>
                        )}
                    </div>

                    <input
                        {...register("address", { required: true })}
                        placeholder="Address"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...register("city", { required: true })}
                        placeholder="City"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...register("state", { required: true })}
                        placeholder="State"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        {...register("contact")}
                        placeholder="Contact Person"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...register("number")}
                        placeholder="Phone Number"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...register("image")}
                        placeholder="Image URL"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    <div>
                        <input
                            {...register("email_id", { pattern: /^\S+@\S+$/i })}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email_id && (
                            <p className="text-red-500 text-sm mt-1">Enter valid email</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>

                {message && (
                    <p className="text-center mt-4 text-green-600 font-medium">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
