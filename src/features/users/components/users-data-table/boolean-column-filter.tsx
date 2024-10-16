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

  const sortedUniqueFilterValues: boolean[] = useMemo(
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
      {sortedUniqueFilterValues.length === 0 ? null : (
        <PopoverContent align="start">
          <div className="flex flex-col gap-2">
            {sortedUniqueFilterValues.map((item, index) => {
              const id = item ? "선택됨" : "선택 안함";

              return (
                <div key={id}>
                  <Checkbox
                    id={id}
                    defaultChecked={columnFilterValue?.[index] === item}
                    onCheckedChange={(checkedState) => {
                      if (checkedState) {
                        column.setFilterValue((filterValue?: boolean[]) => [
                          ...(filterValue ?? []),
                          item,
                        ]);
                      } else {
                        column.setFilterValue((filterValue?: boolean[]) => {
                          return (filterValue ?? []).filter(
                            (value) => value !== item,
                          );
                        });
                      }
                    }}
                  />
                  <label htmlFor={id}>{id}</label>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
