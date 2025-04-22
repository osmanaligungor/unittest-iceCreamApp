import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, { payload }) => {
      // şuan payload olarak gelen ürün sepette zaten var mı?
      const foundItem = state.cart.find(
        (item) =>
          item.id === payload.item.id && item.type === payload.selectedType
      );

      if (foundItem) {
        // eğer sepette aynı elemandan varsa miktarı arttır
        foundItem.amount++;
      } else {
        // eğer sepette aynı elemandan yoksa sepete ekle
        state.cart.push({
          ...payload.item,
          type: payload.selectedType,
          amount: 1,
        });
      }
    },

    deleteFromCart: (state, { payload }) => {
      const index = state.cart.findIndex(
        (item) => item.id == payload.id && item.type == payload.type
      );

      if (state.cart[index].amount > 1) {
        // eğer miktarı 1'den fazlaysa miktarı azalt
        state.cart[index].amount--;
      } else {
        // miktarı 1'e eşit ise sepetten kaldır
        state.cart.splice(index, 1);
      }
    },

    createOrder: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, deleteFromCart, createOrder } = cartSlice.actions;

export default cartSlice.reducer;
