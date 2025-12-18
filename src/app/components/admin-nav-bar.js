import Link from "next/link";

export default function AdminNavBar() {
  return (
    <nav className="absolute top-4 left-4 flex gap-2">
      <Link
        href="/admin/dashboard"
        className="bg-winchester-purple px-3 py-1 rounded shadow text-white"
      >
        Dashboard
      </Link>

      <Link
        href="/admin/warden-management"
        className="bg-winchester-purple px-3 py-1 rounded shadow text-white"
      >
        Warden Management
      </Link>
    </nav>
  );
}