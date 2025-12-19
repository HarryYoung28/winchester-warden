import Link from "next/link";

export default function AdminNavBar() {
  return (
    <nav className="flex flex-col lg:flex-row gap-2">
      <Link
        href="/admin/dashboard"
        className="bg-winchester-purple px-3 py-1 rounded shadow text-white hover:bg-winchester-purple-tint"
      >
        Dashboard
      </Link>

      <Link
        href="/admin/warden-management"
        className="bg-winchester-purple px-3 py-1 rounded shadow text-white hover:bg-winchester-purple-tint"
      >
        Warden Management
      </Link>
    </nav>
  );
}