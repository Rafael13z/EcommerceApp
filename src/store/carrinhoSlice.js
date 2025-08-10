import { createSlice } from '@reduxjs/toolkit';

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState: {
    itens: [],
    total: 0
  },
  reducers: {
    adicionarItem: (state, action) => {
      const itemExistente = state.itens.find(item => item.id === action.payload.id);
      
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        state.itens.push({ ...action.payload, quantidade: 1 });
      }
      
      state.total = calcularTotal(state.itens);
    },
    removerItem: (state, action) => {
      state.itens = state.itens.filter(item => item.id !== action.payload);
      state.total = calcularTotal(state.itens);
    },
    limparCarrinho: (state) => {
      state.itens = [];
      state.total = 0;
    }
  }
});

// Função auxiliar
function calcularTotal(itens) {
  return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

export const { adicionarItem, removerItem, limparCarrinho } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;