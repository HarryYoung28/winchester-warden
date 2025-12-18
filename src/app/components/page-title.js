export default function PageTitle({ children }) {
  return (
    <h1 className="text-2xl font-semibold absolute top-4">
      {children}
    </h1>
  );
}