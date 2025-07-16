"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/products";
import { Package, Tag, DollarSign } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProductDetailsModalProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Product Details</DialogTitle>
      <DialogDescription className="sr-only">Product Details</DialogDescription>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Product Name
                  </label>
                  <p className="text-lg font-semibold">{product.title}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Price
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-xl font-bold text-green-600">
                      ${product.price}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Category
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{product.category.name}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Product ID
                  </label>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded w-fit">
                    #{product.id}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Slug
                  </label>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded w-fit">
                    {product.slug}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Category ID
                  </label>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded w-fit">
                    #{product.category.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Product Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {product.description || "No description available."}
              </p>
            </div>
          </div>

          <Separator />

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Total Images
                </label>
                <p className="text-sm">
                  {product.images?.length || 0} image(s)
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Category Slug
                </label>
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded w-fit">
                  {product.category.slug}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                ))
              ) : (
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
