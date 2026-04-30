import LeftAuthForm from "./_components/LeftAuthForm";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      <aside className="hidden lg:block lg:basis-1/2">
        <LeftAuthForm />
      </aside>
      <aside className="w-full lg:basis-1/2 bg-surface flex items-center px-6 sm:px-10 md:px-16 lg:px-24 py-12 lg:py-0">
        {children}
      </aside>
    </div>
  );
}
