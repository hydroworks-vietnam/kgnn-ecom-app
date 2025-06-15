import type { ICart, ICartItem } from '@/types/cart';
import type { Rank } from '@/types/user';
import { atom, computed } from 'nanostores';

const initialCart = typeof window !== 'undefined' 
  ? JSON.parse(localStorage.getItem('cart') || '[]') as ICart
  : []

export const cartItemsStore = atom<ICart>(initialCart)
export const isCartOpen = atom(false)
export const promoCodeStore = atom<string>('')
export const orderNoteStore = atom<string>('')
export const userRankStore = atom<Rank | undefined>(undefined)
export const discountRateStore = atom<number>(0)
export const taxRateStore = atom<number>(8)
export const shippingFeeStore = atom<number>(30000)
export const isFloatingCartVisible = atom(true)

cartItemsStore.subscribe((cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
});

promoCodeStore.subscribe((code) => {
  if (typeof window !== 'undefined' && code) {
    sessionStorage.setItem('promo', code);
  }
})

/**
 * Adds or updates a cart item based on whether it already exists in the cart.
 * @param newItem - The cart item to add or update
 */
const addCartItem = (newItem: ICartItem) => {
  const currentCart = cartItemsStore.get();
  const existingItem = currentCart.find(item => item.product.id === newItem.product.id);

  if (existingItem) {
    const updatedCart = updateExistingItemQuantity(currentCart, newItem.product.id, newItem.quantity);
    cartItemsStore.set(updatedCart);
    return;
  }

  const updatedCart = addNewItem(currentCart, newItem);
  cartItemsStore.set(updatedCart);
};

/**
 * Adds a new item to the cart with the specified or default quantity.
 * @param currentCart - The current array of cart items
 * @param newItem - The new cart item to add
 * @returns Updated cart array with the new item
 */
function addNewItem(currentCart: ICart, newItem: ICartItem): ICart {
  const finalQuantity = newItem.quantity > 0 ? newItem.quantity : 1;
  return [...currentCart, { ...newItem, quantity: finalQuantity }];
}

function updateExistingItemQuantity(
  currentCart: ICart,
  productId: string,
  newQuantity: number
): ICart {
  return currentCart.map((item) =>
    item.product.id === productId
      ? {
          ...item,
          quantity: newQuantity
        }
      : item
  );
}

function getCartItemQuantity(productId: string): number {
  return cartItemsStore.get().find(item => item.product.id === productId)?.quantity || 0;
}

/**
 * Removes an item from the cart by product ID.
 * @param productId - The ID of the product to remove
 */
const removeFromCart = (productId: string): void => {
  const currentCart = cartItemsStore.get();
  const updatedCart = currentCart.filter((item) => item.product.id !== productId);
  cartItemsStore.set(updatedCart);
}

const clearCart = (): void => {
  cartItemsStore.set([]);
  localStorage.removeItem('cart')
  sessionStorage.removeItem('promo')
}

function increaseQuantity(productId: string) {
  const updatedCart = cartItemsStore.get()
    .map((item) =>
      item.product.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  cartItemsStore.set(updatedCart);
}

/**
 * Decreases the quantity of a specific product in the cart by 1.
 * Removes the item if the quantity reaches 0.
 * @param productId - The ID of the product to decrease
 */
function decreaseQuantity(productId: string) {
  const updatedCart = cartItemsStore.get()
    .map((item) =>
      item.product.id === productId && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    )
  cartItemsStore.set(updatedCart)
}

function getCartCalculations() {
  const currentCart = cartItemsStore.get();
  const rank = userRankStore.get();
  const shippingFee = shippingFeeStore.get();
  const discountRate = discountRateStore.get();
  const taxRate = taxRateStore.get();

  const subtotal = currentCart.reduce((sum, item) => {
    let price = item.product.unit_price;
    // Optional rank-based pricing logic
    const matchedVariant = item.product.price_variants?.find(v => v.rank === rank);
    if (matchedVariant?.price) price = matchedVariant.price;
    return sum + (price * item.quantity || 0);
  }, 0);

  const discount = (subtotal * discountRate) / 100;
  const tax = ((subtotal - discount) * taxRate) / 100;
  const shipping = subtotal >= 2000000 ? 0 : shippingFee;
  // const total = subtotal - discount + tax + shipping;
  const total = subtotal

  return { subtotal, discount, tax, shipping, total };
}

function calculateSubtotal(): number {
  return getCartCalculations().subtotal;
}

function calculateShippingFee(): number {
  return getCartCalculations().shipping;
}

function calculateDiscount(): number {
  return getCartCalculations().discount;
}

function calculateTax(): number {
  return getCartCalculations().tax;
}

function calculateTotal(): number {
  return getCartCalculations().total;
}

export const totalCartQuantity = computed(cartItemsStore, (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const useCartStore = () => {
  return {
    addCartItem,
    increaseQuantity,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    calculateSubtotal,
    calculateDiscount,
    calculateTax,
    calculateTotal,
    calculateShippingFee,
    getCartItemQuantity,
  };
};
export default useCartStore;