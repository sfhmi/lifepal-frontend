import ModalCart from "@/components/global/modal/modal-cart";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const onOpenChange = jest.fn();

const mockCart = [
  {
    quantity: 2,
    id: 1,
    title: "Apple",
    description: "Fresh apple",
    category: "fruits",
    price: 1.5,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    tags: [],
    sku: "SKU-APPLE",
    weight: 1,
    dimensions: { width: 1, height: 1, depth: 1 },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "",
    minimumOrderQuantity: 1,
    meta: {},
    images: ["https://dummyimage.com/apple.jpg"],
    thumbnail: "https://dummyimage.com/apple-thumb.jpg",
    brand: "BrandA",
  },
];

// Mock zustand store
jest.mock("@/stores/products", () => ({
  useProductStore: () => ({
    cart: mockCart,
    addToCart: jest.fn(),
    removeItem: jest.fn(),
  }),
}));

jest.mock("@heroui/modal", () => ({
  Modal: ({ children }: any) => <div>{children}</div>,
  ModalBody: ({ children }: any) => <div>{children}</div>,
  ModalContent: ({ children }: any) => <div>{children}</div>,
  ModalHeader: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@heroui/image", () => ({
  Image: ({ src, alt }: any) => <img alt={alt} src={src} />,
}));

jest.mock("@heroui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("ModalCart", () => {
  it("renders cart items and total", () => {
    render(<ModalCart isOpen={true} onOpenChange={onOpenChange} />);
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText(/Total/)).toBeInTheDocument();
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  it("shows empty cart message", () => {
    // Override mock to simulate empty cart
    jest
      .spyOn(require("@/stores/products"), "useProductStore")
      .mockReturnValue({
        cart: [],
        addToCart: jest.fn(),
        removeItem: jest.fn(),
      });
    render(<ModalCart isOpen={true} onOpenChange={onOpenChange} />);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});
