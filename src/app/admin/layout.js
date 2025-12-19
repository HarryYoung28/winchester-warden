import AdminNavBar from "../components/admin-nav-bar";
import HeaderBar from "../components/header-bar";
import PageTitle from "../components/page-title";
import SignOutButton from "../components/sign-out-button";

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