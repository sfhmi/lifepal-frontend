"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { memo, useMemo } from "react";

import { CartProductInterface } from "@/types/product";
import { useProductStore } from "@/stores/products";

const ModalCart = ({
  onOpenChange,
  isOpen,
}: {
  onOpenChange: () => void;
  isOpen: boolean;
}) => {
  const { cart } = useProductStore();

  const totalPrice = useMemo(() => {
    return cart
      .map((item: CartProductInterface) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
  }, [cart]);

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      size="xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody className=" p-4">
          <div className="flex flex-col">
            {cart.map((item: CartProductInterface) => (
              <div key={item.id} className="flex flex-row items-center gap-2">
                <Image alt="" height={100} src={item.image} width={100} />
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{item.title}</span>
                  <span className="text-md">
                    ${item.price} x {item.quantity}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex flex-row w-full justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
          </div>
          <Button color="primary" radius="sm" size="lg">
            Checkout
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalCart);
