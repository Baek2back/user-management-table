"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditUserDialog } from "@/features/users/components/edit-user-dialog";
import { useUsersActionsContext } from "@/features/users/context";
import { MoreVerticalIcon } from "lucide-react";

type ActionsDropdownMenuProps = {
  userId: number;
};

export const ActionsDropdownMenu = ({ userId }: ActionsDropdownMenuProps) => {
  const { deleteUser } = useUsersActionsContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="icon">
          <MoreVerticalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <EditUserDialog userId={userId} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-colorError"
          onClick={() => {
            deleteUser(userId);
          }}
        >
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
