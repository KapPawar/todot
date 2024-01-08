"use client";
import { Note as NoteModel } from "@prisma/client";
import React, { use, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AddEditNoteDialogue from "./AddEditNoteDialogue";

type NoteProps = {
  note: NoteModel;
};

const Note = ({ note }: NoteProps) => {
  const [showEditDialogue, setShowEditDialogue] = useState(false);
  const wasUpdated = note.updatedAt > note.createdAt;

  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setShowEditDialogue(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && " (updated)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>
      <AddEditNoteDialogue
        open={showEditDialogue}
        setOpen={setShowEditDialogue}
        noteToEdit={note}
        type="Update"
      />
    </>
  );
};

export default Note;
