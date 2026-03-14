import { MetaIcon } from '@/components/Icons/meta';
import { ZaloIcon } from '@/components/Icons/zalo';
import { TikTokIcon } from '@/components/Icons/tiktok';
import { YoutubeIcon } from '@/components/Icons/youtube';

const PageFooter = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: <MetaIcon size={28} />,
      url: 'https://facebook.com/kgnn.hydroponics'
    },
    {
      name: 'Zalo',
      icon: <ZaloIcon size={28} />,
      url: 'https://zalo.me/0981250725'
    },
    {
      name: 'TikTok',
      icon: <TikTokIcon size={28} />,
      url: 'https://tiktok.com/@kgnn.hydroponics'
    },
    {
      name: 'Youtube',
      icon: <YoutubeIcon size={28} />,
      url: 'https://youtube.com/@kgnn.hydroponics'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">Không gian nhà nông</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Chuyên cung cấp các giải pháp nông nghiệp hiện đại, hydroponics và các thiết bị nông nghiệp chất lượng cao.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📍 Q9, TPHCM, Việt Nam</p>
              <p>📞 098 125 0725</p>
              <p>✉️ info@kgnn.com</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Giờ làm việc</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Thứ Hai - Thứ Sáu: 8:00 - 18:00</p>
              <p>Thứ Bảy: 9:00 - 17:00</p>
              <p>Chủ Nhật: Nghỉ</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 hover:bg-gray-50 hover:scale-110 hover:shadow-lg"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© {new Date().getFullYear()} Bản quyền thuộc về Không gian nhà nông. All rights reserved.</p>
              <p className="mt-1 text-xs text-gray-500">Đã báo cáo Bộ Công Thương</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
