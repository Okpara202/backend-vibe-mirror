import DashboardChat from "@/app/(user)/dashboard/_components/DashboardChat";
import RightHeader from "@/app/(user)/dashboard/_components/RightHeader";

export default async function ProjectChatPage({
  params,
}: {
  params: Promise<{ id: string; chatId: string }>;
}) {
  const { id, chatId } = await params;
  return (
    <>
      <RightHeader />
      <DashboardChat projectId={id} chatId={chatId} />
    </>
  );
}
