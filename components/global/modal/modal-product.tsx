"use client"

import { useProductStore } from "@/stores/products";
import { Product } from "@/types/product";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal"
import { addToast } from "@heroui/toast";
import { memo } from "react"

const ModalProduct = ({
  onOpenChange,
  isOpen,
  data,
}: {
  onOpenChange: () => void;
  isOpen: boolean,
  data: Product | undefined
}) => {
  const { addToCart } = useProductStore()

  return (
    <Modal size="4xl" scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className="lg:grid lg:grid-cols-2 p-0">
          <Image
            classNames={{
              img: "object-contain lg:w-full lg:h-[500px] h-[300px]",
              wrapper: "lg:w-full  lg:h-auto h-[300px]",
            }}
            radius="none"
            src={data?.images[0]}
            width={500}
            alt={data?.title}
          />
          <div className="flex flex-col justify-between h-full p-4">
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">{data?.title}</h2>
                <span className="text-default-500 capitalize">{data?.category.replaceAll('-', ' ')}</span>
              </div>
              <div className="flex flex-row gap-2">
                <span>Stock: {data?.stock}</span>
                <div className="flex flex-orw">
                  <Image src={'/icons/icon-star.svg'} width={25} height={20} alt={data?.title} />
                  <span>{data?.rating}</span>
                </div>
              </div>
              <b className="text-xl">${data?.price}</b>

              <article>{data?.description}</article>
            </div>
            <Button onPress={() => {
              addToCart(data as Product)
              addToast({
                title: "Success",
                description: "Item added to cart",
                color: 'primary',
              })
              onOpenChange()
            }} radius="sm" fullWidth size="lg" color="primary" className="mt-auto">Add to Cart</Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default memo(ModalProduct)