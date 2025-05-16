import ModalProduct from "@/components/global/modal/modal-product";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const onOpenChange = jest.fn();
const mockData = {
  quantity: 1,
  id: 31,
  title: "Lemon",
  description:
    "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.",
  category: "groceries",
  price: 0.79,
  discountPercentage: 9.7,
  rating: 3.53,
  stock: 31,
  tags: ["fruits"],
  sku: "GRO-BRD-LEM-031",
  weight: 3,
  dimensions: {
    width: 23.77,
    height: 9.22,
    depth: 12.05,
  },
  warrantyInformation: "No warranty",
  shippingInformation: "Ships in 1 month",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 5,
      comment: "Awesome product!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Logan Lawson",
      reviewerEmail: "logan.lawson@x.dummyjson.com",
    },
  ],
  returnPolicy: "7 days return policy",
  minimumOrderQuantity: 29,
  meta: {
    createdAt: "2025-04-30T09:41:02.053Z",
    updatedAt: "2025-04-30T09:41:02.053Z",
    barcode: "4871812433378",
    qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
  },
  images: ["https://cdn.dummyjson.com/product-images/groceries/lemon/1.webp"],
  thumbnail:
    "https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp",
  brand: "brand",
};

jest.mock("@heroui/modal", () => ({
  Modal: ({ children }: any) => <div>{children}</div>,
  ModalBody: ({ children }: any) => <div>{children}</div>,
  ModalContent: ({ children }: any) => <div>{children}</div>,
}));

describe("ModalProduct", () => {
  it("renders product title, price, and Add to Cart button", () => {
    render(
      <ModalProduct
        data={mockData}
        isOpen={true}
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.getByText("Lemon")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
    expect(screen.getByLabelText("price")).toBeInTheDocument();
  });
});
