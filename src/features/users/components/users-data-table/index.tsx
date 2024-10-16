"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/users/components/users-data-table/columns";
import { useUsersValueContext } from "@/features/users/context";

export const UsersDataTable = () => {
  const users = useUsersValueContext();

  return <DataTable columns={columns} data={users} />;
};
