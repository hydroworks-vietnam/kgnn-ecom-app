import Layout from '@/components/Layout';

const Blog = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chia sẻ kiến thức, kinh nghiệm và mẹo hay về trồng rau thủy canh, hệ thống tưới tự động và nông nghiệp hiện đại
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Hình ảnh bài viết</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-primary font-medium">Thủy canh cơ bản</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                  Hướng dẫn bắt đầu với hệ thống thủy canh NFT
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Bài viết này sẽ hướng dẫn bạn cách thiết lập hệ thống thủy canh NFT (Nutrient Film Technique) đơn giản tại nhà, phù hợp cho người mới bắt đầu.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">15/03/2026</span>
                  <span className="text-sm text-primary font-medium hover:underline cursor-pointer">Đọc thêm</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Hình ảnh bài viết</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-primary font-medium">Hệ thống tưới</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                  Tự động hóa hệ thống tưới cho vườn thủy canh
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Tìm hiểu cách tự động hóa hệ thống tưới nước với timer và cảm biến độ ẩm để tiết kiệm thời gian và nước cho vườn thủy canh của bạn.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">10/03/2026</span>
                  <span className="text-sm text-primary font-medium hover:underline cursor-pointer">Đọc thêm</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Hình ảnh bài viết</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-primary font-medium">Dinh dưỡng</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                  Hướng dẫn pha dung dịch dinh dưỡng thủy canh
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Hướng dẫn chi tiết cách pha dung dịch dinh dưỡng hydroponic đúng chuẩn cho từng loại rau, giúp cây phát triển tối ưu và năng suất cao.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">05/03/2026</span>
                  <span className="text-sm text-primary font-medium hover:underline cursor-pointer">Đọc thêm</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Hình ảnh bài viết</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-primary font-medium">Sản phẩm</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                  So sánh các loại giá thể trồng rau thủy canh
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Đánh giá chi tiết các loại giá thể phổ biến như xơ dừa, perlite, rockwool và cách chọn giá thể phù hợp cho từng hệ thống trồng.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">01/03/2026</span>
                  <span className="text-sm text-primary font-medium hover:underline cursor-pointer">Đọc thêm</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Hình ảnh bài viết</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-primary font-medium">Kinh nghiệm</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                  5 lỗi thường gặp khi trồng rau thủy canh và cách khắc phục
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Tổng hợp những lỗi phổ biến mà người mới bắt đầu thường gặp phải và hướng dẫn cách khắc phục hiệu quả để vườn rau luôn khỏe mạnh.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">25/02/2026</span>
                  <span className="text-sm text-primary font-medium hover:underline cursor-pointer">Đọc thêm</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Hình ảnh bài viết</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-primary font-medium">Thu hoạch</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                  Cách thu hoạch và bảo quản rau thủy canh tươi ngon
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Mẹo thu hoạch đúng cách để giữ được độ tươi ngon và dinh dưỡng của rau thủy canh, đồng thời kéo dài thời gian sử dụng.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">20/02/2026</span>
                  <span className="text-sm text-primary font-medium hover:underline cursor-pointer">Đọc thêm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
