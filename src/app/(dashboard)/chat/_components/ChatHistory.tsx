import { Typography } from "@/components/ui/Typography";

const History = [
  {
    title: "Create a simple book for me",
    time: 3,
    units: "minutes",
  },
  {
    title: "Create a simple book for me",
    time: 3,
    units: "seconds",
  },
  {
    title: "Create a simple book for me",
    time: 3,
    units: "hours",
  },
  {
    title: "Create a simple book for me",
    time: 3,
    units: "days",
  },
];

export default function ChatHistory() {
  const historyChat = History.map((chatHistory, index) => (
    <div
      key={index}
      className="py-5 general-border hover:px-5 flex flex-col cursor-pointer hover:bg-surface transition-all duration-300"
    >
      <Typography variant="label-md" className="text-primary">
        {chatHistory.title}
      </Typography>
      <Typography variant="label-md" className="text-input-helper">
        {` Last message ${chatHistory.time} ${chatHistory.units} ago`}
      </Typography>
    </div>
  ));
  return <section>{historyChat}</section>;
}
