"use client"
import { Product } from "@/types/product"
import { Card, CardBody } from "@heroui/card"
import { Image } from "@heroui/image"
import { useDisclosure } from "@heroui/modal"
import { memo } from "react"

const CardProduct = ({
  item,
  clickHandle
}: {
  item: Product,
  clickHandle: (props: Product) => void
}): React.JSX.Element => {

  return (
    <Card
      disableRipple
      radius="sm"
      isPressable
      shadow="none"
      onPress={() => clickHandle(item)}>
      <CardBody className="p-0">
        <Image
          aria-label={item.title}
          alt={item.title}
          classNames={{
            wrapper: "mb-2"
          }}
          className="w-full object-contain h-[150px] mb-4"
          radius="sm"
          src={item.images[0]}
          height={150}
          width="100%"
          loading="lazy"
        />
        <div className="flex flex-col gap-2">
          <span className="text-default-500 text-left text-xs">{item.title}</span>
          <div className="flex flex-row items-end gap-1">
            <span aria-label="price" className="text-start text-md font-bold leading-none line-clamp-2">
              ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className="text-default-500 text-xs line-through">${item.price}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Image aria-label="stars" alt={'rating'} className="w-3 h-3" src="/icons/icon-star.svg" />
            <span className="text-default-500 text-left text-xs capitalize">{item.rating}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default memo(CardProduct)