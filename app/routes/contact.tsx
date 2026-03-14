import Layout from '@/components/Layout';
import { MetaIcon } from '@/components/Icons/meta';
import { TikTokIcon } from '@/components/Icons/tiktok';
import { YoutubeIcon } from '@/components/Icons/youtube';
import { Phone, Mail, MapPin } from 'lucide-react';
import { ZaloIcon } from '~/components/Icons/zalo';

const Contact = () => {
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <MetaIcon size={24} />,
      value: 'kgnn.hydroponics',
      url: 'https://facebook.com/kgnn.hydroponics'
    },
    { 
      name: 'Zalo', 
      icon: <ZaloIcon size={24} />,
      value: '098 125 0725',
      url: 'https://zalo.me/0981250725'
    },
    { 
      name: 'Youtube', 
      icon: <YoutubeIcon size={24} />,
      value: '@kgnn.hydroponics',
      url: 'https://youtube.com/@kgnn.hydroponics'
    },
    { 
      name: 'TikTok', 
      icon: <TikTokIcon size={24} />,
      value: '@kgnn.hydroponics',
      url: 'https://tiktok.com/@kgnn.hydroponics'
    }
  ];

  const phoneNumbers = [
    '098 125 0725'
  ];

  const emails = [
    'info@kgnn.com',
    'support@kgnn.com'
  ];

  const address = 'Số 123, Đường ABC, Q9, TPHCM, Việt Nam';

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn. Hãy liên hệ với chúng tôi qua các kênh sau:
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kênh liên hệ</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 rounded-xl transition-all duration-200 group"
                    >
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 border-2 border-transparent group-hover:bg-gray-100 transition-colors duration-200">
                        {link.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-center">{link.name}</h3>
                      <p className="text-sm text-gray-600 text-center mt-1">{link.value}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    Thông tin liên hệ
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Điện thoại</h4>
                      <div className="space-y-2">
                        {phoneNumbers.map((phone, index) => (
                          <a
                            key={index}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="flex items-center text-gray-600 hover:text-primary transition-colors"
                          >
                            <Phone className="w-5 h-5 mr-3" />
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Email</h4>
                      <div className="space-y-2">
                        {emails.map((email, index) => (
                          <a
                            key={index}
                            href={`mailto:${email}`}
                            className="flex items-center text-gray-600 hover:text-primary transition-colors"
                          >
                            <Mail className="w-5 h-5 mr-3" />
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Địa chỉ</h4>
                      <div className="flex items-start text-gray-600">
                        <MapPin className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                        {address}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Giờ làm việc
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Văn phòng</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Thứ Hai - Thứ Sáu</span>
                          <span className="font-medium">8:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Thứ Bảy</span>
                          <span className="font-medium">9:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chủ Nhật</span>
                          <span className="font-medium">Nghỉ</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Trang trại</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Thứ Hai - Chủ Nhật</span>
                          <span className="font-medium">7:00 - 18:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bản đồ</h2>
              <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-400">Bản đồ Google Maps sẽ hiển thị ở đây</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
