import { render, screen } from "@testing-library/react";
import Modal from "../components/modal";
import userEvent from "@testing-library/user-event";
import { useSelector } from "react-redux";
import CartInfo from "../components/modal/cartInfo";
import CartItem from "../components/modal/cartItem";

// render'larda hata vermemesi için useSelector'ü mocklayacaz ve test içerisinde useSelector çağırılınca ne return etmesi gerektiğini belirleyeceğiz
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// cartInfo ve cartItem component'ları modal içerisinde kullanıldığı için ve useDispatch içerdiğinden test hata veriyor. Şuan modal component'ını test ettiğim için bu componentları modal'dan soyutlamamız gerekiyor
jest.mock("../components/modal/cartInfo", () => () => <h1>CartInfo</h1>);
jest.mock("../components/modal/cartItem", () => () => <h1>CartItem</h1>);

// TDD (Önce test sonra bileşen)

describe("modal componenet", () => {
  const closeMock = jest.fn();

  it("isOpen propuna göre modal ekrana basılır", () => {
    // useSelector çağırıldığında sahte useSelector'un store olarak ne döndürmesi gerektiğini söyleyeceğiz
    useSelector.mockReturnValue({ cart: [] });

    // bileşeni renderla
    const { rerender } = render(<Modal isOpen={false} close={closeMock} />);

    // modal ekranda yoktur
    const modal = screen.queryByTestId("modal");
    expect(modal).toBeNull();

    // isOpen değerini true gönderip tekrar renderlayalım
    rerender(<Modal isOpen={true} close={closeMock} />);

    // modal ekranda vardır
    screen.getByTestId("modal");
  });

  it("X butonuna tıklanınca close fonksiyonu çalışır", async () => {
    // useSelector çağırıldığında sahte useSelector'un store olarak ne döndürmesi gerektiğini söyleyeceğiz
    useSelector.mockReturnValue({ cart: [] });

    // userEvent kurulumu
    const user = userEvent.setup();
    // bileşeni renderla
    render(<Modal isOpen={true} close={closeMock} />);

    // X butonu al
    const closeBtn = screen.getByTestId("close");

    // X butonuna tıkla
    await user.click(closeBtn);

    // closeMock fonksiyonu çalıştı mı
    expect(closeMock).toHaveBeenCalled();
  });

  it("sepetin doluluk durumuna göre ekrana uyarı basılır", () => {
    // useSelector çağırılınca sepet dizisi boş return edilmeli
    useSelector.mockReturnValue({ cart: [] });

    // bileşeni renderla
    const { rerender } = render(<Modal isOpen={true} close={closeMock} />);

    // ekranda uyarı mesajı vardır
    screen.getByText(/henüz/i);

    // useSelector çağırılınca sepet dizisi dolu return edilmeli
    useSelector.mockReturnValue({ cart: ["selam"] });

    // bileşeni tekrardan renderla (sepet dolu olacak)
    rerender(<Modal isOpen={true} close={closeMock} />);

    // ekranda uyarı mesajı yoktur
    expect(screen.queryByText(/henüz/i)).toBeNull();
  });

  it("sepet dolu ise her bir eleman için ekrana cartItem basılır", () => {
    // useSelector çağırılınca dolu dizi döndür(bu sefer mocklamadık kendimiz bir dizi yaptık)
    const cartItems = [
      { id: 1, name: "Ürün 1" },
      { id: 2, name: "Ürün 2" },
    ];
    useSelector.mockReturnValue({ cart: cartItems });

    // bileşeni renderla
    render(<Modal isOpen={true} close={closeMock} />);

    // ekrandaki bütün CartItem elementlerini al
    const items = screen.getAllByRole("heading", { name: "CartItem" });

    // ekranda her bir eleman için CartItem basılmış mı (yani biz 2 eleman gönderdik ekranda items dizisinin uzunluğu 2 mi diye kontrol ediyoruz)
    expect(items.length).toBe(2);
  });
});
