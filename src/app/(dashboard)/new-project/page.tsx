import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Typography } from "@/components/ui/Typography";

export default function NewProject() {
  return (
    <section className="pt-20 pb-10 lg:py-10 w-[90%] mx-auto max-w-xl space-y-5">
      <Typography variant="display-section" className="text-primary text-left">
        Create a personal project
      </Typography>

      <Input
        label="What are you working on?"
        placeholder="Name your Project"
        type="text"
        className="bg-surface"
      />

      <TextArea
        label="What are you trying to achieve?"
        placeholder="Describe your project, goals, subjects, etc..."
        className="bg-surface"
      />

      <div className="flex gap-3 justify-end">
        <Button className="bg-transparent" variant={"outline"}>
          Cancel
        </Button>
        <Button variant={"default"}>Create Project</Button>
      </div>
    </section>
  );
}
