import { Typography } from "@/components/ui/Typography";
import Image from "next/image";
import Avatar from "./Avatar";

const realPeopleRealThings = [
  {
    img: "/image/peopleCreatedPink.jpg",
    title: "David's bakery",
    creator: "David",
    age: 34,
    desc: "Menu, photos, online ordering. Built in 12 minutes",
    id: "Baker in Manchester",
  },
  {
    img: "/image/peopleCreatedBlue.jpg",
    title: "Elizabeth's memoir",
    creator: "Elizabeth",
    age: 68,
    desc: "Family stories, photos, chapter headings.",
    id: "Retired teacher",
  },
  {
    img: "/image/peopleCreatedGreen.jpg",
    title: "Maya's Quix",
    creator: "Maya",
    age: 11,
    desc: "World capitals quiz: 47 kids played on day one",
    id: "Student",
  },
];

export default function RealPeopleRealThings() {
  const peopleCreatedCard = realPeopleRealThings.map((creations) => (
    <div
      key={creations.creator}
      className="flex flex-col relative overflow-hidden rounded-[12px] hover:scale-105"
    >
      <Image
        src={creations.img}
        alt={`Image of ${creations.title}`}
        width={352}
        height={173}
        className="w-full h-auto object-cover"
      />
      <div className="bg-surface px-5 py-5 space-y-3">
        <Typography variant="body-sm" className="text-primary">
          {creations.title}
        </Typography>

        <Typography variant="body-sm" className="text-secondary">
          {creations.desc}
        </Typography>

        <div className="general-border"></div>

        <div className="flex gap-3 items-center">
          {/* Avatar section */}

          <aside>
            <Avatar
              name={creations.creator}
              color={
                creations.creator === "Elizabeth"
                  ? "#4ADE80"
                  : creations.creator === "Maya"
                    ? "#7E3FF2"
                    : "#F27A1A"
              }
            />
          </aside>
          <aside>
            <Typography
              variant="body-sm"
              className="text-primary"
            >{`${creations.creator}, ${creations.age}`}</Typography>
            <Typography variant="caption-default" className="text-secondary">
              {creations.id}
            </Typography>
          </aside>
        </div>
      </div>
    </div>
  ));
  return (
    <section id="gallery" className="bg-canvas general-border">
      <div className="w-[90%] py-24 space-y-10 mx-auto">
        <Typography variant="display-section">
          <span className="text-primary"> Real people, </span>{" "}
          <span className="text-brand">real things</span>
        </Typography>

        <Typography variant="heading-h4" className="text-secondary">
          Not templates. Things people actually made in minutes.
        </Typography>

        <div className="grid grid-cols-3 gap-6">{peopleCreatedCard}</div>
      </div>
    </section>
  );
}
