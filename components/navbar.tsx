"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSession } from "@/lib/auth/auth-client";
import SignOutButton from "./sign-out-btn";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href={"/dashboard"}>
                <Button
                  variant={"ghost"}
                  className={"text-gray-700 hover:text-black"}
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger
                  nativeButton={false}
                  render={
                    <Avatar>
                      <AvatarFallback className={"bg-primary text-white"}>
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  }
                />
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div>
                        <p>{session.user.name}</p>
                        <p>{session.user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <SignOutButton />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Log in
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90">
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
