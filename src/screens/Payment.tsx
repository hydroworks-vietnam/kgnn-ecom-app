import { Input } from '@/components/Input/BasicInput';
import CartItem from '@/components/ui/CartItem';
import CartSummary from '@/components/ui/CartSummary';
import PromoCodeInput from '@/components/ui/PromoCodeInput';
import { cartItemsStore } from '@/store/cart';
import type { ICartItem } from '@/types/cart';
import { useStore } from '@nanostores/react';
import { Banknote, CreditCard, Landmark, MapPin, TruckIcon } from 'lucide-react';
import React, { useState } from 'react';

type PaymentMethod = 'BANK' | 'COD' | 'CREDIT_CARD';

const PaymentScreen: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('BANK');
  const [selectedBank, setSelectedBank] = useState('HDBank');
  const [shippingMethod, setShippingMethod] = useState('Delivery');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const cart = useStore(cartItemsStore);

  return (
    <div className="flex flex-col xl:flex-row w-full gap-6 ">
      {/* Left Section - 60% width on large screens, full width on mobile */}
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
              className={`flex-1 border rounded-lg p-3 text-center flex items-center justify-center space-x-2 ${shippingMethod === 'Delivery' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'
                }`}
              onClick={() => setShippingMethod('Delivery')}
            >
              <TruckIcon className={`w-4 h-4 ${shippingMethod === 'Delivery' ? 'text-primary' : 'text-slate-500'}`} />
              <span className={`text-sm ${shippingMethod === 'Delivery' ? 'text-primary' : 'text-slate-500'}`}>Giao hàng tận nơi</span>
            </button>
            <button
              className={`flex-1 border rounded-lg p-3 text-center flex items-center justify-center space-x-2 ${shippingMethod === 'Pick up' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'
                }`}
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
                placeholder="Nhập họ và tên"
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Nhập email"
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center mt-1">
                {/* <img src="https://flagcdn.com/w20/us.png" alt="US Flag" className="w-5 h-5 mr-2" /> */}
                <Input
                  placeholder="Nhập số điện thoại"
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
                <Input
                  placeholder="Nhập tỉnh/thành phố"
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Quận/Huyện</label>
                <Input
                  placeholder="Nhập quận/huyện"
                  className="w-full mt-1"
                />
              </div>
              {/* <div>
                <label className="text-sm font-medium text-gray-700">Mã bưu điện</label>
                <Input
                  placeholder="Nhập mã bưu điện"
                  className="w-full mt-1"
                />
              </div> */}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Nhập địa chỉ"
                className="w-full mt-1"
              />
              {/* <label className="text-sm font-medium text-gray-700">
                Quốc gia <span className="text-red-500">*</span>
              </label>
              <select className="border rounded-lg p-2 w-full text-gray-700 mt-1">
                <option>Chọn quốc gia</option>
                <option>Việt Nam</option>
              </select> */}
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
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'COD' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'
                  }`}
                onClick={() => setSelectedPaymentMethod('COD')}
              >
                <Banknote className="w-6 h-6" />
                <span className="text-sm text-center">Thanh toán khi nhận hàng (COD)</span>
              </button>
              <button
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'BANK' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'
                  }`}
                onClick={() => setSelectedPaymentMethod('BANK')}
              >
                <Landmark className="w-6 h-6" />
                <span className="text-sm text-center">Chuyển khoản</span>
              </button>
              <button
                className={`flex-1 border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedPaymentMethod === 'CREDIT_CARD' ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'
                  }`}
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

      {/* Right Section - 40% width on large screens, full width on mobile */}
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

          {/* Confirm Order Button */}
          <button className="w-full bg-gradient text-white rounded-lg p-3 mt-4 hover:shadow-xl transition">
            Xác nhận đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;