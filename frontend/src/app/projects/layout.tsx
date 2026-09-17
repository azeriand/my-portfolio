import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects built by Andrea Romera, including live demos and source code.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
