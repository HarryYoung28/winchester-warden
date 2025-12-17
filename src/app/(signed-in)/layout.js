import SignOutButton from "../sign-out-button";

export default function SignedInLayout({ children }) {
  return (
    <div className="min-h-screen relative">
      
      {/* Top-right sign out button absolute so it is fixed there */}
      <div className="absolute top-4 right-4">
        <SignOutButton />
      </div>

      {/* apply to the pages within (signed-in) folders children */}
      {children}
    </div>
  );
}