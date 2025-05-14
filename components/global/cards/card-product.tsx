"use client";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { memo } from "react";

import { Product } from "@/types/product";

const CardProduct = ({
  item,
  clickHandle,
}: {
  item: Product;
  clickHandle: (props: Product) => void;
}): React.JSX.Element => {
  return (
    <Card
      disableRipple
      isPressable
      radius="sm"
      shadow="none"
      onPress={() => clickHandle(item)}
    >
      <CardBody className="p-0">
        <Image
          alt={item.title}
          aria-label={item.title}
          className="w-full object-contain h-[150px] mb-4"
          classNames={{
            wrapper: "mb-2",
          }}
          height={150}
          loading="lazy"
          radius="sm"
          src={item.images[0]}
          width="100%"
        />
        <div className="flex flex-col gap-2">
          <span className="text-default-500 text-left text-xs">
            {item.title}
          </span>
          <div className="flex flex-row items-end gap-1">
            <span
              aria-label="price"
              className="text-start text-md font-bold leading-none line-clamp-2"
            >
              ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className="text-default-500 text-xs line-through">
              ${item.price}
            </span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Image
              alt={"rating"}
              aria-label="stars"
              className="w-3 h-3"
              src="/icons/icon-star.svg"
            />
            <span className="text-default-500 text-left text-xs capitalize">
              {item.rating}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default memo(CardProduct);
