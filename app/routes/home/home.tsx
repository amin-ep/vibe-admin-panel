import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vibe Admin | Home" },
    { name: "description", content: "Welcome to Vibe Admin Panel" },
  ];
}

export default function Home() {
  return (
    <div className="">
      <PageHeading title="Home" />
    </div>
  );
}
