import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Column } from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo } from "react";

type DateColumnFilterProps = {
  column: Column<any, unknown>;
};

export const DateColumnFilter = ({ column }: DateColumnFilterProps) => {
  const columnFilterValue = column.getFilterValue() as Date[];

  const uniqueFilterValues: Date[] = useMemo(
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
                <div key={format(item, "yyyy-MM-dd")}>
                  <Checkbox
                    id={format(item, "yyyy-MM-dd")}
                    defaultChecked={columnFilterValue?.[index] === item}
                    onCheckedChange={(value) => {
                      if (value) {
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
                  <label htmlFor={format(item, "yyyy-MM-dd")}>
                    {format(item, "yyyy-MM-dd")}
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
