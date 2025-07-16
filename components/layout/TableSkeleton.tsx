import React from "react";

export default function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-9 w-64 bg-muted animate-pulse rounded-md" />
        </div>
        <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
      </div>
      <div className="border rounded-md">
        <div className="h-96 bg-muted animate-pulse rounded-md" />
      </div>
    </div>
  );
}
