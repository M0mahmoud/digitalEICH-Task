"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Check, ChevronsUpDown, Loader2, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAllCategories } from "@/hooks/categories";
import { ICategory } from "@/types/products";
import { useCreateProduct } from "@/hooks/products";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { newProductSchema } from "@/lib/zod-schema";
import { z } from "zod";

type FormData = z.infer<typeof newProductSchema>;

export default function CreateNewProductForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    formErrors?: string[];
    fieldErrors?: Record<string, string[]>;
  } | null>(null);
  const [newProduct, setNewProduct] = useState<FormData>({
    title: "",
    price: 0,
    description: "",
    categoryId: "",
  });

  const { data: categories, isLoading: isLoadingCategories } =
    useAllCategories();
  const { mutate, isPending } = useCreateProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = newProductSchema.safeParse(newProduct);
    if (!result.success) {
      setFormErrors({
        formErrors: [],
        fieldErrors: result.error.flatten().fieldErrors,
      });
      return;
    }
    mutate(
      {
        ...result.data,
        categoryId: Number(result.data.categoryId),
        images: ["https://placehold.co/600x400"],
      },
      {
        onSuccess: () => {
          setNewProduct({
            title: "",
            price: 0,
            description: "",
            categoryId: "",
          });
          setOpen(false);
          setFormErrors(null);
          router.push("/dashboard/products");
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError;
          if (
            axiosError.response?.data &&
            (axiosError.response.data as any).error
          ) {
            setFormErrors({
              formErrors: [],
              fieldErrors: {
                images: [(axiosError.response.data as any).message[0]],
              },
            });
          } else {
            setFormErrors({
              formErrors: ["An error occurred while creating the product."],
              fieldErrors: {},
            });
          }
        },
      }
    );
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Create New Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" multiple />
                {/* TODO: Make Preview */}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title </Label>
                  <Input
                    id="title"
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter product title"
                    disabled={isPending}
                  />
                  {formErrors?.fieldErrors?.title && (
                    <p className="text-red-500 text-sm">
                      {formErrors.fieldErrors.title[0]}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price || ""}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }))
                      }
                      placeholder="Enter product price"
                      disabled={isPending}
                    />
                    {formErrors?.fieldErrors?.price && (
                      <p className="text-red-500 text-sm">
                        {formErrors.fieldErrors.price[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Select Category</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={`w-full justify-between`}
                        >
                          {newProduct.categoryId
                            ? categories?.find(
                                (cat: ICategory) =>
                                  String(cat.id) === newProduct.categoryId
                              )?.name || "Select Category"
                            : "Select Category"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search categories..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No categories found</CommandEmpty>
                            <CommandGroup>
                              {!isLoadingCategories &&
                                categories?.map((category: ICategory) => (
                                  <CommandItem
                                    key={category.id}
                                    value={String(category.id)}
                                    onSelect={(currentValue) => {
                                      setNewProduct((prev) => ({
                                        ...prev,
                                        categoryId: currentValue,
                                      }));
                                      setOpen(false);
                                    }}
                                  >
                                    {category.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        newProduct.categoryId ===
                                          String(category.id)
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
                    {formErrors?.fieldErrors?.categoryId && (
                      <p className="text-red-500 text-sm">
                        {formErrors.fieldErrors.categoryId[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter product description"
                    disabled={isPending}
                  />
                  {formErrors?.fieldErrors?.description && (
                    <p className="text-red-500 text-sm">
                      {formErrors.fieldErrors.description[0]}
                    </p>
                  )}
                </div>
              </div>
              {formErrors?.formErrors && (
                <div className="mt-4">
                  <div className="text-red-500 text-sm">
                    {formErrors.formErrors}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-end space-x-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
