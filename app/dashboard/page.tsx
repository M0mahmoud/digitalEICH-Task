import { Heading } from "@/components/layout/Heading";
import PageContainer from "@/components/layout/PageContainer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <PageContainer>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex flex-col gap-6 md:flex-row items-start justify-between">
            <Heading
              title={"Welcome to the Dashboard"}
              description={"Manage your application settings and data here."}
            />
          </div>
          <Separator />
          <div className="text-center text-gray-500">
            Content will be here soon.
          </div>
        </div>
      </PageContainer>
    </>
  );
}
