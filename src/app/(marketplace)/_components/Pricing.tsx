import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import CheckSvgIcon from "./CheckIcon";

const pricingPlans = [
  {
    name: "Free",
    price: 0,
    desc: "Get a plan for any idea. Export to any AI tool",
    benefits: [
      "Unlimited idea plans",
      "Export to Claude, Cursor, ChatGPT",
      "All four creation types",
      "Community support",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Beginner",
    price: 19,
    desc: "Vibe builds it for you. Iterate by conversation.",
    benefits: [
      "Everything in Free",
      "Integrated AI builder",
      "Persistent projects",
      "One-tap publishing",
    ],
    buttonText: "Start Making",
  },
  {
    name: "Pro",
    price: 49,
    desc: "Autonomous builds. Monetisation intelligence",
    benefits: [
      "Everything in Beginner",
      "Autonomous AI agents",
      "Revenue suggestions",
      "Custom domains",
      "Priority support",
    ],
    buttonText: "See What Pro Can Do",
  },
];

export default function Pricing() {
  const pricingCard = pricingPlans.map((plan) => (
    <div
      key={plan.name}
      className={`bg-surface border ${plan.name === "Beginner" ? "border-brand" : "border-subtle"} py-8 px-5 rounded-[12px] flex flex-col justify-between gap-5 hover:scale-105 transition-all duration-300 relative`}
    >
      {plan.name === "Beginner" && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand text-white px-5 py-2 rounded-full">
          <Typography variant="caption-default" className="text-[#FFFFFF]">
            Most Popular
          </Typography>
        </div>
      )}
      <aside className="flex flex-col items-start gap-5">
        <Typography variant="heading-h4" className="text-primary">
          {plan.name}
        </Typography>

        {plan.price === 0 ? (
          <Typography variant="heading-h1" className="text-primary">
            ${plan.price}
          </Typography>
        ) : (
          <div className="flex items-baseline">
            <Typography variant="heading-h1" className="text-primary">
              ${plan.price}
            </Typography>
            <Typography variant="body-sm" className="text-secondary">
              /mo
            </Typography>
          </div>
        )}

        <Typography variant="body-sm" className="text-secondary">
          {plan.desc}
        </Typography>

        <div className="space-y-4">
          {plan.benefits.map((benefit) => (
            <Typography
              key={benefit}
              variant="body-sm"
              className="flex items-center gap-3 text-secondary"
            >
              <CheckSvgIcon />
              {benefit}
            </Typography>
          ))}
        </div>
      </aside>
      <Button variant={plan.name === "Beginner" ? "default" : "outline"}>
        <Typography
          className={
            plan.name === "Beginner" ? "text-[#FFFFFF]" : "text-primary"
          }
          variant="label-lg"
        >
          {plan.buttonText}
        </Typography>
      </Button>
    </div>
  ));

  return (
    <section id="pricing" className="bg-canvas general-border">
      <div className="w-[90%] py-16 lg:py-24 space-y-10 mx-auto">
        <Typography variant="display-section">
          <span className="text-primary">Start Free.</span>{" "}
          <span className="text-brand">Grow</span>{" "}
          <span className="text-primary">when ready.</span>
        </Typography>

        <Typography variant="heading-h4" className="text-secondary">
          No credit card. No trial that expires.
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingCard}
        </div>
      </div>
    </section>
  );
}
