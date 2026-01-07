"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    // const for router
    const router = useRouter();
    const [staffNumber, setStaffNumber] = useState("");
    const [password, setPassword] = useState("");

    // logic for button
    async function signInUser() {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    staffNumber,
                    password
                })
            });

            const data = await response.json();

            if (!data.ok) {
                alert(data.error || "Invalid Staff Number or Password!");
                return;
            }

            if (data.role === "admin") {
                router.push("/admin/dashboard");
            } else if (data.role === "warden") {
                router.push("/warden");
            } else {
                alert("Role has not been assigned, contact your administrator");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong... whoops!")
    }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-10">
            {/* div used to 'hold' the login items within a box from the outside*/}
            <div className="bg-winchester-purple p-8 gap-5 rounded-lg shadow-lg flex flex-col
            items-center text-white">
                <h1 
                    className="text-2xl text-white dark:text-white">
                        Winchester Warden Whereabouts
                </h1>
                <p 
                    className="text-base">
                        Use your Staff Number and Password to login below.
                </p>
                {/* Staff Number Entry Div */}
                <div className="flex flex-col items-center">
                    <label 
                        htmlFor="staffNumber" 
                        className="text-base">Staff Number</label>
                    <input 
                        id="staffNumber" 
                        name="staffNumber" 
                        type="text" 
                        className="border w-xs focus:border-3" 
                        placeholder={"e.g.123456"}
                        value={staffNumber}
                        onChange={(event) => setStaffNumber(event.target.value)}>
                    </input>
                </div>
                {/* Password Entry Div */}
                <div className="flex flex-col items-center">
                    <label 
                        htmlFor="password" 
                        className="text-base">
                            Password
                    </label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        className="border w-xs focus:border-3" 
                        placeholder={"example"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}>
                    </input>
                    {/* Link used to direct to forgot password page */}
                    <Link href="/login/forgot-password" className="text-sm text-cyan-400 hover:font-bold">
                            Forgot Password?
                    </Link>
                </div>
                {/* sign in button linked to function signInUser */}
                <button onClick={signInUser} 
                className="bg-lime-500 p-1 rounded shadow-lg text-black hover:bg-lime-400">
                    Sign In
                </button>
            </div>
        </div>
    );
}