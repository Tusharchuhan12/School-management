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
                    {/* School Name */}
                    <div>
                        <input
                            {...register("name", { required: "School Name is required", minLength: { value: 3, message: "At least 3 characters" } })}
                            placeholder="School Name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <input
                            {...register("address", { required: "Address is required", minLength: { value: 5, message: "At least 5 characters" } })}
                            placeholder="Address"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                        )}
                    </div>

                    {/* City */}
                    <div>
                        <input
                            {...register("city", { required: "City is required" })}
                            placeholder="City"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <input
                            {...register("state", { required: "State is required" })}
                            placeholder="State"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                        )}
                    </div>

                    {/* Contact Person */}
                    <div>
                        <input
                            {...register("contact", { required: "Contact person is required" })}
                            placeholder="Contact Person"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.contact && (
                            <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <input
                            {...register("number", {
                                required: "Phone number is required",
                                pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" }
                            })}
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.number && (
                            <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
                        )}
                    </div>

                    {/* Image URL (optional, no validation) */}
                    <div>
                        <input
                            {...register("image")}
                            placeholder="Image URL (optional)"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            {...register("email_id", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Enter valid email" }
                            })}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email_id && (
                            <p className="text-red-500 text-sm mt-1">{errors.email_id.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
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
