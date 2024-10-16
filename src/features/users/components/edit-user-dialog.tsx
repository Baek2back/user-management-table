"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditUserForm } from "@/features/users/components/edit-user-form";
import { useUsersValueContext } from "@/features/users/context";
import React from "react";
import { useState } from "react";

type EditUserDialogProps = {
  userId: number;
};

export const EditUserDialog = ({ userId }: EditUserDialogProps) => {
  const [open, setOpen] = useState(false);

  const users = useUsersValueContext();

  const currentUser = users.find((user) => user.id === userId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-[4px] text-base-normal">수정</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원 정보 수정</DialogTitle>
          <DialogDescription className="sr-only">
            수정하고 싶은 정보들을 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          initialValues={currentUser ?? {}}
        />
      </DialogContent>
    </Dialog>
  );
};
