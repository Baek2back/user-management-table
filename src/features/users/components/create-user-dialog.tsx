"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUserForm } from "@/features/users/components/create-user-form";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon size={16} />
          추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원 추가</DialogTitle>
          <DialogDescription className="sr-only">
            회원 추가에 필요한 정보들을 입력합니다.
          </DialogDescription>
        </DialogHeader>
        <CreateUserForm
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
