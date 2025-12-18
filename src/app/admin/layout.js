import AdminNavBar from "@/app/components/admin-nav-bar";
import HeaderBar from "@/app/components/header-bar";
import SignOutButton from "@/app/components/sign-out-button";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen">
            <HeaderBar 
            left={<AdminNavBar></AdminNavBar>}
            right={<SignOutButton></SignOutButton>}
            ></HeaderBar>
            {children}
        </div>
    );
}