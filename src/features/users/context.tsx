import type { env } from "@/env";
import type { User } from "@/features/users/types";
import { createContext } from "@/lib/create-context";
import { useMemo, useState } from "react";

type UsersState = User[];

type UsersActions = {
  addUser: (user: User) => void;
  editUser: (userName: string, user: Partial<User>) => void;
  deleteUser: (userName: string) => void;
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
  const [state, setState] = useState<UsersState>([]);

  const actions = useMemo<UsersActions>(
    () => ({
      addUser: (user) => {
        setState((prevState) => [...prevState, user]);
      },
      editUser: (userName, toUpdateUser) => {
        setState((prevState) =>
          prevState.map((user) =>
            user.name === userName ? { ...user, ...toUpdateUser } : user,
          ),
        );
      },
      deleteUser: (userName) => {
        setState((prevState) =>
          prevState.filter((user) => user.name !== userName),
        );
      },
    }),
    [],
  );

  return (
    <UsersActionsProvider value={actions}>
      <UsersValueProvider value={state}>{children}</UsersValueProvider>
    </UsersActionsProvider>
  );
};

export { useUsersValueContext, useUsersActionsContext, UsersContext };
