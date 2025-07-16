"use client";

import {
  useAllProducts,
  useUpdateProduct,
  useDeleteProduct,
} from "@/hooks/products";
import { IProduct } from "@/types/products";
import { Edit, Trash2, Eye, Search, Loader2, X } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import React, { useState, useEffect } from "react";
import TablePagination from "../layout/TablePagination";
import { Button } from "../ui/button";
import EditProductForm from "./EditProductForm";
import DeleteProductDialog from "./DeleteProductDialog";
import ProductDetailsModal from "./ProductDetailsModal";
import { useDebounce } from "@/hooks/use-debounce";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TableSkeleton from "../layout/TableSkeleton";
import { Input } from "../ui/input";

export default function ProductsTable() {
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [query, setQuery] = useQueryState("q", parseAsString);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToView, setProductToView] = useState<IProduct | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Debounce the search query to reduce API calls
  const debouncedQuery = useDebounce(query, 300);
  const isSearching = query !== debouncedQuery;

  // Reset page to 1 when search query changes
  useEffect(() => {
    if (query && page !== 1) {
      setPage(1);
    }
  }, [query, page, setPage]);

  const totalCount = 48; // This should be fetched from the API
  const limit = 6;

  const { data, isPending, error } = useAllProducts({
    page: page ? page : 1,
    limit,
    query: debouncedQuery,
  });

  const { mutate: updateProduct, isPending: isUpdatePending } =
    useUpdateProduct();

  const { mutate: deleteProduct, isPending: isDeletePending } =
    useDeleteProduct();

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleView = (product: IProduct) => {
    setProductToView(product);
    setIsViewModalOpen(true);
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
    return (
      <div className="space-y-4">
        <div className="relative max-w-64">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded-md"></div>
          </div>
        </div>
        <div className="animate-pulse">
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="space-y-4">
        <div className="relative max-w-64 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          {isSearching ? (
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-hover:text-blue-500 transition-colors duration-200" />
          )}
          <Input
            placeholder="Search products..."
            value={query || ""}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-9 bg-background border-2 hover:border-blue-300 focus:border-blue-500 transition-all duration-200 hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-blue-500/20"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuery("")}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600 transition-all duration-200 hover:scale-110 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div
          className={`border rounded-md bg-background shadow-sm hover:shadow-md transition-shadow duration-200 ${
            isSearching ? "animate-pulse" : ""
          }`}
        >
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted/50">
                <TableHead className="text-foreground font-medium hover:text-primary transition-colors duration-150">
                  Image
                </TableHead>
                <TableHead className="text-foreground font-medium hover:text-primary transition-colors duration-150">
                  Name
                </TableHead>
                <TableHead className="text-foreground font-medium hover:text-primary transition-colors duration-150">
                  Category
                </TableHead>
                <TableHead className="text-foreground font-medium hover:text-primary transition-colors duration-150">
                  Price
                </TableHead>
                <TableHead className="text-foreground font-medium w-20 hover:text-primary transition-colors duration-150">
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
                    <div className="relative overflow-hidden rounded-md group-hover:scale-105 transition-transform duration-200">
                      <img
                        // Avoid using next/image for api has alot of pathname
                        loading="lazy"
                        src={product.images[0] || "/placeholder.png"}
                        alt={product.title}
                        width={50}
                        height={50}
                        className="rounded-md hover:brightness-110 transition-all duration-200"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-primary transition-colors duration-200 font-medium">
                    {product.title || "-"}
                  </TableCell>
                  <TableCell className="text-foreground group-hover:text-primary transition-colors duration-200">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {product.category.name || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground ">
                    <span className="font-semibold text-green-600">
                      ${product.price || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(product);
                        }}
                        className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(product);
                        }}
                        className="h-8 w-8 p-0 hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-200 hover:scale-110"
                        title="Edit Product"
                      >
                        <Edit className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product);
                        }}
                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 transition-all duration-200 hover:scale-110"
                        title="Delete Product"
                      >
                        <Trash2 className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="bg-background border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <TablePagination
            currentPage={page ? page : 1}
            totalCount={totalCount}
            totalPages={Math.ceil(totalCount / limit)}
            nextPage={nextPage}
            previousPage={previousPage}
            setCurrentPage={(pageNum) => setPage(pageNum)}
          />
        </div>
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

      {productToView && (
        <ProductDetailsModal
          product={productToView}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setProductToView(null);
          }}
        />
      )}
    </div>
  );
}
