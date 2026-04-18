const orderService = {
  async createOrder(orderData: any) {
    try {
      if (orderData) {
        throw new Error(
          'Order creation is disabled in customer mode. Only GET requests are allowed.',
        );
      }

      return null;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
};

export default orderService;
