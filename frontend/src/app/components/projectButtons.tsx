"use client";

import { Button } from "azeriand-library";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";

interface ProjectButtonsProps {
  pageUrl: string;
  repoUrl: string;
  color: "blue" | "purple";
}

export default function ProjectButtons({ pageUrl, repoUrl, color }: ProjectButtonsProps) {
  const openPage = () => window.open(pageUrl);
  const openRepo = () => window.open(repoUrl);

  const primaryStyle = { color: 'white' };
  const ghostStyle = color === "blue" ? { color: 'var(--text-blue)' } : { color: 'var(--text-purple)' };

  return (
    <div className="flex gap-x-2">
      <Button 
        appearance="mate" 
        label="Open" 
        color={color} 
        intensity={800} 
        icon={<FaArrowUpRightFromSquare/>} 
        style={primaryStyle} 
        onClick={openPage}
      />
      <Button 
        appearance='ghost' 
        label="Repo" 
        color={color} 
        intensity={800} 
        icon={<FaGithub/>} 
        style={ghostStyle} 
        onClick={openRepo}
      />
    </div>
  );
}
