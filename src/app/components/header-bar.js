export default function HeaderBar({ left, center, right }) {
  return (
    <header className="w-full flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="flex items-center gap-2">
        {left}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        {center}
      </div>
      <div className="flex items-center gap-2">
        {right}
      </div>
    </header>
  );
}