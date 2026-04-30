import Hero from "./_components/Hero";
import Pricing from "./_components/Pricing";
import ReadyToMakeSomething from "./_components/ReadyToMakeSomething";
import RealPeopleRealThings from "./_components/RealPeopleRealThings";
import ThreeStepsThatsIt from "./_components/ThreeStepsThatsIt";
import TrustedByMakers from "./_components/TrustedByMakers";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedByMakers />
      <RealPeopleRealThings />
      <ThreeStepsThatsIt />
      <Pricing />
      <ReadyToMakeSomething />
    </>
  );
}
