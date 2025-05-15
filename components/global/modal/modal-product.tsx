"use client";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { memo, useMemo } from "react";

import { Product } from "@/types/product";
import { useProductStore } from "@/stores/products";

const ModalProduct = ({
  onOpenChange,
  isOpen,
  data,
}: {
  onOpenChange: () => void;
  isOpen: boolean;
  data: Product | undefined;
}) => {
  const { addToCart } = useProductStore();

  const isDiscountPrice = useMemo(() => {
    const price = data?.price || 0;
    const discount = data?.discountPercentage || 0;

    if (discount !== 0) {
      return (price * (1 - discount / 100)).toFixed(2);
    } else {
      return price;
    }
  }, [data]);

  return (
    <Modal
      classNames={{
        closeButton: "z-30",
        wrapper: "[&>.section]:h-[100dvh]",
      }}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="4xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody className="lg:grid lg:grid-cols-2 p-0">
          <Image
            alt={data?.title}
            classNames={{
              img: "object-contain lg:w-full w-full lg:h-[500px] h-[300px]",
              wrapper:
                "lg:w-full  lg:h-auto h-[300px] w-full  lg:rounded-tr-0 rounded-tr-2xl rounded-tl-2xl lg:rounded-bl-2xl",
            }}
            radius="none"
            src={data?.images[0]}
            width={"100%"}
          />
          <div className="flex flex-col justify-between h-full p-4">
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex flex-col">
                <h2 className="lg:text-2xl text-md font-bold">{data?.title}</h2>
                <span className="text-default-500 lg:text-md text-sm capitalize">
                  {data?.category.replaceAll("-", " ")}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <span className="lg:text-md text-sm ">
                  Stock: {data?.stock}
                </span>
                <div className="flex flex-orw">
                  <Image
                    alt={data?.title}
                    height={20}
                    src={"/icons/icon-star.svg"}
                    width={25}
                  />
                  <span className="lg:text-md text-sm ">{data?.rating}</span>
                </div>
              </div>
              <div className="flex flex-row gap-1">
                <b
                  aria-label="price"
                  className="text-start text-xl font-bold leading-normal line-clamp-2"
                >
                  ${isDiscountPrice}
                </b>
                <span className="text-default-500 text-sm line-through">
                  ${data?.price}
                </span>
              </div>

              <article className="lg:text-md text-sm ">
                {data?.description}
              </article>
            </div>
            <Button
              fullWidth
              className="mt-auto sticky bottom-4 z-10"
              color="primary"
              radius="sm"
              size="lg"
              onPress={() => {
                addToCart(data as Product);
                addToast({
                  title: "Success",
                  description: "Item added to cart",
                  color: "primary",
                });
                onOpenChange();
              }}
            >
              Add to Cart
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalProduct);
