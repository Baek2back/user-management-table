"use client";

import { env } from "@/env";
import { CreateUserDialog } from "@/features/users/components/create-user-dialog";
import { UsersDataTable } from "@/features/users/components/users-data-table";
import { UsersContext } from "@/features/users/context";

const HomePage = () => {
  return (
    <UsersContext storage={env.NEXT_PUBLIC_STORAGE}>
      <div className="w-full">
        <div className="mx-auto h-full max-w-screen-2xl">
          <main className="flex flex-col px-6 py-8">
            <header className="flex w-full items-center justify-between px-[14px] py-2">
              <h1 className="text-colorText text-heading-5">회원 목록</h1>
              <CreateUserDialog />
            </header>
            <UsersDataTable />
          </main>
        </div>
      </div>
    </UsersContext>
  );
};

export default HomePage;
