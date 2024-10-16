import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Column } from "@tanstack/react-table";
import { ListFilter } from "lucide-react";
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
        <Button variant="filter" size="filter">
          {column.columnDef.header as string}
          <ListFilter size={12} />
        </Button>
      </PopoverTrigger>
      {sortedUniqueFilterValues.length === 0 ? null : (
        <PopoverContent align="start">
          <div className="flex flex-col gap-2 px-[12px]">
            {sortedUniqueFilterValues.map((item, index) => {
              const id = item ? "선택됨" : "선택 안함";

              return (
                <div
                  key={id}
                  className="flex items-center gap-[8px] px-[4px] py-[5px]"
                >
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
                  <label
                    htmlFor={id}
                    className="text-base-normal text-colorText"
                  >
                    {id}
                  </label>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
