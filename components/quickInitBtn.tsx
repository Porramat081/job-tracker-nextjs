"use client";

import { Button } from "./ui/button";
import { createUserBoard } from "@/app/dashboard/actions";

export default function QuickInitBtn() {
  return <Button onClick={createUserBoard}>Create New Board</Button>;
}
