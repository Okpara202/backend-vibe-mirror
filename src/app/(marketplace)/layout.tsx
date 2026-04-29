import MarketPlaceHeader from "./_components/Header";

export default function MarketPlaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MarketPlaceHeader />
      {children}
    </div>
  );
}
