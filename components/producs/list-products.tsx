"use client";
import { parseAsInteger, useQueryState } from "nuqs";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";
import { Select, SelectItem } from "@heroui/select";
import { useDisclosure } from "@heroui/modal";

import CardProduct from "../global/cards/card-product";
import CardProductSkeleton from "../global/cards/card-product-skeleton";
import ModalProduct from "../global/modal/modal-product";

import { Product } from "@/types/product";
import API from "@/config/api";

const SORTBY = ["price", "rating"];
const SORT_MODE = ["asc", "desc"];

const ListProducts = (): React.JSX.Element => {
  const [category] = useQueryState("ctg");
  const [rating] = useQueryState("r", parseAsInteger.withDefault(0));
  const [mP] = useQueryState("mp", parseAsInteger.withDefault(0));
  const [sortBy, setSortBy] = useQueryState("srt", { defaultValue: "price" });
  const [sortMode, setSortMode] = useQueryState("srtm", {
    defaultValue: "asc",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const { isOpen, onOpenChange } = useDisclosure();

  const qpRaw: Record<string, string | null | number> = {
    sortBy: sortBy || "price",
    order: sortMode || "asc",
  };

  const qp = Object.fromEntries(
    Object.entries(qpRaw).filter(
      ([_, v]) => typeof v === "string" && v.trim() !== "",
    ),
  ) as Record<string, string>;

  const queryString = Object.entries(qp)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const uri = useMemo(() => {
    if (category) {
      return `products/category/${category}?limit=50&`;
    }

    return `products?limit=50&`;
  }, [category]);

  const { data: rawProducts, isLoading } = useSWR<{ products: Product[] }>(
    `${uri}${queryString.replaceAll(" ", "-")}`,
    API,
    {
      onSuccess: (response) => {
        if (response.products) {
          handleFilterProduct(response.products);
        }
      },
    },
  );

  const handleFilterProduct = useCallback(
    (data: Product[]) => {
      const filtered = data.filter((prd) => {
        if (mP && prd.price > mP) return false;
        if (
          rating &&
          rating > 0 &&
          (prd.rating < rating || prd.rating >= rating + 1)
        )
          return false;

        return true;
      });

      setProducts(filtered);
    },
    [rating, mP],
  );

  const handleCheckDetail = (props: Product) => {
    setSelectedProduct(props);
    onOpenChange();
  };

  useEffect(() => {
    if (rawProducts?.products) {
      setTimeout(() => {
        handleFilterProduct(rawProducts?.products as Product[]);
      }, 2000);
    }
  }, [rating, mP]);

  return (
    <Fragment>
      <div className="grid grid-cols-2 items-center mb-4">
        <h1 className="font-bold text-xl">Product</h1>
        <div className="flex flex-row gap-2 w-full">
          <Select
            aria-label="sort-by"
            className="max-w-xs"
            classNames={{
              value: "capitalize",
            }}
            defaultSelectedKeys={[sortBy]}
            radius="sm"
            variant="bordered"
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORTBY.map((item: string) => (
              <SelectItem key={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </Select>
          <Select
            aria-label="sort-mode"
            className="max-w-xs"
            classNames={{
              value: "capitalize",
            }}
            defaultSelectedKeys={[sortMode]}
            radius="sm"
            variant="bordered"
            onChange={(e) => setSortMode(e.target.value)}
          >
            {SORT_MODE.map((item: string) => (
              <SelectItem key={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        {isLoading ? (
          <Fragment>
            {[...new Array(12)].map((_, idx: number) => (
              <CardProductSkeleton key={idx} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {products?.map((item: Product, idx: number) => (
              <CardProduct
                key={idx}
                clickHandle={handleCheckDetail}
                item={item}
              />
            ))}
          </Fragment>
        )}
      </div>
      <ModalProduct
        data={selectedProduct}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </Fragment>
  );
};

export default memo(ListProducts);
