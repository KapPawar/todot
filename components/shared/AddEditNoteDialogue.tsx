import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import LoadingButton from "./LoadingButton";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";

type AddEditNoteDialogueProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
  type?: string;
};

const AddEditNoteDialogue = ({
  open,
  setOpen,
  noteToEdit,
  type,
}: AddEditNoteDialogueProps) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  async function onSubmit(input: CreateNoteSchema) {
    try {
      if (noteToEdit) {
        const response = await fetch("/api/notes/", {
          method: "PUT",
          body: JSON.stringify({
            ...input,
            id: noteToEdit.id,
          }),
        });

        if (!response.ok) throw Error("Status Code: " + response.status);
      } else {
        const response = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(input),
        });
        if (!response.ok) throw Error("Status Code: " + response.status);
        form.reset();
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong! Please try again.");
    }
  }

  async function onDelete() {
    if (!noteToEdit) return;
    setDeleting(true);
    try {
      const response = await fetch("/api/notes", {
        method: "DELETE",
        body: JSON.stringify({
          id: noteToEdit.id,
        }),
      });

      if (!response.ok) throw Error("Status Code: " + response.status);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong! Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">{type} Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Note Title</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Note Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Note Content</FormLabel> */}
                  <FormControl>
                    <Textarea placeholder="Note Content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col gap-1 sm:gap-0">
              <LoadingButton
                className="w-full rounded-full"
                type="submit"
                loading={form.formState.isSubmitting}
              >
                {type}
              </LoadingButton>
              {noteToEdit && (
                <LoadingButton
                  variant="destructive"
                  className="w-full rounded-full"
                  type="button"
                  loading={deleting}
                  onClick={onDelete}
                  disabled={form.formState.isSubmitting}
                >
                  Delete
                </LoadingButton>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditNoteDialogue;
