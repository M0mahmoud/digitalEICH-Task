"use client";

import {
  useAllProducts,
  useUpdateProduct,
  useDeleteProduct,
} from "@/hooks/products";
import { IProduct } from "@/types/products";
import { Edit, Trash2 } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { useState } from "react";
import TablePagination from "../layout/TablePagination";
import { Button } from "../ui/button";
import EditProductForm from "./EditProductForm";
import DeleteProductDialog from "./DeleteProductDialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TableSkeleton from "../layout/TableSkeleton";

export default function ProductsTable() {
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const totalCount = 48; // This should be fetched from the API
  const limit = 6;

  const { data, isPending, error } = useAllProducts({
    page: page ? page : 1,
    limit,
  });

  const { mutate: updateProduct, isPending: isUpdatePending } =
    useUpdateProduct();

  const { mutate: deleteProduct, isPending: isDeletePending } =
    useDeleteProduct();

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = (id: number, updatedProduct: IProduct) => {
    updateProduct(
      { id, product: updatedProduct },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        },
        onError: (error: Error) => {
          console.error("Error updating product:", error);
        },
      }
    );
  };

  const handleDelete = (product: IProduct) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (id: number) => {
    deleteProduct(id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
      },
      onError: (error: Error) => {
        console.error("Error deleting product:", error);
      },
    });
  };

  const nextPage = () => {
    const currentPage = page ? page : 1;
    const totalPages = Math.ceil(totalCount / limit);
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    const currentPage = page ? page : 1;
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  if (isPending && !error) {
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="border rounded-md bg-background">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-foreground font-medium">
                  Image
                </TableHead>
                <TableHead className="text-foreground font-medium">
                  Name
                </TableHead>
                <TableHead className="text-foreground font-medium">
                  Category
                </TableHead>
                <TableHead className="text-foreground font-medium">
                  Price
                </TableHead>
                <TableHead className="text-foreground font-medium w-20">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((product: IProduct) => (
                <TableRow
                  key={product.id}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <TableCell>
                    <img
                      // Avoid using next/image for api has alot of pathname
                      loading="lazy"
                      src={product.images[0] || "/placeholder.png"}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="text-foreground max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.title || "-"}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {product.category.name || "-"}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {product.price || 0}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(product)}
                        className="h-8 w-8 p-0 hover:bg-muted"
                      >
                        <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product)}
                        className="h-8 w-8 p-0 hover:bg-muted"
                      >
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          currentPage={page ? page : 1}
          totalCount={totalCount}
          totalPages={Math.ceil(totalCount / limit)}
          nextPage={nextPage}
          previousPage={previousPage}
          setCurrentPage={(pageNum) => setPage(pageNum)}
        />
      </div>

      {selectedProduct && (
        <EditProductForm
          product={selectedProduct}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          }}
          onUpdate={handleUpdateProduct}
          isPending={isUpdatePending}
        />
      )}

      {productToDelete && (
        <DeleteProductDialog
          product={productToDelete}
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setProductToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          isPending={isDeletePending}
        />
      )}
    </>
  );
}
