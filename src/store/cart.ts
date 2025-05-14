import type { ICart, ICartItem } from '@/types/cart';
import { atom, computed } from 'nanostores';

// Initialize cart from session storage if available
const initialCart = typeof window !== 'undefined' 
  ? JSON.parse(sessionStorage.getItem('cart') || '[]')
  : [];

export const cartItemsStore = atom<ICart>(initialCart)
export const isCartOpen = atom(false)
export const promoCodeStore = atom<string>('');
export const discountRateStore = atom<number>(0);
export const taxRateStore = atom<number>(8);
export const shippingFeeStore = atom<number>(30000);
export const isFloatingCartVisible = atom(true);

// Subscribe to cart changes to persist in session storage
cartItemsStore.subscribe((cart) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
});

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

// function determineNewQuantity(currentQuantity: number, newQuantity: number): number {
//   if (newQuantity === 0) return 0; // Reset to 0 if specified
//   if (newQuantity > 0) return newQuantity; // Set specific quantity
//   return currentQuantity + 1; // Increment by 1 if -1 (default behavior)
// }

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
    );
  cartItemsStore.set(updatedCart);
}

function applyPromoCode(code: string): void {
  // Mock logic: In a real app, you'd validate the code via an API
  if (code === '20OFF') {
    promoCodeStore.set(code);
    discountRateStore.set(20); // 20% discount
  } else {
    promoCodeStore.set("");
    discountRateStore.set(0);
  }
}

function calculateSubtotal(): number {
  const currentCart = cartItemsStore.get();
  return currentCart.reduce(
    (sum, item) => sum + (item.product.unit_price * item.quantity || 0),
    0
  );
}

function calculateShippingFee(): number {
  const subtotal = calculateSubtotal();
  return subtotal >= 2000000 ? 0 : shippingFeeStore.get();
}

function calculateDiscount(): number {
  const subtotal = calculateSubtotal();
  const discountRate = discountRateStore.get();
  return (subtotal * discountRate) / 100;
}

function calculateTax(): number {
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  // Fixed 8% tax rate
  const TAX_RATE = 8;
  return ((subtotal - discount) * TAX_RATE) / 100;
}

function calculateTotal(): number {
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const tax = calculateTax();
  const shippingFee = calculateShippingFee();
  return subtotal - discount + tax + shippingFee;
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
    applyPromoCode,
    calculateSubtotal,
    calculateDiscount,
    calculateTax,
    calculateTotal,
    calculateShippingFee,
    getCartItemQuantity,
  };
};

export default useCartStore;