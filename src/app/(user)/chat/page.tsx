import ChatProjectsHeader from "../_components/ChatProjectsHeader";
import ChatHistory from "./_components/ChatHistory";

export default function ChatPage() {
  return (
    <section className="pt-20 pb-10 lg:py-10 w-[90%] mx-auto max-w-3xl space-y-5">
      <ChatProjectsHeader
        mode="chat"
        page="Chats"
        placeholder="Search your chats..."
        buttonText="New Chat"
      />

      <ChatHistory />
    </section>
  );
}
