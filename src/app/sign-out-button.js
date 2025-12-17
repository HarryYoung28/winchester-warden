"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    function signOutUser() {
        router.push("/login");
    }

    return(
        // placeholder logic for now
        <button 
        onClick={signOutUser}
        className="bg-yellow-400 p-1 rounded shadow-lg text-black">
            Sign Out
        </button>
    );
}