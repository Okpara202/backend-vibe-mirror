import { Typography } from "@/components/ui/Typography";

const ProjectsHistory = [
  {
    title: "Create a simple book for me",
    time: 3,
    desc: "Vibe Craft is an AI tool used for creating awesome Ideas",
    units: "minutes",
  },
  {
    title: "Create a simple book for me",
    desc: "Indic8 is a beginner friendly market indicator that leverages the power and speed of AI",
    time: 3,
    units: "seconds",
  },
  {
    title: "Create a simple book for me",
    desc: "The star fox’s dream is a journey through the cosmos, chasing shimmering galaxies.",
    time: 3,
    units: "hours",
  },
  {
    title: "Create a simple book for me",
    time: 3,
    desc: "The star fox’s dream is a journey through the cosmos, chasing shimmering galaxies.",
    units: "month",
  },
];

export default function ProjectHistory() {
  const history = ProjectsHistory.map((history, index) => (
    <div
      key={index}
      className="rounded-[12px] border border-subtle p-5 flex flex-col justify-between min-h-52 hover:cursor-pointer hover:bg-surface transition-all duration-300"
    >
      <aside className="">
        <Typography variant="label-md" className="text-primary">
          {history.title}
        </Typography>
        <Typography variant="body-sm" className="text-input-helper">
          {history.desc}
        </Typography>
      </aside>

      <aside>
        <Typography variant="body-sm" className="text-input-helper">
          Updated {history.time} {history.units} ago
        </Typography>
      </aside>
    </div>
  ));
  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {history}
    </section>
  );
}
