import Layout from '@/components/Layout';
import { useState } from 'react';

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  return (
    <Layout>
      <div className="min-h-screen py-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Về chúng tôi</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              KHÔNG GIAN NHÀ NÔNG - Đưa nông nghiệp công nghệ cao đến gần hơn với người tiêu dùng
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sứ mệnh của chúng tôi</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tại KHÔNG GIAN NHÀ NÔNG, chúng tôi tin rằng nông nghiệp không chỉ là nghề mà còn là nghệ thuật. Sứ mệnh của chúng tôi là mang đến những sản phẩm nông nghiệp sạch, an toàn và chất lượng cao nhất cho người tiêu dùng, đồng thời phổ biến kiến thức về nông nghiệp hiện đại đến cộng đồng.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chúng tôi áp dụng các công nghệ tiên tiến như thủy canh, khí canh và hệ thống tưới tự động để tối ưu hóa quá trình trồng trọt, đảm bảo cây trồng phát triển tốt nhất trong điều kiện kiểm soát hoàn toàn.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Giá trị cốt lõi</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary text-xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Chất lượng & An toàn</h3>
                    <p className="text-sm text-gray-600 mt-1">Sản phẩm luôn đạt tiêu chuẩn sạch, không hóa chất độc hại</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary text-xl">💡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Đổi mới & Công nghệ</h3>
                    <p className="text-sm text-gray-600 mt-1">Luôn áp dụng công nghệ cao vào quy trình sản xuất</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary text-xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Trách nhiệm & Minh bạch</h3>
                    <p className="text-sm text-gray-600 mt-1">Minh bạch trong quy trình sản xuất và nguồn gốc sản phẩm</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary text-xl">🌿</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Bền vững & Bảo vệ môi trường</h3>
                    <p className="text-sm text-gray-600 mt-1">Áp dụng các phương pháp canh tác thân thiện với môi trường</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Tại sao chọn chúng tôi?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Sản phẩm chất lượng cao</h3>
                <p className="text-gray-600 text-sm">
                  Rau củ được trồng trong môi trường kiểm soát hoàn toàn, không sử dụng hóa chất độc hại, đảm bảo an toàn cho sức khỏe người tiêu dùng
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Kiến thức chuyên sâu</h3>
                <p className="text-gray-600 text-sm">
                  Đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực nông nghiệp công nghệ cao luôn sẵn sàng hỗ trợ và tư vấn
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Dịch vụ toàn diện</h3>
                <p className="text-gray-600 text-sm">
                  Từ cung cấp sản phẩm, thiết lập hệ thống, đến hướng dẫn kỹ thuật - chúng tôi cung cấp giải pháp trọn gói
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-semibold mb-4">Khám phá không gian nhà nông của chúng tôi</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Hãy đặt tour tham quan trang trại để trải nghiệm thực tế và tìm hiểu sâu hơn về quy trình sản xuất của chúng tôi
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Đặt tour tham quan
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Đặt tour tham quan</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mb-4">
                  Hãy để lại thông tin liên hệ, chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận tour.
                </p>
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600"
                  >
                    Gửi yêu cầu
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
