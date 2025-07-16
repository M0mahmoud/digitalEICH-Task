import { Heading } from "@/components/layout/Heading";
import PageContainer from "@/components/layout/PageContainer";
import TableSkeleton from "@/components/layout/TableSkeleton";
import ProductsTable from "@/components/products/ProductsTable";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Products() {
  return (
    <>
      <PageContainer>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex flex-col gap-6 md:flex-row items-start justify-between">
            <Heading
              title={"Products"}
              description={"Manage your products effectively."}
            />
            <Link
              href="/dashboard/products/new"
              className={cn(buttonVariants(), "text-xs md:text-sm")}
            >
              <Plus className="me-2 h-4 w-4" /> New Product
            </Link>
          </div>
          <Separator />
          <Suspense fallback={<TableSkeleton />}>
            <ProductsTable />
          </Suspense>
        </div>
      </PageContainer>
    </>
  );
}
