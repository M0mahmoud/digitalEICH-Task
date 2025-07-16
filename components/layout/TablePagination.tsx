"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export default function TablePagination({
  currentPage,
  totalCount,
  totalPages,
  setCurrentPage,
  nextPage,
  previousPage,
}: TablePaginationProps) {
  return (
    <div className="flex md:items-center flex-wrap justify-between flex-col-reverse md:flex-row gap-2">
      <div className="flex md:items-center space-x-4 flex-col md:flex-row justify-between w-full md:w-auto">
        <div>
          <span className="text-sm text-muted-foreground">
            {`Showing ${currentPage * 6 - 6 + 1} to ${Math.min(
              currentPage * 6,
              totalCount
            )} of ${totalCount} results`}
          </span>
          <span className="text-sm text-muted-foreground">
            {", "}
            {`Page ${currentPage} of ${totalPages}`}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={previousPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
