import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { GITHUB_REPO_URL } from "@/utils/constants";

function ContributeBox() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-10 font-medium text-lg md:text-xl">
        Have ideas to make cairovm.codes better?
      </h2>
      <Link href={GITHUB_REPO_URL}>
        <Button size={"padded"} variant={"contribute"}>
          Contribute on GitHub
        </Button>
      </Link>
    </div>
  );
}

export default ContributeBox;
