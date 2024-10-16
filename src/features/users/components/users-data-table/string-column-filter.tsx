import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Column } from "@tanstack/react-table";
import { useMemo } from "react";

type StringColumnFilterProps = {
  column: Column<any, unknown>;
};

export const StringColumnFilter = ({ column }: StringColumnFilterProps) => {
  const columnFilterValue = column.getFilterValue() as string[];

  const uniqueFilterValues: string[] = useMemo(
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
                <div key={item}>
                  <Checkbox
                    defaultChecked={columnFilterValue?.[index] === item}
                    onCheckedChange={(value) => {
                      if (value) {
                        column.setFilterValue((old?: string[]) => [
                          ...(old ?? []),
                          item,
                        ]);
                      } else {
                        column.setFilterValue((old?: string[]) => {
                          return (old ?? []).filter((value) => value !== item);
                        });
                      }
                    }}
                  />
                  {JSON.stringify(item)}
                </div>
              );
            })}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
