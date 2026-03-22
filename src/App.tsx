/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Star, 
  Calculator, 
  User, 
  BookOpen, 
  MessageSquare, 
  ChevronRight,
  Instagram,
  Facebook,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
}

interface Testimonial {
  id: number;
  name: string;
  content: string;
  role: string;
  avatar: string;
}

// --- Constants ---
const SERVICES: Service[] = [
  {
    id: 1,
    title: "Giải Mã Bản Đồ Vận Mệnh",
    description: "Phân tích chi tiết các chỉ số quan trọng: Đường đời, Sứ mệnh, Linh hồn, Nhân cách...",
    icon: <Calculator className="w-6 h-6" />,
    price: "999.000đ"
  },
  {
    id: 2,
    title: "Định Hướng Sự Nghiệp",
    description: "Tìm ra thế mạnh bẩm sinh và thời điểm vàng để bứt phá trong công việc.",
    icon: <BookOpen className="w-6 h-6" />,
    price: "1.500.000đ"
  },
  {
    id: 3,
    title: "Kết Nối Tình Duyên",
    description: "Xem độ tương hợp giữa hai người, thấu hiểu để yêu thương và gắn kết hơn.",
    icon: <User className="w-6 h-6" />,
    price: "1.200.000đ"
  },
  {
    id: 4,
    title: "Đặt Tên Khai Sinh/Thương Hiệu",
    description: "Lựa chọn cái tên mang năng lượng tích cực, hỗ trợ tối đa cho sự phát triển.",
    icon: <Sparkles className="w-6 h-6" />,
    price: "2.000.000đ"
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Nguyễn Thu Thủy",
    role: "Chủ doanh nghiệp",
    content: "Nhờ buổi tư vấn, tôi đã hiểu rõ tại sao mình luôn gặp khó khăn ở giai đoạn trước. Giờ đây tôi tự tin hơn với những quyết định của mình.",
    avatar: "https://picsum.photos/seed/thuy/100/100"
  },
  {
    id: 2,
    name: "Trần Minh Quân",
    role: "Freelancer",
    content: "Con số Đường đời 7 thực sự phản ánh đúng con người tôi. Cảm ơn chuyên gia đã giúp tôi tìm thấy sự bình yên trong tâm hồn.",
    avatar: "https://picsum.photos/seed/quan/100/100"
  }
];

// --- Helper Functions ---
const calculateLifePath = (dob: string): number | null => {
  if (!dob) return null;
  const digits = dob.replace(/\D/g, '');
  let sum = digits.split('').reduce((acc, d) => acc + parseInt(d), 0);
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return sum;
};

const getLifePathMeaning = (num: number): string => {
  const meanings: Record<number, string> = {
    1: "Người tiên phong, độc lập và quyết đoán. Bạn sinh ra để dẫn dắt.",
    2: "Người hòa giải, nhạy cảm và thấu hiểu. Bạn mang lại sự cân bằng.",
    3: "Người truyền cảm hứng, sáng tạo và lạc quan. Bạn tỏa sáng qua ngôn từ.",
    4: "Người xây dựng, thực tế và kỷ luật. Bạn là nền móng vững chắc.",
    5: "Người tự do, thích khám phá và thích nghi nhanh. Cuộc đời bạn là những chuyến đi.",
    6: "Người nuôi dưỡng, trách nhiệm và giàu tình thương. Gia đình là tất cả với bạn.",
    7: "Người tìm kiếm tri thức, sâu sắc và tâm linh. Bạn nhìn thấu những điều ẩn giấu.",
    8: "Người điều hành, quyền lực và thực tế. Bạn có khả năng quản trị tài chính tuyệt vời.",
    9: "Người nhân đạo, bao dung và lý tưởng. Bạn sống vì cộng đồng.",
    11: "Bậc thầy tâm linh, trực giác cực nhạy. Bạn mang sứ mệnh thức tỉnh người khác.",
    22: "Bậc thầy kiến thiết, biến những giấc mơ vĩ đại thành hiện thực.",
    33: "Bậc thầy chữa lành, mang năng lượng yêu thương vô điều kiện."
  };
  return meanings[num] || "Con số bí ẩn đang chờ bạn khám phá.";
};

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          <Moon className="text-black w-6 h-6 fill-current" />
        </div>
        <span className="text-xl font-serif italic tracking-wider text-white">Thần Số Học</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-white/70">
        <a href="#about" className="hover:text-amber-400 transition-colors">Về Tôi</a>
        <a href="#services" className="hover:text-amber-400 transition-colors">Dịch Vụ</a>
        <a href="#calculator" className="hover:text-amber-400 transition-colors">Tra Cứu</a>
        <a href="#contact" className="px-5 py-2 border border-amber-500/50 rounded-full hover:bg-amber-500 hover:text-black transition-all">Đặt Lịch</a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    {/* Atmospheric Background */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1 rounded-full border border-amber-500/30 text-amber-400 text-xs uppercase tracking-[0.3em] mb-6">
          Chuyên Gia Thần Số Học & Tâm Lý Học
        </span>
        <h1 className="text-6xl md:text-8xl font-serif italic text-white leading-tight mb-8">
          Khám Phá <span className="text-amber-500">Mật Mã</span> <br /> Vận Mệnh Của Bạn
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Mỗi con số mang một tần số rung động riêng. Hãy để tôi giúp bạn thấu hiểu bản thân, 
          vượt qua thử thách và đón nhận những cơ hội tuyệt vời nhất trong cuộc đời.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#calculator" className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all flex items-center justify-center gap-2 group">
            Tra Cứu Miễn Phí <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#services" className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all">
            Xem Các Dịch Vụ
          </a>
        </div>
      </motion.div>
    </div>

    {/* Floating Numbers Decoration */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <motion.span
          key={n}
          className="absolute text-8xl font-serif text-white"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: [null, "-20px", "20px", "0px"],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {n}
        </motion.span>
      ))}
    </div>
  </section>
);

const CalculatorSection = () => {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateLifePath(dob);
    setResult(res);
  };

  return (
    <section id="calculator" className="py-24 bg-zinc-950 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Calculator className="w-32 h-32 text-amber-500" />
          </div>
          
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-4">Tính Con Số Đường Đời</h2>
            <p className="text-white/50">Nhập ngày sinh của bạn để khám phá năng lượng chủ đạo dẫn dắt cuộc đời bạn.</p>
          </div>

          <form onSubmit={handleCalculate} className="max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40 ml-4">Ngày sinh của bạn</label>
              <input 
                type="date" 
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-amber-500 transition-all">
              Bắt Đầu Giải Mã
            </button>
          </form>

          <AnimatePresence>
            {result !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-12 p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl text-center"
              >
                <div className="text-6xl font-serif text-amber-500 mb-4">{result}</div>
                <h3 className="text-xl text-white font-medium mb-2">Con số Đường đời của bạn</h3>
                <p className="text-white/70 leading-relaxed italic">
                  "{getLifePathMeaning(result)}"
                </p>
                <div className="mt-6">
                  <button className="text-amber-400 text-sm font-medium flex items-center gap-2 mx-auto hover:underline">
                    Xem phân tích chuyên sâu <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => (
  <section id="services" className="py-24 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="text-amber-500 text-xs uppercase tracking-widest font-bold">Dịch Vụ Tư Vấn</span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-white mt-4">Khai Phá Tiềm Năng <br /> Qua Những Bản Đồ Số</h2>
        </div>
        <p className="text-white/50 max-w-sm">
          Các gói tư vấn được thiết kế riêng biệt để giải quyết từng khía cạnh trong cuộc sống của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service) => (
          <motion.div 
            key={service.id}
            whileHover={{ y: -10 }}
            className="group p-8 bg-zinc-900/30 border border-white/5 rounded-3xl hover:border-amber-500/30 transition-all flex flex-col h-full"
          >
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all">
              {service.icon}
            </div>
            <h3 className="text-xl text-white font-medium mb-4">{service.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">
              {service.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-amber-500 font-bold">{service.price}</span>
              <button className="p-2 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-24 bg-zinc-950 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10">
            <img 
              src="https://picsum.photos/seed/expert/800/1000" 
              alt="Numerology Expert" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-amber-500 p-8 rounded-3xl shadow-2xl hidden md:block">
            <div className="text-4xl font-serif text-black font-bold">10+</div>
            <div className="text-xs uppercase tracking-widest text-black/70 font-bold">Năm Kinh Nghiệm</div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            <span className="text-amber-500 text-xs uppercase tracking-widest font-bold">Về Chuyên Gia</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mt-4">Sứ Mệnh Thắp Sáng <br /> Những Tâm Hồn</h2>
          </div>
          <p className="text-white/60 leading-relaxed text-lg">
            Tôi tin rằng mỗi người sinh ra đều có một bản thiết kế riêng. Thần Số Học không phải là bói toán, 
            mà là một bộ môn khoa học về năng lượng giúp chúng ta hiểu rõ "tấm bản đồ" mà mình đang nắm giữ.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 p-1 bg-amber-500/20 rounded-full text-amber-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-medium">Thấu hiểu sâu sắc</h4>
                <p className="text-white/40 text-sm">Phân tích dựa trên sự kết hợp giữa Thần số học Pitago và Tâm lý học hành vi.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 p-1 bg-amber-500/20 rounded-full text-amber-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-medium">Giải pháp thực tiễn</h4>
                <p className="text-white/40 text-sm">Không chỉ đưa ra con số, tôi cung cấp lộ trình hành động cụ thể cho bạn.</p>
              </div>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-amber-500 transition-all">
            Tìm Hiểu Thêm
          </button>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-24 bg-black">
    <div className="max-w-7xl mx-auto px-6 text-center mb-16">
      <h2 className="text-4xl font-serif italic text-white">Những Câu Chuyện Thay Đổi</h2>
    </div>
    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {TESTIMONIALS.map((t) => (
        <div key={t.id} className="p-10 bg-zinc-900/20 border border-white/5 rounded-[32px] relative">
          <MessageSquare className="absolute top-8 right-8 text-white/5 w-12 h-12" />
          <p className="text-white/70 italic mb-8 leading-relaxed">"{t.content}"</p>
          <div className="flex items-center gap-4">
            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-amber-500/30" referrerPolicy="no-referrer" />
            <div className="text-left">
              <div className="text-white font-medium">{t.name}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="bg-zinc-950 pt-24 pb-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-5xl font-serif italic text-white mb-8">Bắt Đầu Hành Trình <br /> Của Bạn Ngay Hôm Nay</h2>
          <p className="text-white/50 mb-12 max-w-md">
            Đừng để những cơ hội trôi qua một cách vô nghĩa. Hãy kết nối với tôi để nhận được sự tư vấn tận tâm nhất.
          </p>
          <div className="space-y-6">
            <a href="mailto:contact@thansohoc.vn" className="flex items-center gap-4 text-white/70 hover:text-amber-500 transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span>contact@thansohoc.vn</span>
            </a>
            <a href="tel:+84901234567" className="flex items-center gap-4 text-white/70 hover:text-amber-500 transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span>+84 90 123 4567</span>
            </a>
          </div>
        </div>
        
        <div className="bg-zinc-900/40 p-10 rounded-[40px] border border-white/5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" placeholder="Họ và tên" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50" />
              <input type="email" placeholder="Email" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50" />
            </div>
            <select className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white/50 focus:outline-none focus:border-amber-500/50 appearance-none">
              <option>Chọn dịch vụ quan tâm</option>
              <option>Giải mã bản đồ vận mệnh</option>
              <option>Định hướng sự nghiệp</option>
              <option>Kết nối tình duyên</option>
            </select>
            <textarea placeholder="Lời nhắn của bạn" rows={4} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50"></textarea>
            <button className="w-full py-4 bg-amber-500 text-black font-bold rounded-2xl hover:bg-amber-400 transition-all">
              Gửi Yêu Cầu Tư Vấn
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <Moon className="text-black w-4 h-4 fill-current" />
          </div>
          <span className="text-lg font-serif italic text-white">Thần Số Học</span>
        </div>
        <div className="text-white/30 text-sm">
          © 2026 Thần Số Học Expert. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="text-white/40 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <CalculatorSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
