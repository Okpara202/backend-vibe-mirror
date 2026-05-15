import ProjectScope from "./_components/ProjectScope";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <ProjectScope projectId={id} />
      {children}
    </>
  );
}
