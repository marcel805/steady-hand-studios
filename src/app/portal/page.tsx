import type { Metadata } from "next";
import PortalGate from "@/components/PortalGate";

export const metadata: Metadata = {
  title: "Portal — Steady Hand Studios",
  description: "Login for vetted Steady Hand Studios contractors.",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return <PortalGate />;
}
