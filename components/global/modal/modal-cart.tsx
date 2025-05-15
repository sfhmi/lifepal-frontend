"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Fragment, memo, useMemo } from "react";

import { Product } from "@/types/product";
import { useProductStore } from "@/stores/products";

const ModalCart = ({
  onOpenChange,
  isOpen,
}: {
  onOpenChange: () => void;
  isOpen: boolean;
}) => {
  const { cart, addToCart, removeItem } = useProductStore();

  const totalPrice = useMemo(() => {
    return cart
      .map((item: Product) => {
        return (
          item?.price * (1 - item?.discountPercentage / 100) * item.quantity
        );
      })
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
        <ModalHeader>Cart</ModalHeader>
        <ModalBody className="p-4 min-h-[300px]">
          {cart && (
            <Fragment>
              <div className="flex flex-col gap-3 h-[300px] overflow-y-scroll">
                {cart?.map((item: Product) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between items-center gap-2"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        alt=""
                        height={100}
                        src={item.images[0]}
                        width={100}
                      />
                      <div className="flex flex-col">
                        <span className="font-bold lg:text-lg text-sm">
                          {item.title}
                        </span>
                        <div className="flex flex-row">
                          <span className="lg:text-md text-xs">
                            $
                            {(
                              item.price *
                              (1 - item.discountPercentage / 100)
                            ).toFixed(2)}{" "}
                            x {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        aria-label="Decrease"
                        disabled={item.quantity <= 0}
                        size="sm"
                        variant="bordered"
                        onPress={() => removeItem(item.id)}
                      >
                        -
                      </Button>
                      <span className="px-3 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        isIconOnly
                        aria-label="Increase"
                        size="sm"
                        variant="bordered"
                        onPress={() => addToCart(item)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row w-full justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    ${parseFloat(totalPrice.toFixed())}
                  </span>
                </div>
                <Button color="primary" radius="sm" size="lg">
                  Checkout
                </Button>
              </div>
            </Fragment>
          )}
          {!cart && (
            <Fragment>
              <div className="flex flex-col items-center justify-center my-auto gap-3">
                <span>Your cart is empty</span>
              </div>
            </Fragment>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalCart);
