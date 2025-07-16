import { Heading } from "@/components/layout/Heading";
import PageContainer from "@/components/layout/PageContainer";
import CreateNewProductForm from "@/components/products/CreateNewProductForm";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function NewProduct() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex flex-col gap-6 md:flex-row items-start justify-between">
          <Heading
            title={"New Product"}
            description={"Create a new product."}
          />
        </div>
        <Separator />
        <CreateNewProductForm />
      </div>
    </PageContainer>
  );
}
