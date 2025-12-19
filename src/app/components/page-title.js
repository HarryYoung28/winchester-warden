export default function PageTitle({ children }) {
  return (
    <h1 className="text-xl text-center md:text-2xl font-semibold md:absolute md:top-4">
      {children}
    </h1>
  );
}