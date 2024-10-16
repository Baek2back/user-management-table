import type { env } from "@/env";
import type { User } from "@/features/users/types";
import { createContext } from "@/lib/create-context";
import { useMemo, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

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

const defaultUsersState: UsersState = [
  {
    id: 1,
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    registerDate: new Date("2024-10-02T00:00:00.000"),
    job: "개발자",
    hasAgreedToEmailReceive: true,
  },
  {
    id: 2,
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    registerDate: new Date("2024-10-01T00:00:00.000"),
    job: "PO",
    hasAgreedToEmailReceive: false,
  },
];

const UsersContext = ({ storage, children }: UsersContextProps) => {
  const [memoryState, setMemoryState] = useState<UsersState>(defaultUsersState);
  const [persistedState, setPersistedState] = useLocalStorageState("users", {
    defaultValue: () => defaultUsersState,
  });

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

  const persistedStateActions = useMemo<UsersActions>(
    () => ({
      addUser: (user) => {
        setPersistedState((prevState) => [...prevState, user]);
      },
      editUser: (userId, toUpdateUser) => {
        setPersistedState((prevState) =>
          prevState.map((user) =>
            user.id === userId ? { ...user, ...toUpdateUser } : user,
          ),
        );
      },
      deleteUser: (userId) => {
        setPersistedState((prevState) =>
          prevState.filter((user) => user.id !== userId),
        );
      },
    }),
    [setPersistedState],
  );

  return (
    <UsersActionsProvider
      value={
        storage === "in-memory" ? memoryStateActions : persistedStateActions
      }
    >
      <UsersValueProvider
        value={storage === "in-memory" ? memoryState : persistedState}
      >
        {children}
      </UsersValueProvider>
    </UsersActionsProvider>
  );
};

export { useUsersValueContext, useUsersActionsContext, UsersContext };
