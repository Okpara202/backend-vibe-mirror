import ChatProjectsHeader from "../_components/ChatProjectsHeader";
import ProjectHistory from "./_components/ProjectHistory";

export default function ProjectsPage() {
  return (
    <section className="pt-20 pb-10 lg:py-10 w-[90%] mx-auto max-w-3xl space-y-5">
      <ChatProjectsHeader
        mode="projects"
        page="Projects"
        placeholder="Search your projects..."
        buttonText="New Project"
      />

      <ProjectHistory />
    </section>
  );
}
