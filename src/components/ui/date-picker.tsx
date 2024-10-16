import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type DatePickerProps = {
  value?: Date;
  onChange: (date?: Date) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
};

export const DatePicker = ({
  value,
  onChange,
  onBlur,
  className,
  placeholder,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex h-[32px] w-[160px] items-center justify-between rounded-[8px] border-colorBorder bg-white px-[12px] py-[5px] text-base-normal hover:border-colorPrimary",
            !value && "text-colorTextPlaceholder",
            className,
          )}
        >
          {value ? format(value, "yyyy-MM-dd") : <span>{placeholder}</span>}
          <CalendarIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
          }}
          onDayBlur={onBlur}
        />
      </PopoverContent>
    </Popover>
  );
};
