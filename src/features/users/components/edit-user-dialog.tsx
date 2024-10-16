"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditUserForm } from "@/features/users/components/edit-user-form";
import { useUsersValueContext } from "@/features/users/context";
import { forwardRef } from "react";

type EditUserDialogProps = {
  userId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const EditUserDialog = forwardRef(
  ({ userId, open, setOpen }: EditUserDialogProps, ref) => {
    const users = useUsersValueContext();

    const currentUser = users.find((user) => user.id === userId);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
  },
);
