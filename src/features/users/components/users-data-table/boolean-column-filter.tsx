import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Column } from "@tanstack/react-table";
import { useMemo } from "react";

type BooleanColumnFilterProps = {
  column: Column<any, unknown>;
};

export const BooleanColumnFilter = ({ column }: BooleanColumnFilterProps) => {
  const columnFilterValue = column.getFilterValue() as boolean[];

  const uniqueFilterValues: boolean[] = useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys())
        .filter((value) => ![null, undefined].includes(value))
        .sort(),
    [column.getFacetedUniqueValues()],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-[150px]">
          {column.columnDef.header as string}
        </Button>
      </PopoverTrigger>
      {uniqueFilterValues.length === 0 ? null : (
        <PopoverContent align="start">
          <div className="flex flex-col gap-2">
            {uniqueFilterValues.map((item, index) => {
              return (
                <div key={String(item)}>
                  <Checkbox
                    defaultChecked={columnFilterValue?.[index] === item}
                    onCheckedChange={(value) => {
                      if (value) {
                        column.setFilterValue((old?: boolean[]) => [
                          ...(old ?? []),
                          item,
                        ]);
                      } else {
                        column.setFilterValue((old?: boolean[]) => {
                          return (old ?? []).filter((value) => value !== item);
                        });
                      }
                    }}
                  />
                  {item ? "선택됨" : "선택 안함"}
                </div>
              );
            })}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
