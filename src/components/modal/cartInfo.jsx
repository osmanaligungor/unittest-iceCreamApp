import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/cardSlice";
import { toast } from "react-toastify";

const CartInfo = ({ cart, close }) => {
  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );
  const isShippingFree = subTotal >= 150;
  const shipping = isShippingFree || subTotal == 0 ? 0 : 40;
  const total = subTotal + shipping;

  const dispatch = useDispatch();
  // butona tıklanınca
  const handleClick = () => {
    // reducer'a haber ver
    dispatch(createOrder());

    // bildirim gönder
    toast.success("Ürünler hazırlanıyor...");

    // modalı kapat
    close();
  };

  return (
    <div className="fs-5 py-5 text-lg">
      <p className="flex justify-between">
        <span className="text-gray-500 font-semibold">Ara Toplam</span>
        <span data-testid="subtotal" className="font-semibold text-gray-700">
          {subTotal}₺
        </span>
      </p>

      <p className="flex justify-between py-2">
        <span className="text-gray-500 font-semibold">Kargo</span>
        <span data-testid="shipping" className="font-semibold text-gray-700">
          {isShippingFree ? "Ücretsiz" : `${shipping}₺`}
        </span>
      </p>

      <p className="flex justify-between">
        <span className="text-gray-500 font-semibold">Toplam</span>
        <span
          data-testid="total"
          className="font-semibold text-gray-700 text-2xl"
        >
          {total}₺
        </span>
      </p>

      <button
        data-testid="order-button"
        disabled={subTotal === 0}
        onClick={handleClick}
        className="bg-red-500 mt-4 w-full p-2 rounded-md text-white hover:bg-red-600 transition"
      >
        Sipariş Ver
      </button>
    </div>
  );
};

export default CartInfo;
