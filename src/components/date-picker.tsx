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
  defaultDate?: Date;
}

export function DatePicker({
  name,
  id,
  required,
  placeholder = "Pick a date",
  minDate,
  maxDate,
  defaultDate,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [open, setOpen] = useState(false);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div>
        <input type="hidden" name={name} value="" required={required} />
        <Button
          id={id}
          type="button"
          variant="outline"
          className="w-full justify-start text-left font-normal h-10 rounded-xl border-white/[0.06] bg-white/[0.03] text-slate-500 hover:bg-white/[0.05] hover:text-slate-400"
          suppressHydrationWarning
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{placeholder}</span>
        </Button>
      </div>
    );
  }

  return (
    <div>
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
              "w-full justify-start text-left font-normal h-10 rounded-xl border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05]",
              date ? "text-white" : "text-slate-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
            {date ? format(date, "dd MMMM yyyy") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-white/[0.08] bg-[#0f172a] shadow-2xl shadow-black/40"
          align="start"
        >
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
            formatters={{
              formatWeekdayName: (date) =>
                date.toLocaleDateString("en-IN", { weekday: "short" }),
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
