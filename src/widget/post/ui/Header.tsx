import React from "react";
import Logo from "@/public/icon.svg";
import GithubLogo from "@/public/github-mark.svg";
import LinkedInLogo from "@/public/linkedin-mark.svg";
import Link from "next/link";
import { Separator } from "@/src/shared/ui/separator";

export function Header() {
  return (
    <header className="flex h-auto w-full flex-row items-center justify-between gap-x-1">
      <Link
        href="/"
        className="flex h-12 w-auto flex-row items-center justify-start"
      >
        <div className="text-2xl font-bold">FE Dump</div>
        <Logo width={48} height={48} />
      </Link>
      <div className="flex h-12 w-auto flex-row items-center justify-center">
        <a
          href="https://github.com/algoORgoal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center"
        >
          <GithubLogo />
        </a>
        <Separator orientation="vertical" className="w-[2px]" />
        <a
          href="https://www.linkedin.com/in/byeolchan-kim-206b1a13a"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center"
        >
          <LinkedInLogo />
        </a>
      </div>
    </header>
  );
}
