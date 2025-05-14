"use client";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Badge } from "@heroui/badge";
import { useDisclosure } from "@heroui/modal";
import { useMemo } from "react";

import ModalCart from "../modal/modal-cart";

import { useProductStore } from "@/stores/products";
import { CartProductInterface } from "@/types/product";

const Navbar = () => {
  const { isOpen, onOpenChange } = useDisclosure();
  const { cart } = useProductStore();
  const totalItem = useMemo(() => {
    return cart
      .map((item: CartProductInterface) => item.quantity)
      .reduce((a, b) => a + b, 0);
  }, [cart]);

  return (
    <nav className="sticky  top-0 z-50 bg-white shadow flex justify-center px-6 py-3">
      <div className="container px-6 max-w-7xl flex flex-row justify-between items-center">
        <Link className="font-bold text-lg" href="/">
          Lifepal Shop
        </Link>
        <div className="flex items-center gap-4">
          <Badge color="danger" content={totalItem || 0} shape="circle">
            <Button
              isIconOnly
              aria-label="Cart"
              as={Link}
              variant="light"
              onPress={onOpenChange}
            >
              <Image
                alt="Cart"
                height={24}
                src="/icons/icon-cart.svg"
                width={24}
              />
            </Button>
          </Badge>
        </div>
      </div>
      <ModalCart isOpen={isOpen} onOpenChange={onOpenChange} />
    </nav>
  );
};

export default Navbar;
