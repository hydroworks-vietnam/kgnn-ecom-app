import { Link } from 'react-router';
import { cn } from '@/utils/helpers';
import Layout from '~/components/Layout';
import { useEffect, useRef, useState } from 'react';
import {
  MessageSquare,
  Layout as LayoutIcon,
  Wrench,
  RefreshCw,
  ChevronRightCircle,
} from 'lucide-react';

interface StatConfig {
  target: number;
  suffix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { target: 100, suffix: '+', label: 'Dự án hoàn thành' },
  { target: 500, suffix: '+', label: 'Sản phẩm' },
  { target: 1000, suffix: '+', label: 'Khách hàng' },
  { target: 98, suffix: '%', label: 'Hài lòng' },
];

function StatCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frameId: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number;
          const duration = 500;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              frameId = window.requestAnimationFrame(step);
            }
          };
          frameId = window.requestAnimationFrame(step);
        } else {
          setCount(0);
          if (frameId) window.cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [target]);

  return <span ref={ref}>{count}</span>;
}



function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('active');
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function meta() {
  return [
    { title: 'Không Gian Nhà Nông - Giải Pháp Thủy Canh Hiện Đại' },
    {
      name: 'description',
      content:
        'Mang không gian xanh và thực phẩm sạch vào ngôi nhà của bạn với hệ thống thủy canh tự động thông minh. Tiết kiệm diện tích, tối ưu năng suất.',
    },
  ];
}

export default function Home() {
  const workflowRef1 = useScrollReveal<HTMLDivElement>();
  const workflowRef2 = useScrollReveal<HTMLDivElement>();
  const workflowRef3 = useScrollReveal<HTMLDivElement>();
  const workflowRef4 = useScrollReveal<HTMLDivElement>();
  const workflowTitleRef = useScrollReveal<HTMLDivElement>();

  return (
    <Layout>
      <style>{`
        .hero-gradient { background-image: linear-gradient(135deg, #ec5b13 0%, #f59e0b 100%); }
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .reveal-on-scroll.active {
          opacity: 1;
          transform: translateY(0);
        }
        .step-line::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -50%;
          width: 100%;
          height: 2px;
          background: #ec5b13;
          z-index: -1;
        }
        @media (max-width: 768px) {
          .step-line::after { display: none; }
        }
        @keyframes subtle-shake {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-1deg); }
          100% { transform: rotate(0deg); }
        }
        .hover-shake:hover {
          animation: subtle-shake 0.4s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="-mx-4 md:-mx-8 lg:-mx-36 relative overflow-hidden py-16 lg:py-8 px-6 md:px-8 lg:px-36 min-h-[600px] flex items-center">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff6ed] via-[#fdfbf9] to-[#f8f6f6] dark:from-slate-900 dark:to-background-dark -z-20" />

        {/* Mobile Background Image */}
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUpUVATm8CQjRGShfiBm6GUhShd-CWz1g0poFOwNKNReev0xdPGrU1l89eF5EVEIJnCIUDswl4tTdDWskKjGb8X3lvTcnh6NXpHzk-6ux-C0vvfqxAvkExHxHyExqKwVQNj9HX5fNvi6WduOHbHZBMDZO3zg9TvJ82n1JhMpITHXrTcXIIQZL5sCq_dAxZOGKbCqMD0IyfgX6-YjZz5Np24MSx-WDrh73LNtWPcNzp0vYCD704usS_a46qXpkMdPfxdpILuBhzJcU"
            alt=""
            className="w-full h-full object-cover scale-110 blur-[2px] dark:opacity-40"
          />
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/60 backdrop-brightness-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 dark:bg-primary/10 backdrop-blur-md text-primary border border-primary/20 shadow-sm">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="text-xs font-bold uppercase tracking-wider">Công nghệ tiên tiến</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight drop-shadow-sm">
                Nông Nghiệp Sạch <br />
                <span className="text-transparent bg-clip-text hero-gradient">Ngay Tại Nhà</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Mang không gian xanh và thực phẩm sạch vào ngôi nhà của bạn với hệ thống thủy canh tự động thông minh. Tiết kiệm diện tích, tối ưu năng suất.
              </p>
              <div className="pt-4">
                <Link to="/products" className="flex-1 bg-primary text-white p-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-primary/30 sm:px-8 sm:py-4 sm:text-lg">
                  Khám phá ngay
                  <ChevronRightCircle />
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 pt-6 grayscale opacity-60">
                <div className="flex items-center gap-2 whitespace-nowrap bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-lg">shield</span> <span className="text-xs sm:text-sm font-medium">Bảo hành 5 năm</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-lg">energy_savings_leaf</span> <span className="text-xs sm:text-sm font-medium">Tiết kiệm 90% nước</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative mt-10 lg:mt-0">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[12px] border-white dark:border-slate-800 hover-shake transition-transform cursor-pointer">
                <img
                  alt="Lush green lettuce growing in modern hydroponic pipes"
                  className="w-full h-[350px] lg:h-[500px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUpUVATm8CQjRGShfiBm6GUhShd-CWz1g0poFOwNKNReev0xdPGrU1l89eF5EVEIJnCIUDswl4tTdDWskKjGb8X3lvTcnh6NXpHzk-6ux-C0vvfqxAvkExHxHyExqKwVQNj9HX5fNvi6WduOHbHZBMDZO3zg9TvJ82n1JhMpITHXrTcXIIQZL5sCq_dAxZOGKbCqMD0IyfgX6-YjZz5Np24MSx-WDrh73LNtWPcNzp0vYCD704usS_a46qXpkMdPfxdpILuBhzJcU"
                />
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Workflow Section */}
      <section className="-mx-4 md:-mx-8 lg:-mx-36 py-12 bg-gray-100 dark:bg-slate-900/50 px-4 md:px-8 lg:px-36" id="workflow">
        <div className="max-w-7xl mx-auto">
          <div ref={workflowTitleRef} className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Quy Trình</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Chúng tôi đồng hành cùng bạn từ ý tưởng ban đầu đến khi thu hoạch những sản phẩm chất lượng nhất.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative">
            {/* Step 1 */}
            <div ref={workflowRef1} className="flex flex-col items-center text-center reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
              <div className="relative mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center z-10 relative mb-4">
                  <MessageSquare className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="absolute top-0 right-1/4 sm:-top-2 sm:right-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">01</div>
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 dark:text-white">Tư Vấn</h3>
              <p className="text-gray-500 dark:text-slate-400 text-[10px] sm:text-sm px-2">Khảo sát mặt bằng, tư vấn quy mô phù hợp.</p>
            </div>
            {/* Step 2 */}
            <div ref={workflowRef2} className="flex flex-col items-center text-center reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="relative mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center z-10 relative mb-4">
                  <LayoutIcon className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="absolute top-0 right-1/4 sm:-top-2 sm:right-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">02</div>
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 dark:text-white">Thiết Kế</h3>
              <p className="text-gray-500 dark:text-slate-400 text-[10px] sm:text-sm px-2">Lên bản vẽ kỹ thuật chi tiết, tối ưu hoá.</p>
            </div>
            {/* Step 3 */}
            <div ref={workflowRef3} className="flex flex-col items-center text-center reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
              <div className="relative mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center z-10 relative mb-4">
                  <Wrench className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="absolute top-0 right-1/4 sm:-top-2 sm:right-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">03</div>
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 dark:text-white">Lắp Đặt</h3>
              <p className="text-gray-500 dark:text-slate-400 text-[10px] sm:text-sm px-2">Thi công nhanh chóng, vật liệu bền bỉ.</p>
            </div>
            {/* Step 4 */}
            <div ref={workflowRef4} className="flex flex-col items-center text-center reveal-on-scroll" style={{ transitionDelay: '0.4s' }}>
              <div className="relative mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center z-10 relative mb-4">
                  <RefreshCw className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="absolute top-0 right-1/4 sm:-top-2 sm:right-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">04</div>
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 dark:text-white">Thu Hoạch</h3>
              <p className="text-gray-500 dark:text-slate-400 text-[10px] sm:text-sm px-2">Hướng dẫn vận hành, chăm sóc thu hoạch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="-mx-4 md:-mx-8 lg:-mx-36 py-16 lg:py-24 overflow-hidden px-6 md:px-8 lg:px-36 bg-white dark:bg-background-dark" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800">
                    <img
                      className="w-full h-64 object-cover"
                      alt="Close up of vibrant green hydroponic basil"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoSq5bGe2oeRwd_Gl489KMYeMJcIJ4OzkDZOrD-NXZKoBiSunUVqTPxlOaKCdb97wjlD3Y0YVKfM6wMvcn2toSnIJngwbfgOd8BZ2eWaMy7YD3gW4B7QFnwNcskDdtAnaa7qaw0FFmmK1JhUx_dRR2phuIcBttOdrWcK08hi3POJdWbpCEKFCyC7-p-2P6Foc0DJvU68084JHxxTQyQ2Z7b0Kd0WwTbIaZiFM8dMlhrr34IB6ph5n3llu5z_0Jmgv91uaTg_RfqqI"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800">
                    <img
                      className="w-full h-48 object-cover"
                      alt="Indoor vertical farming unit with LED lights"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwKCvQUgLpQ_clAa6eb7jk72v7Uvhs1dcObD5u4_V8GLAHSK8bxbZZTS8FQ3DY1FJsW5p6MOM40fY9Div_uyWiExicK9cyYuWvNtJq0YniP-3NbrlAu-ws_yAPc7V9ZI-lQQzLillLC5J3l9aGcY_Vh8LfOosxE7LylJ1GejKDNedE2fvk2UVK3_DoRGvO8-E7k6KiDaB3aDFfO_C4HLubb6hVvXWDchLn3kuK3OafEKawPAdJqVtoy91aQP6t4WfLi_I7pI2dMis"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800">
                    <img
                      className="w-full h-48 object-cover"
                      alt="Fresh vegetables being harvested from water pipes"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS3IutAozYWcUAdETT8ePt3YsTOKSJXgeosm6sLucPTEImnfb7_lM0Bf51saCygSfplWGQPiOZQ0BOKhmWj0nPQQfym41u_pDejZLHvIjUNrpMYcLVx4Iv_tKsSKx_waP4pTq_9V4guwBcwjPKuhFcXGKDbkRuqKC5iziGKBULjAWEqtgUpU7f0XuqhwXpJDehbu8i-nfjC-gbbgDg8YJ3UsH7qcOWRa5JAWkPi-dAr-fLIuyOn3Z3YZdwvo3Py2DibH-j6Z6oJbE"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800">
                    <img
                      className="w-full h-64 object-cover"
                      alt="Lush microgreens growing in a tray"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7w41w6sPKUMehsatmLlIkuIq8lpVrP_5UiMNseJTsGnQeE3MRzS4lQaWqjX0yfGVBQneDhH64F6oIDEsG17m7gf-EURdrVhG_GpBQRgYWKSRew9O-uy_qkqq2sJwEv6q_SapMc4AbcyN3be9O-Sqss2JeZeENDM1ulD_KT6g2qpgTyyNT2MS1pTmyo25H0jyMmfdUZMCLMAJWrtEyrkdTXRiYL-fh5jXHMqtIK1I7R4GzQb7Hj5GAspRGN3jIhZtt0alBwlTgBLw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 top-0 left-0 w-full h-full bg-primary/5 rounded-full scale-150 blur-3xl"></div>
            </div>
            <div>
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Tại Sao Chọn Chúng Tôi</h2>
              <h3 className="text-4xl font-black mb-8 leading-tight text-slate-900 dark:text-white">Giải Pháp Nông Nghiệp Thông Minh <br /> Cho Cuộc Sống Hiện Đại</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">health_and_safety</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">An Toàn Tuyệt Đối</h5>
                    <p className="text-slate-600 dark:text-slate-400">Rau sạch 100%, không thuốc trừ sâu, không chất kích thích, an toàn cho cả gia đình.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">settings_suggest</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">Vận Hành Tự Động</h5>
                    <p className="text-slate-600 dark:text-slate-400">Hệ thống bơm và ánh sáng thông minh tự vận hành, tiết kiệm thời gian chăm sóc tối đa.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">water_drop</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">Tối Ưu Tài Nguyên</h5>
                    <p className="text-slate-600 dark:text-slate-400">Tiết kiệm 90% lượng nước so với canh tác truyền thống và không cần dùng đất.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-secondary/10 rounded-2xl border-l-4 border-secondary">
                <p className="italic text-slate-700 dark:text-slate-300 font-medium">
                  "Không Gian Nhà Nông không chỉ bán hệ thống thủy canh, chúng tôi mang đến một phong cách sống xanh và bền vững cho người Việt."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="-mx-4 md:-mx-8 lg:-mx-36 py-0 my-0 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 px-4 md:px-8 lg:px-36">
        <div className="max-w-7xl mx-auto py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center group transition-all hover:scale-105">
                <div className="text-4xl lg:text-5xl font-black text-primary mb-1 flex justify-center items-baseline gap-1">
                  <StatCounter target={stat.target} />
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-xs lg:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="-mx-4 md:-mx-8 lg:-mx-36 px-4 md:px-8 lg:px-36 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="hero-gradient rounded-[2.5rem] p-8 lg:p-20 relative overflow-hidden text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <span className="material-symbols-outlined text-[200px]">eco</span>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-black mb-6 leading-tight">Sẵn sàng để bắt đầu xây dựng vườn rau sạch của bạn?</h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                Hãy liên hệ với chúng tôi hôm nay để được khảo sát và tư vấn miễn phí giải pháp phù hợp nhất cho ngôi nhà của bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg">
                  Đăng ký tư vấn miễn phí
                </Link>
                <a href="tel:19001234" className="bg-black/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-black/30 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-xl">call</span> Hotline: 1900 1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
