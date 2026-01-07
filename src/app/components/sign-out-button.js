"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    async function signOutUser() {
        await fetch("/api/logout", {
            method: "POST"
        });

        router.push("/login");
    }

    return(
        <button 
        onClick={signOutUser}
        className="bg-yellow-400 px-3 py-1 rounded shadow-lg text-black hover:bg-yellow-300">
            Sign Out
        </button>
    );
}