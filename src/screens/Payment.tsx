import { Input } from '@/components/Input/BasicInput';
import CartItem from '@/components/ui/CartItem';
import CartSummary from '@/components/ui/CartSummary';
import PromoCodeInput from '@/components/ui/PromoCodeInput';
import useCartStore, { cartItemsStore, promoCodeStore } from '@/store/cart';
import type { ICartItem } from '@/types/cart';
import { useStore } from '@nanostores/react';
import { Banknote, CreditCard, Landmark, MapPin, TruckIcon } from 'lucide-react';
import React, { useState } from 'react';
import momoIcon from '@/assets/momo_icon.svg'; 
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { navigate } from 'astro:transitions/client';
import { cn } from '@/utils/helpers';
import orderService from '@/services/orderService';

type PaymentMethod = 'BANK' | 'COD' | 'CREDIT_CARD' | 'E_WALLET';

const PaymentScreen: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('COD');
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
  const [alertContext, setAlertContext] = useState({
    title: 'Thông báo',
    message: '',
    type: 'error' as 'error' | 'success',
    onConfirm: () => {},
  });

  const cart = useStore(cartItemsStore);
  const promoCode = useStore(promoCodeStore);
  const { calculateDiscount, calculateShippingFee, calculateTotal } = useCartStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onContinueShopping = () => { navigate('/products') }

  const handleApplyCode = (isValid: boolean) => {
    if (!isValid) {
      setAlertContext({
        title: 'Tiếc quá!',
        message: 'Mã giảm giá chưa thể áp dụng được do không tìm thấy giá phù hợp',
        type: 'error',
        onConfirm: () => {},
      })
    }
  };

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      return;
    }

    if (!userInfo.fullName || !userInfo.phone || !userInfo.city || !userInfo.district || !userInfo.address) {
      setAlertContext((prev) => ({
        title: 'Lỗi',
        message: 'Xin hãy điền đầy đủ thông tin',
        type: 'error',
        onConfirm: () => {},
      }))
      setAlertOpen(true);
      return;
    }

    if (!agreedToTerms) {
      setAlertContext((prev) => ({
        ...prev,
        message: 'Xin hãy đồng ý điều khoản điều kiện',
        type: 'error',
        onConfirm: () => {},
      }))
      setAlertOpen(true);
      return;
    }

    const orderData = {
      deliveryFee: calculateShippingFee(),
      deliveryAddr: `${userInfo.address}, ${userInfo.district}, ${userInfo.city}`,
      orderTime: new Date().toISOString(),
      receiverName: userInfo.fullName,
      receiverPhone: userInfo.phone,
      receiverEmail: userInfo.email,
      paymentMethod: selectedPaymentMethod,
      discountFee: calculateDiscount(),
      totalAmount: calculateTotal(),
      productDetailList: cart.map(item => ({
        productId: item.product.id,
        originalPrice: item.product.unit_price,
        quantity: item.quantity
      })),
      promoCode
    };

    orderService.createOrder(orderData)
    .then((_) => {
      setAlertContext({
        title: 'Đơn hàng đã được đặt thành công',
        message: 'Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.',
        type: 'success',
        onConfirm: () => {
          navigate('/products')
        },
      });
      setAlertOpen(true);
      useCartStore().clearCart();     
    })
    .catch((error) => {
      console.error('Error processing payment:', error);
      setAlertContext({
        title: 'Đặt hàng không thành công',
        message: 'Không thể đặt hàng. Vui lòng thử lại hoặc tải đơn hàng và gửi về trang Zalo chính thức của chúng tôi để được hỗ trợ.',
        type: 'error',
        onConfirm: () => {},
      })
      setAlertOpen(true);
    })
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

          {/* Shipping Method */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`flex-1 border rounded-lg p-3 text-center flex items-center justify-center space-x-2 ${shippingMethod === 'Delivery' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'}`}
              onClick={() => setShippingMethod('Delivery')}
            >
              <TruckIcon className={`w-4 h-4 ${shippingMethod === 'Delivery' ? 'text-primary' : 'text-slate-500'}`} />
              <span className={`text-sm ${shippingMethod === 'Delivery' ? 'text-primary' : 'text-slate-500'}`}>Giao hàng tận nơi</span>
            </button>
            <button
              disabled={true}
              className={`flex-1 border rounded-lg p-3 text-center flex items-center justify-center space-x-2 ${shippingMethod === 'Pick up' ? 'border-primary text-primary' : 'border-gray-300 bg-gray-300'}`}
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
                Emai
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
                <label className="text-sm font-medium text-gray-700">Tỉnh/Thành phố <span className="text-red-500">*</span></label>
                <Input
                  name="city"
                  placeholder="Nhập tỉnh/thành phố"
                  className="w-full mt-1"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Quận/Huyện <span className="text-red-500">*</span></label>
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
            <div className='text-xs text-red-500'>(Dấu * là bắt buộc điền)</div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Tôi đã đọc và đồng ý với điều khoản và điều kiện khi mua hàng ở trang {' '}
                <span className='text-primary font-bold'>Không gian nhà nông</span>
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
                disabled={true}
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'BANK' ? 'border-primary text-primary' : 'border-gray-300 bg-gray-300 text-slate-500'}`}
                onClick={() => setSelectedPaymentMethod('BANK')}
              >
                <Landmark className="w-6 h-6" />
                <span className="text-sm text-center">Chuyển khoản ngân hàng</span>
              </button>
              <button
                disabled={true}
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'CREDIT_CARD' ? 'border-primary text-primary' : 'border-gray-300 bg-gray-300 text-slate-500'}`}
                onClick={() => setSelectedPaymentMethod('CREDIT_CARD')}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-sm text-center">Thanh toán bằng thẻ quốc tế</span>
              </button>
              <button
                disabled={true}
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'E_WALLET' ? 'border-primary text-primary' : 'border-gray-300 bg-gray-300 text-slate-500'}`}
                onClick={() => setSelectedPaymentMethod('E_WALLET')}
              >
                <img src={momoIcon.src} alt="Momo logo" className="h-8 w-auto" />
                <span className="text-sm text-center">Ví điện tử (MoMo, Zalopay)</span>
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
        <div className="bg-white rounded-lg shadow-lg p-4">
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
                  <CartItem key={item.product.id} item={item} setAlertOpen={setAlertOpen} />
                ))}
              </div>
            )}
          </div>
          <hr className="my-2" />
          <PromoCodeInput onApplyCode={handleApplyCode}/>
          <CartSummary />

          <div className="space-y-3">
            <button
              disabled={cart.length === 0}
              className={cn("w-full rounded-lg p-3 mt-4 hover:shadow-xl transition", cart.length === 0 ? "bg-gray-300 text-slate-500" : "bg-gradient text-white")}
              onClick={handleConfirmOrder}
            >
              Xác nhận đơn hàng
            </button>
            <button
              onClick={onContinueShopping}
              className="w-full py-3 text-gray-600 hover:text-gray-800 border-2 border-gray-200 hover:border-gray-300 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>

      <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialog.Portal container={document.body}>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-200" style={{ zIndex: 1000 }}>
            {alertContext.type == 'success' && (
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" />
                </svg>
              </div>
            )}
            <div className="text-center">
              {alertContext.type == 'error' && <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😭</span>
              </div> }
              <AlertDialog.Title className={cn('text-xl font-bold mb-2', alertContext.type == 'error' ? 'text-red-500' : 'text-gray-900')}>
                {alertContext.title}
              </AlertDialog.Title>
              <AlertDialog.Description className="text-gray-600 mb-6 leading-relaxed">
                {alertContext.message}
              </AlertDialog.Description>
              <AlertDialog.Action
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
                onClick={() => alertContext.onConfirm()}
              >
                Đã hiểu
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default PaymentScreen;