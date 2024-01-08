"use client";
import AddEditNoteDialogue from "@/components/shared/AddEditNoteDialogue";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import AIChatButton from "@/components/shared/AIChatButton";

const NavBar = () => {
  const [showAddEditNoteDialogue, setShowAddEditNoteDialogue] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/notes" className="flex items-center gap-1">
            <Image src="/assets/logo.png" alt="logo" width={40} height={40} />
            <span className="font-semibold">ToDot</span>
          </Link>
          <div className="flex items-center gap-2">
            <AIChatButton />
            <Button
              className="size-15 rounded-full"
              onClick={() => setShowAddEditNoteDialogue(true)}
            >
              <Plus size={15} className="text-gray-80 mr-2" />
              Add Note
            </Button>
            <ThemeToggle />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
              }}
            />
          </div>
        </div>
      </div>
      <AddEditNoteDialogue
        open={showAddEditNoteDialogue}
        setOpen={setShowAddEditNoteDialogue}
        type="Add"
      />
    </>
  );
};

export default NavBar;
