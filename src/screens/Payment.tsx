import { Input } from '@/components/Input/BasicInput';
import CartItem from '@/components/ui/CartItem';
import CartSummary from '@/components/ui/CartSummary';
import PromoCodeInput from '@/components/ui/PromoCodeInput';
import useCartStore, { cartItemsStore, discountRateStore, promoCodeStore, shippingFeeStore, taxRateStore } from '@/store/cart';
import type { ICartItem } from '@/types/cart';
import { useStore } from '@nanostores/react';
import { Banknote, CreditCard, Landmark, MapPin, TruckIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { cx } from 'class-variance-authority';

type PaymentMethod = 'BANK' | 'COD' | 'CREDIT_CARD';

const PaymentScreen: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('BANK');
  const [selectedBank, setSelectedBank] = useState('HDBank');
  const [shippingMethod, setShippingMethod] = useState('Delivery');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    address: '',
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');

  const cart = useStore(cartItemsStore);
  const promoCode = useStore(promoCodeStore);
  const discountRate = useStore(discountRateStore);
  const shippingFee = useStore(shippingFeeStore);
  const taxRate = useStore(taxRateStore);
  const { calculateSubtotal, calculateDiscount, calculateTax, calculateShippingFee, calculateTotal } = useCartStore();

  // Handle input changes for user information
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const isErrorAlert = (type : string) => type === 'error';

  // Log cart changes
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      setAlertMessage('Giỏ hàng trống');
      setAlertType('error');
      setAlertOpen(true);
      return;
    }

    if (!userInfo.fullName || !userInfo.email || !userInfo.phone || !userInfo.address) {
      setAlertMessage('Xin hãy điền đầy đủ thông tin');
      setAlertType('error');
      setAlertOpen(true);
      return;
    }

    if (!agreedToTerms) {
      setAlertMessage('Xin hãy đồng ý điều khoản điều kiện');
      setAlertType('error');
      setAlertOpen(true);
      return;
    }

    // Prepare cart data for payment
    const orderData = {
      cartItems: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name || 'Unknown',
        quantity: item.quantity,
        unitPrice: item.product.unit_price,
        total: item.product.unit_price * item.quantity,
      })),
      financialSummary: {
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        tax: calculateTax(),
        shippingFee: calculateShippingFee(),
        total: calculateTotal(),
      },
      promoCode: promoCode || null,
      discountRate,
      shippingFee,
      taxRate,
      paymentMethod: selectedPaymentMethod,
      bank: selectedPaymentMethod === 'BANK' ? selectedBank : null,
      shippingMethod,
      userInfo: {
        fullName: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phone,
        city: userInfo.city,
        district: userInfo.district,
        address: userInfo.address,
      },
      agreedToTerms,
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setAlertMessage('Order placed successfully!');
        setAlertType('success');
        setAlertOpen(true);
        useCartStore().clearCart();
        setTimeout(() => {
          window.location.href = '/order-confirmation';
        }, 1500); // Redirect after showing success message
      } else {
        setAlertMessage('Không thể đặt hàng. Vui lòng thử lại hoặc tải đơn hàng và gửi về trang Zalo chính thức của chúng tôi để được hỗ trợ.');
        setAlertType('error');
        setAlertOpen(true);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setAlertMessage('Không thể đặt hàng. Vui lòng thử lại hoặc tải đơn hàng và gửi về trang Zalo chính thức của chúng tôi để được hỗ trợ.');
      setAlertType('error');
      setAlertOpen(true);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row w-full gap-6">
      {/* Left Section */}
      <div className="w-full xl:w-3/5 space-y-6">
        {/* User Information Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-orange-500 rounded-full mr-2"></div>
            <h1 className="text-xl font-semibold text-gray-600">Thông tin nhận hàng</h1>
          </div>

          {/* Shipping Method Toggle */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`flex-1 border rounded-lg p-3 text-center flex items-center justify-center space-x-2 ${shippingMethod === 'Delivery' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'}`}
              onClick={() => setShippingMethod('Delivery')}
            >
              <TruckIcon className={`w-4 h-4 ${shippingMethod === 'Delivery' ? 'text-primary' : 'text-slate-500'}`} />
              <span className={`text-sm ${shippingMethod === 'Delivery' ? 'text-primary' : 'text-slate-500'}`}>Giao hàng tận nơi</span>
            </button>
            <button
              className={`flex-1 border rounded-lg p-3 text-center flex items-center justify-center space-x-2 ${shippingMethod === 'Pick up' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'}`}
              onClick={() => setShippingMethod('Pick up')}
            >
              <MapPin className={`w-4 h-4 ${shippingMethod === 'Pick up' ? 'text-primary' : 'text-slate-500'}`} />
              <span className={`text-sm ${shippingMethod === 'Pick up' ? 'text-primary' : 'text-slate-500'}`}>Đến lấy tại kho</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <Input
                name="fullName"
                placeholder="Nhập họ và tên"
                className="w-full mt-1"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                name="email"
                placeholder="Nhập email"
                className="w-full mt-1"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <Input
                name="phone"
                placeholder="Nhập số điện thoại"
                className="w-full mt-1"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
                <Input
                  name="city"
                  placeholder="Nhập tỉnh/thành phố"
                  className="w-full mt-1"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Quận/Huyện</label>
                <Input
                  name="district"
                  placeholder="Nhập quận/huyện"
                  className="w-full mt-1"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <Input
                name="address"
                placeholder="Nhập địa chỉ"
                className="w-full mt-1"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Tôi đã đọc và đồng ý với điều khoản và điều kiện.
              </label>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-orange-500 rounded-full mr-2"></div>
            <h1 className="text-xl font-semibold text-gray-600">Phương thức thanh toán</h1>
          </div>
          <div className="mb-6">
            <h2 className="text-sm text-gray-500 mb-2">Chọn phương thức thanh toán</h2>
            <div className="flex flex-col lg:flex-row gap-4">
              <button
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'COD' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'}`}
                onClick={() => setSelectedPaymentMethod('COD')}
              >
                <Banknote className="w-6 h-6" />
                <span className="text-sm text-center">Thanh toán khi nhận hàng (COD)</span>
              </button>
              <button
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'BANK' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'}`}
                onClick={() => setSelectedPaymentMethod('BANK')}
              >
                <Landmark className="w-6 h-6" />
                <span className="text-sm text-center">Chuyển khoản</span>
              </button>
              <button
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'CREDIT_CARD' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'}`}
                onClick={() => setSelectedPaymentMethod('CREDIT_CARD')}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-sm text-center">Thanh toán bằng thẻ quốc tế</span>
              </button>
            </div>
          </div>
          {selectedPaymentMethod === 'BANK' && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Ngân hàng</h2>
              <select
                className="border rounded-lg p-2 w-full text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option>Techcombank</option>
                <option>Vietcombank</option>
                <option>HDBank</option>
                <option>VietinBank</option>
                <option>BIDV</option>
                <option>VPBank</option>
                <option>MB</option>
                <option>HSBC</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full xl:w-2/5">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 sticky top-4">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-orange-500 rounded-full mr-2"></div>
            <h2 className="text-xl font-semibold text-gray-600">Thông tin đơn hàng</h2>
          </div>
          <div className="flex-1 overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48">
                <p className="text-gray-500 text-center text-lg mb-2">Giỏ hàng trống</p>
                <a href="/products" className="text-primary text-sm hover:underline">
                  Tiếp tục mua sắm bạn nhé
                </a>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((item: ICartItem) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            )}
          </div>
          <hr className="my-2" />
          <PromoCodeInput />
          <CartSummary />
          <button
            className="w-full bg-gradient text-white rounded-lg p-3 mt-4 hover:shadow-xl transition"
            onClick={handleConfirmOrder}
          >
            Xác nhận đơn hàng
          </button>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <AlertDialog.Title className={cx("text-lg font-semibold", isErrorAlert('error') ? 'text-red-600' : 'text-blue-500')}>
              {isErrorAlert('error') ? 'Lỗi' : 'Thành công'}
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-gray-600">
              {alertMessage}
            </AlertDialog.Description>
            <div className="mt-4 flex justify-end">
              <AlertDialog.Action
                className={`px-4 py-2 rounded-lg text-sm font-medium ${isErrorAlert('error')
                  ? 'hover:bg-gray-300' 
                  : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                onClick={() => setAlertOpen(false)}
              >
                OK
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default PaymentScreen;