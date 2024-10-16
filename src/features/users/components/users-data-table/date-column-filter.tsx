import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Column } from "@tanstack/react-table";
import { format } from "date-fns";
import { ListFilter } from "lucide-react";
import { useMemo } from "react";

type DateColumnFilterProps = {
  column: Column<any, unknown>;
};

export const DateColumnFilter = ({ column }: DateColumnFilterProps) => {
  const columnFilterValue = column.getFilterValue() as Date[];

  const sortedUniqueFilterValues: Date[] = useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys())
        .filter((value) => ![null, undefined].includes(value))
        .sort(),
    [column.getFacetedUniqueValues()],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="flex w-full justify-between border border-colorSplit border-none bg-colorFillAlter p-[8px] text-base-strong text-colorText"
          variant="filter"
        >
          {column.columnDef.header as string}
          <ListFilter size={12} />
        </Button>
      </PopoverTrigger>
      {sortedUniqueFilterValues.length === 0 ? null : (
        <PopoverContent align="start">
          <div className="flex flex-col gap-2">
            {sortedUniqueFilterValues.map((item, index) => {
              const id = format(item, "yyyy-MM-dd");

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
                        column.setFilterValue((filterValue?: Date[]) => [
                          ...(filterValue ?? []),
                          item,
                        ]);
                      } else {
                        column.setFilterValue((filterValue?: Date[]) =>
                          (filterValue ?? []).filter((value) => value !== item),
                        );
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
