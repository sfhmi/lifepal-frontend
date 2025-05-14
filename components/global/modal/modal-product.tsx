"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { memo } from "react";

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

  return (
    <Modal
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
              img: "object-contain lg:w-full lg:h-[500px] h-[300px]",
              wrapper: "lg:w-full  lg:h-auto h-[300px]",
            }}
            radius="none"
            src={data?.images[0]}
            width={500}
          />
          <div className="flex flex-col justify-between h-full p-4">
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">{data?.title}</h2>
                <span className="text-default-500 capitalize">
                  {data?.category.replaceAll("-", " ")}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <span>Stock: {data?.stock}</span>
                <div className="flex flex-orw">
                  <Image
                    alt={data?.title}
                    height={20}
                    src={"/icons/icon-star.svg"}
                    width={25}
                  />
                  <span>{data?.rating}</span>
                </div>
              </div>
              <b className="text-xl">${data?.price}</b>

              <article>{data?.description}</article>
            </div>
            <Button
              fullWidth
              className="mt-auto"
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
