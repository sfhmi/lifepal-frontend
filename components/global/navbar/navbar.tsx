"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { useDisclosure } from "@heroui/modal";
import { memo, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useProductStore } from "@/stores/products";
import { Product } from "@/types/product";
import { CartIcon } from "@/components/icons";

const ThemeSwitcher = dynamic(() => import("./theme-switcher"), { ssr: false });
const ModalCart = dynamic(() => import("../modal/modal-cart"), { ssr: false });

const Navbar = () => {
  const { isOpen, onOpenChange } = useDisclosure();
  const [items, setItems] = useState<Product[]>([]);
  const { cart } = useProductStore();

  const total = useMemo(() => {
    if (!Array.isArray(cart)) return 0;
    if (items.length === 0) return 0;

    return cart.reduce((sum, item: Product) => {
      return sum + (item?.quantity || 0);
    }, 0);
  }, [cart, items]);

  useEffect(() => {
    setTimeout(() => {
      setItems(cart);
    }, 5000);
  }, [cart]);

  return (
    <nav className="sticky  top-0 z-50 bg-default-50 shadow flex justify-center px-6 py-3">
      <div className="container px-6 max-w-7xl flex flex-row justify-between items-center">
        <Link className="font-bold text-lg" href="/">
          Lifepal Shop
        </Link>
        <div />
        <div className="flex items-center gap-4">
          <Badge color="danger" content={total} shape="circle">
            <Button
              isIconOnly
              radius="full"
              variant="light"
              onPress={onOpenChange}
            >
              <CartIcon size={22} />
            </Button>
          </Badge>
          <ThemeSwitcher />
        </div>
      </div>
      <ModalCart isOpen={isOpen} onOpenChange={onOpenChange} />
    </nav>
  );
};

export default memo(Navbar);
