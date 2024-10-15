import type { env } from "@/env";
import type { User } from "@/features/users/types";
import { createContext } from "@/lib/create-context";
import { useMemo, useState } from "react";

type UsersState = User[];

type UsersActions = {
  addUser: (user: User) => void;
  editUser: (userId: number, user: Partial<User>) => void;
  deleteUser: (userId: number) => void;
};

type UsersContextProps = React.PropsWithChildren<{
  storage: typeof env.NEXT_PUBLIC_STORAGE;
}>;

const [UsersValueProvider, useUsersValueContext] = createContext<UsersState>({
  name: "UsersValueProvider",
  hookName: "useUsersValueContext",
  providerName: "<UsersValueProvider />",
});

const [UsersActionsProvider, useUsersActionsContext] =
  createContext<UsersActions>({
    name: "UsersActionsProvider",
    hookName: "useUsersActionsContext",
    providerName: "<UsersActionsProvider />",
  });

const UsersContext = ({ storage, children }: UsersContextProps) => {
  const [memoryState, setMemoryState] = useState<UsersState>([]);

  const memoryStateActions = useMemo<UsersActions>(
    () => ({
      addUser: (user) => {
        setMemoryState((prevState) => [...prevState, user]);
      },
      editUser: (userId, toUpdateUser) => {
        setMemoryState((prevState) =>
          prevState.map((user) =>
            user.id === userId ? { ...user, ...toUpdateUser } : user,
          ),
        );
      },
      deleteUser: (userId) => {
        setMemoryState((prevState) =>
          prevState.filter((user) => user.id !== userId),
        );
      },
    }),
    [],
  );

  return (
    <UsersActionsProvider value={memoryStateActions}>
      <UsersValueProvider value={memoryState}>{children}</UsersValueProvider>
    </UsersActionsProvider>
  );
};

export { useUsersValueContext, useUsersActionsContext, UsersContext };
