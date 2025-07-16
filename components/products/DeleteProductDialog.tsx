"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IProduct } from "@/types/products";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteProductDialogProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
  isPending: boolean;
}

export default function DeleteProductDialog({
  product,
  isOpen,
  onClose,
  onConfirm,
  isPending,
}: DeleteProductDialogProps) {
  const handleConfirm = () => {
    onConfirm(product.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-500" />
            Delete Product
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-sm text-muted-foreground">
                {product.category.name} • ${product.price}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Product
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
