import { BookOpen, Mail, Info, Shield, Users, Heart } from 'lucide-react';
import { memo, useState } from 'react';
import { InfoModal } from './InfoModal';
import { HowItWorks } from './footer-modals/HowItWorks';
import { FAQ } from './footer-modals/FAQ';
import { WriteReview } from './footer-modals/WriteReview';
import { ContactUs } from './footer-modals/ContactUs';

export const Footer = memo(function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="mt-20 bg-gradient-to-b from-orange-50 to-amber-100 dark:from-slate-900 dark:to-blue-950 border-t border-orange-300/40 dark:border-blue-900/40">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">KitapKeşif</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Kitapseverlerin buluşma noktası. Kitap keşfet, yorumları oku, deneyimlerini paylaş.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              Hakkımızda
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => openModal('how-it-works')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Nasıl Çalışır?
                </button>
              </li>
              <li>
                <button onClick={() => openModal('faq')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Sıkça Sorulan Sorular
                </button>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Ekibimiz
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              Topluluk
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Kitap Öner
                </a>
              </li>
              <li>
                <button onClick={() => openModal('write-review')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Yorum Yaz
                </button>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Kitap Kulüpleri
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              İletişim
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => openModal('contact')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Bize Ulaşın
                </button>
              </li>
              <li>
                <button onClick={() => openModal('contact')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Destek
                </button>
              </li>
              <li>
                <button onClick={() => openModal('contact')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                  Geri Bildirim
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-orange-200/30 dark:border-orange-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
              2025 KitapKeşif. Kitap sevgisiyle yapıldı.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Gizlilik Politikası
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
                Kullanım Koşulları
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    {/* Modals */}
    <InfoModal isOpen={activeModal === 'how-it-works'} onClose={closeModal} title="Nasıl Çalışır?">
      <HowItWorks />
    </InfoModal>

    <InfoModal isOpen={activeModal === 'faq'} onClose={closeModal} title="Sıkça Sorulan Sorular">
      <FAQ />
    </InfoModal>

    <InfoModal isOpen={activeModal === 'write-review'} onClose={closeModal} title="Yorum Yaz">
      <WriteReview />
    </InfoModal>

    <InfoModal isOpen={activeModal === 'contact'} onClose={closeModal} title="Bize Ulaşın">
      <ContactUs />
    </InfoModal>
    </>
  );
});
