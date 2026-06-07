import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DineReady — Order on the way. Eat the moment you arrive.",
  description:
    "Reserve a table, pick your meal while commuting. DineReady syncs your GPS with the kitchen so every dish lands the moment you sit down.",
  keywords: [
    "dine-in ordering",
    "restaurant pre-order",
    "food ordering app",
    "table reservation",
    "DineReady",
  ],
};

export default function DineReadyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
