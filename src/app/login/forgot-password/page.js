"use client";
import Link from "next/link";

export default function ForgotPassword() {
    return (
        <main className="flex items-center justify-center min-h-screen p-6">
            <div 
            className="
            bg-winchester-purple 
            p-8 
            gap-5 
            rounded-lg 
            shadow-lg 
            flex 
            flex-col 
            items-center 
            text-white">
                <Link
                    href="/login"
                    className="
                    absolute
                    top-4
                    left-4
                    bg-yellow-400
                    px-3
                    py-1
                    rounded
                    text-black
                    text-sm
                    shadow
                    hover:bg-yellow-300"
                >
                    Back to Login
                </Link>
                <h1 className="text-2xl text-white dark:text-white">
                    Password Reset Self Service.
                </h1>
                <p className="text-base text-center">
                    Enter your staff number below.
                </p>
                <div className="flex flex-col items-center">
                    <label
                        htmlFor="staffNumber"
                        className="text-base mb-4"
                    >
                        Staff Number:
                    </label>
                    <input type="text" id="staffNumber" name="staffNumber" 
                    className="border w-xs focus:border-3 mb-4" placeholder="e.g W123456"
                    >
                    </input>
                    <button
                        type="button"
                        onClick={() => 
                            alert(
                                 "We are currently transitioning to SSO.\n\n"
                                +"Self Service is unavailable during this time.\n\n"
                                +"Please contact KDS directly for assistance."
                            )
                        }
                        className="bg-lime-500 p-1 rounded shadow-lg text-black hover:bg-lime-400"
                    >
                        Reset Password
                    </button>
                </div>

            </div>
        </main>
    );
}   