import type { Metadata } from "next";
import Faqs from "@/components/Faqs";
import LetsTalk from "@/components/LetsTalk";
import ServicesHero from "@/components/ServicesHero";
import ServicesScrollStack from "@/components/ServicesScrollStack";
import ComplianceHowWeWork from "@/components/services/ComplianceHowWeWork";
import { SERVICES_PAGE_FAQS } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "One team for strategy, research, operations, and compliance: clarity for every decision you need help making.",
};

export default function ServicesPage() {
  return (
    <main className="service-detail">
      <ServicesHero />
      <ServicesScrollStack />
      <ComplianceHowWeWork />
      <Faqs items={SERVICES_PAGE_FAQS} />
      <LetsTalk />
    </main>
  );
}
