"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionsDropdownMenu } from "@/features/users/components/users-data-table/actions-dropdown-menu";
import { useUsersActionsContext } from "@/features/users/context";
import { userSchemaKeys } from "@/features/users/schemas";
import type { User } from "@/features/users/types";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { type HTMLProps, useEffect, useRef, useState } from "react";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    id: userSchemaKeys.name,
    accessorKey: userSchemaKeys.name,
    header: "이름",
    filterFn: "arrIncludesSome",
    cell: ({ getValue, row }) => {
      const { editUser } = useUsersActionsContext();
      const initialValue = getValue<User["name"]>();

      const [value, setValue] = useState(initialValue);

      const onBlur = () => {
        const userId = row.original.id;
        editUser(userId, { ...row.original, name: value });
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={onBlur}
        />
      );
    },
    meta: {
      filterVariant: "string",
    },
  },
  {
    id: userSchemaKeys.address,
    accessorKey: userSchemaKeys.address,
    header: "주소",
    filterFn: "arrIncludesSome",
    cell: ({ getValue, row }) => {
      const { editUser } = useUsersActionsContext();
      const initialValue = getValue<User["address"]>();

      const [value, setValue] = useState(initialValue);

      const onBlur = () => {
        const userId = row.original.id;
        editUser(userId, { ...row.original, address: value });
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={onBlur}
        />
      );
    },
    meta: {
      filterVariant: "string",
    },
  },
  {
    id: userSchemaKeys.memo,
    accessorKey: userSchemaKeys.memo,
    header: "메모",
    filterFn: "arrIncludesSome",
    cell: ({ getValue, row }) => {
      const { editUser } = useUsersActionsContext();
      const initialValue = getValue<User["memo"]>();

      const [value, setValue] = useState(initialValue);

      const onBlur = () => {
        const userId = row.original.id;
        editUser(userId, { ...row.original, memo: value });
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={onBlur}
        />
      );
    },
    meta: {
      filterVariant: "string",
    },
  },
  {
    id: userSchemaKeys.registerDate,
    accessorKey: userSchemaKeys.registerDate,
    header: "가입일",
    filterFn: (row, columnId, filterValue: Date[]) => {
      if (filterValue.length === 0) {
        return true;
      }
      return filterValue.includes(row.getValue(columnId));
    },
    cell: ({ getValue, row }) => {
      const { editUser } = useUsersActionsContext();
      const initialValue = getValue<User["registerDate"]>();

      const [value, setValue] = useState<typeof initialValue | undefined>(
        initialValue,
      );

      const onBlur = () => {
        const userId = row.original.id;
        editUser(userId, { ...row.original, registerDate: value });
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <DatePicker
          value={value}
          onChange={(date) => setValue(date)}
          onBlur={onBlur}
          placeholder="날짜를 입력해주세요"
        />
      );
    },
    meta: {
      filterVariant: "Date",
    },
  },
  {
    id: userSchemaKeys.job,
    accessorKey: userSchemaKeys.job,
    header: "직업",
    filterFn: "arrIncludesSome",
    cell: ({ getValue, row }) => {
      const { editUser } = useUsersActionsContext();
      const initialValue = getValue<User["job"]>();

      const [value, setValue] = useState(initialValue);

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <Select
          value={value}
          onValueChange={(value) => {
            const userId = row.original.id;
            const job = value as User["job"];

            setValue(job);
            editUser(userId, { ...row.original, job });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="직업을 선택해주세요" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="개발자">개발자</SelectItem>
            <SelectItem value="PO">PO</SelectItem>
            <SelectItem value="디자이너">디자이너</SelectItem>
          </SelectContent>
        </Select>
      );
    },
    meta: {
      filterVariant: "string",
    },
  },
  {
    id: userSchemaKeys.hasAgreedToEmailReceive,
    accessorKey: userSchemaKeys.hasAgreedToEmailReceive,
    header: "이메일 수신 동의",
    filterFn: (row, columnId, filterValue: boolean[]) => {
      if (filterValue.length === 0) {
        return true;
      }

      return filterValue.includes(row.getValue(columnId));
    },
    cell: ({ getValue, row }) => {
      const { editUser } = useUsersActionsContext();
      const initialValue = getValue<User["hasAgreedToEmailReceive"]>();

      const [value, setValue] = useState(initialValue);

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <Checkbox
          checked={value}
          onCheckedChange={(value) => {
            const userId = row.original.id;
            const hasAgreedToEmailReceive =
              value as User["hasAgreedToEmailReceive"];
            setValue(hasAgreedToEmailReceive);

            editUser(userId, {
              ...row.original,
              hasAgreedToEmailReceive,
            });
          }}
        />
      );
    },
    meta: {
      filterVariant: "boolean",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userId = row.original.id;
      return <ActionsDropdownMenu userId={userId} />;
    },
  },
];

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(className, "cursor-pointer")}
      {...rest}
    />
  );
}
