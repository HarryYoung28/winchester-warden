import HeaderBar from "@/app/components/header-bar";
import SignOutButton from "@/app/components/sign-out-button";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen">
            <HeaderBar
            right={<SignOutButton></SignOutButton>}
            ></HeaderBar>
            {children}
        </div>
    );
}