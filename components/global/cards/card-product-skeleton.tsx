"use client"
import { Card } from "@heroui/card"
import { memo } from "react"
import { Skeleton } from "@heroui/skeleton";

const CardProductSkeleton = (): React.JSX.Element => {
  return (
    <Card shadow="none" className="w-[200px] space-y-5 p-0" radius="sm">
      <Skeleton className="rounded-lg">
        <div className="h-[150px] rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-1">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  )
}

export default memo(CardProductSkeleton)