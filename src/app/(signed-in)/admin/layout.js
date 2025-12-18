import AdminNavBar from "@/app/components/admin-nav-bar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen relative pt-16">
            <AdminNavBar/>
            {children}
        </div>
    )
}