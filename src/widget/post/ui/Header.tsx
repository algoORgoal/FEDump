import React from "react";
import Logo from "@/public/icon.svg";
import GithubLogo from "@/public/github-mark.svg";
import LinkedInLogo from "@/public/linkedin-mark.svg";
import Link from "next/link";
import { Separator } from "@/src/shared/ui/separator";

export function Header() {
  return (
    <header className="flex flex-row items-center gap-x-1 justify-between w-full h-auto">
      <Link
        href="/"
        className="flex flex-row justify-start items-center w-auto h-12"
      >
        <div className=" font-bold text-2xl">FE Dump</div>
        <Logo width={48} height={48} />
      </Link>
      <div className="flex flex-row justify-center items-center w-auto h-12">
        <a
          href="https://github.com/algoORgoal"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center"
        >
          <GithubLogo />
        </a>
        <Separator orientation="vertical" className="w-[2px]" />
        <a
          href="https://www.linkedin.com/in/byeolchan-kim-206b1a13a"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center"
        >
          <LinkedInLogo />
        </a>
      </div>
    </header>
  );
}
