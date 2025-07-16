"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAllCategories } from "@/hooks/categories";
import { ICategory } from "@/types/products";

interface CategorySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export default function CategorySelect({
  value,
  onValueChange,
  placeholder = "Select Category",
  label,
  error,
  disabled = false,
  className,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const { data: categories, isLoading: isLoadingCategories } =
    useAllCategories();

  const selectedCategory = categories?.find(
    (cat: ICategory) => String(cat.id) === value
  );

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground",
              error && "border-red-500"
            )}
            disabled={disabled || isLoadingCategories}
          >
            {isLoadingCategories ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading categories...
              </>
            ) : (
              <>
                {selectedCategory?.name || placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search categories..." className="h-9" />
            <CommandList>
              <CommandEmpty>No categories found</CommandEmpty>
              <CommandGroup>
                {!isLoadingCategories &&
                  categories?.map((category: ICategory) => (
                    <CommandItem
                      key={category.id}
                      value={String(category.id)}
                      onSelect={(currentValue) => {
                        onValueChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      {category.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === String(category.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
