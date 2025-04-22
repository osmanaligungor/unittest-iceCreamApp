import { fireEvent, render, screen } from "@testing-library/react";
import Card from "../components/list/card";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardSlice";

// useDispatch'i mockla
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("card bileşeni testleri", () => {
  // useDispatch'in döndürdüğü dispatch metodunu mockla
  const dispatchMock = jest.fn();

  const mockItem = {
    name: "Bal Badem",
    image: "/ice-1.png",
    price: 28,
  };

  // her test öncesinde sahte useDispatch çağırınca sahte dispatch return ediyoruz
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  // her test sonrasında bütün mockları sıfırla
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("item detaylarını doğru şekilde renderlar", () => {
    render(<Card item={mockItem} />);

    screen.getByRole("heading", { name: "Bal Badem" });
    screen.getByText("₺28 / top");
    expect(screen.getByRole("img")).toHaveAttribute("src", "/ice-1.png");
  });

  it("tipi seçili olma durumuna göre 'Sepete Ekle' butonunun görünürlülüğü değişir", () => {
    // card bileşenini renderla
    render(<Card item={mockItem} />);

    // sepete ekle butonunu al
    const cardBtn = screen.getByRole("button", { name: /sepete/i });

    // sepete ekle butonu görünmezdir
    expect(cardBtn).toHaveClass("invisible");

    // külahta butonunu al
    const typeBtn = screen.getByRole("button", { name: /külahta/i });

    // külahta butonuna tıkla
    fireEvent.click(typeBtn);

    // sepete ekle butonu gözükür
    expect(cardBtn).not.toHaveClass("invisible");

    // külahta butonuna tıkla
    fireEvent.click(typeBtn);

    // sepete ekle butonu görünmezdir
    expect(cardBtn).toHaveClass("invisible");
  });

  it("'Sepete Ekle' butonuna tıklanınca reducer'a haber verir", () => {
    // bileşeni renderla
    render(<Card item={mockItem} />);

    // bardakta seçeneğini seç
    const typeBtn = screen.getByRole("button", { name: /bardakta/i });

    fireEvent.click(typeBtn);

    // sepete ekle butonuna tıkla
    const cartBtn = screen.getByRole("button", { name: /sepete/i });
    fireEvent.click(cartBtn);

    // dispatch metodu doğru parametreler ile çalıştı mı
    expect(dispatchMock).toHaveBeenCalledWith(
      addToCart({ item: mockItem, selectedType: "cup" })
    );
  });
});
