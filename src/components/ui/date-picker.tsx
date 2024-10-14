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
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
};

export const DatePicker = ({
  value,
  onChange,
  className,
  placeholder,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "w-full justify-start px-3 text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
