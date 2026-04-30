import LeftAuthForm from "./_components/LeftAuthForm";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex">
      <aside className="basis-1/2">
        <LeftAuthForm />
      </aside>
      <aside className="basis-1/2 bg-surface flex items-center px-24">
        {children}
      </aside>
    </div>
  );
}
