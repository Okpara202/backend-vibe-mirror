import ProjectHome from "./_components/ProjectHome";

export default async function ProjectHomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectHome projectId={id} />;
}
