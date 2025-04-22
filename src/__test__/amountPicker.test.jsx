import { render, screen } from "@testing-library/react";
import AmountPicker from "../components/modal/amountPicker";
import { mockItem } from "../utils/constants";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import { addToCart, deleteFromCart } from "../redux/cardSlice";

// useDispatch mockla
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("amount picker", () => {
  // sahte bir dispatch metodu oluştur
  const dispatchMock = jest.fn();

  // her testten önce
  beforeEach(() => {
    // useDispatch çağırıldığında sahte dispatc'i döndürmesini isteyecem
    useDispatch.mockReturnValue(dispatchMock);

    // her testten önce mock'u sıfırla
    dispatchMock.mockClear();
  });

  test("miktar değeri gelen propa göre ekrana basılır", () => {
    render(<AmountPicker item={mockItem} />);

    screen.getByText(mockItem.amount);
  });

  test("- butonuna tıklanınca doğru aksiyon tetikleniyor mu", async () => {
    const user = userEvent.setup();

    render(<AmountPicker item={mockItem} />);

    const btn = screen.getByRole("button", { name: "-" });

    await user.click(btn);

    expect(dispatchMock).toHaveBeenCalledWith(deleteFromCart(mockItem));
  });

  test("+ butonuna tıklanınca doğru aksiyon tetikleniyor mu", async () => {
    const user = userEvent.setup();

    render(<AmountPicker item={mockItem} />);

    const btn = screen.getByRole("button", { name: "+" });

    await user.click(btn);

    expect(dispatchMock).toHaveBeenCalledWith(
      addToCart({ item: mockItem, selectedType: mockItem.type })
    );
  });
});
