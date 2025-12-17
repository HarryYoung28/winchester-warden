import Link from "next/link";

export default function LoginPage() {
  return (
    // main content will be centered in a flexbox style, with items being in the center with 
    // space between elements
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
                    className="border w-xs" 
                    placeholder={"e.g.123456"}>
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
                    className="border w-xs" 
                    placeholder={"example"}>
                </input>
                <Link href="/login/forgot-password" className="text-sm text-cyan-400">
                        Forgot Password?
                </Link>
            </div>
            <button className="bg-green-500 p-1 rounded shadow-lg text-black">
                Sign In
            </button>
        </div>
    </div>
  );
}