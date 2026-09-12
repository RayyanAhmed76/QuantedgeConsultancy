import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with QuantEdgeDataSolutions about advisory, operations, research, BI, or compliance.",
};

export default function ContactPage() {
  return <ContactForm />;
}
