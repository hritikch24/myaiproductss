"use client";

import { useState, useSyncExternalStore } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  name: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  name,
  id,
  required,
  placeholder = "Pick a date",
  minDate,
  maxDate,
}: DatePickerProps) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div>
        <input
          type="hidden"
          name={name}
          value=""
          required={required}
        />
        <Button
          id={id}
          type="button"
          variant="outline"
          className="w-full justify-start text-left font-normal border-input bg-transparent hover:bg-transparent dark:bg-input/30 dark:border-input h-9"
          suppressHydrationWarning
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{placeholder}</span>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={date ? format(date, "yyyy-MM-dd") : ""}
        required={required}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-input bg-transparent hover:bg-transparent dark:bg-input/30 dark:border-input h-9",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            {date ? (
              <span className="text-foreground">
                {format(date, "dd MMMM yyyy")}
              </span>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-slate-900 border-slate-700 text-white" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
            }}
            disabled={(d) => {
              if (minDate && d < minDate) return true;
              if (maxDate && d > maxDate) return true;
              return false;
            }}
            classNames={{
              root: "text-white",
              months: "text-white",
              month: "text-white",
              caption_label: "text-white font-medium text-sm",
              nav: "text-white",
              button_previous: "text-white hover:bg-slate-800",
              button_next: "text-white hover:bg-slate-800",
              weekdays: "flex w-full",
              weekday: "text-slate-400 flex-1 text-center text-xs font-medium py-2",
              week: "flex w-full mt-2",
              week_number: "text-slate-500 text-xs",
              day: "text-white",
              range_start: "bg-blue-600 text-white rounded-l-md",
              range_end: "bg-blue-600 text-white rounded-r-md",
              range_middle: "bg-blue-900/50 text-white",
              outside: "text-slate-600",
              disabled: "text-slate-600 opacity-50",
              today: "bg-blue-600 text-white font-bold",
              selected: "bg-blue-600 text-white",
            }}
            formatters={{
              formatWeekdayName: (date) => date.toLocaleDateString("en-IN", { weekday: "short" }),
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
