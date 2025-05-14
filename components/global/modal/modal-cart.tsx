"use client"

import { useProductStore } from "@/stores/products";
import { CartProductInterface } from "@/types/product";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal"
import { memo, useMemo } from "react"

const ModalCart = ({
  onOpenChange,
  isOpen,
}: {
  onOpenChange: () => void;
  isOpen: boolean,
}) => {
  const { cart } = useProductStore()

  const totalPrice = useMemo(() => {
    return cart.map((item: CartProductInterface) => item.price * item.quantity).reduce((a, b) => a + b, 0)
  }, [cart])

  return (
    <Modal size="xl" scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className=" p-4">
          <div className="flex flex-col">
            {cart.map((item: CartProductInterface) => (
              <div key={item.id} className="flex flex-row items-center gap-2">
                <Image src={item.image} width={100} height={100} alt="" />
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{item.title}</span>
                  <span className="text-md">${item.price} x {item.quantity}</span>
                </div>
              </div>
            ))}
            <div className="flex flex-row w-full justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
          </div>
          <Button radius="sm" size="lg" color="primary">Checkout</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default memo(ModalCart)