"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Save } from "lucide-react";
import { IProduct } from "@/types/products";
import { editProductSchema } from "@/lib/zod-schema";
import { z } from "zod";
import CategorySelect from "@/components/ui/category-select";

type EditFormData = z.infer<typeof editProductSchema>;

interface EditProductFormProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, updatedProduct: any) => void;
  isPending?: boolean;
}

export default function EditProductForm({
  product,
  isOpen,
  onClose,
  onUpdate,
  isPending = false,
}: EditProductFormProps) {
  const [formErrors, setFormErrors] = useState<{
    formErrors?: string[];
    fieldErrors?: Record<string, string[]>;
  } | null>(null);
  const [editProduct, setEditProduct] = useState<EditFormData>({
    title: "",
    price: 0,
    description: "",
    categoryId: "",
  });

  // Initialize form with product data when product changes
  useEffect(() => {
    if (product) {
      setEditProduct({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: String(product.category.id),
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = editProductSchema.safeParse(editProduct);
    if (!result.success) {
      setFormErrors({
        formErrors: [],
        fieldErrors: result.error.flatten().fieldErrors,
      });
      return;
    }

    const updatedProduct = {
      ...product,
      ...result.data,
      category: {
        ...product.category,
        id: Number(result.data.categoryId),
      },
    };

    onUpdate(product.id, updatedProduct);
  };

  const handleClose = () => {
    setFormErrors(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogDescription className="sr-only">Edit Product</DialogDescription>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editProduct.title}
                onChange={(e) =>
                  setEditProduct((prev) => ({
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
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editProduct.price || ""}
                  onChange={(e) =>
                    setEditProduct((prev) => ({
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

              <CategorySelect
                label="Select Category"
                value={editProduct.categoryId}
                onValueChange={(value) => {
                  setEditProduct((prev) => ({
                    ...prev,
                    categoryId: value,
                  }));
                }}
                error={formErrors?.fieldErrors?.categoryId?.[0]}
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct((prev) => ({
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
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Product
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
