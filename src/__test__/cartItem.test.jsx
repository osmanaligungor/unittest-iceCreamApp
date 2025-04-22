import { render, screen } from "@testing-library/react";
import CartItem from "../components/modal/cartItem";
import AmountPicker from "../components/modal/amountPicker";
import { mockItem } from "../utils/constants";

// amountpicker'ın testlerini zaten yazacağımız için cartItem testlerini etkilememesi için amountPicker'ı mockladık
jest.mock("../components/modal/amountPicker");

it("cartItem bileşeni gelen propu doğru şekilde kullanır", () => {
  render(<CartItem item={mockItem} />);

  screen.getByText(mockItem.name);
  screen.getByText(mockItem.type);
  screen.getByText(mockItem.price * mockItem.amount + "₺");
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", mockItem.image);
});
