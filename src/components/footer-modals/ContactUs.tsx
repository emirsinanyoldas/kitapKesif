import { Mail, MessageSquare, Send, User, Phone } from 'lucide-react';
import { useState } from 'react';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Mesajınız Alındı!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          En kısa sürede size geri dönüş yapacağız. Teşekkür ederiz!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz.
          Ekibimiz size en kısa sürede yanıt verecektir.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-orange-50 dark:bg-slate-700 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h4 className="font-bold text-gray-900 dark:text-gray-100">E-posta</h4>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            info@kitapkesif.com
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-slate-700 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h4 className="font-bold text-gray-900 dark:text-gray-100">Destek</h4>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            7/24 Online Destek
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Adınız Soyadınız <span className="text-orange-600">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Örn: Ahmet Yılmaz"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              E-posta <span className="text-orange-600">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="ornek@email.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Telefon (Opsiyonel)
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="0555 123 45 67"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Konu <span className="text-orange-600">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Konu seçiniz...</option>
            <option value="question">Genel Soru</option>
            <option value="suggestion">Öneri</option>
            <option value="feedback">Geri Bildirim</option>
            <option value="problem">Teknik Sorun</option>
            <option value="book">Kitap Talebi</option>
            <option value="other">Diğer</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Mesajınız <span className="text-orange-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Mesajınızı buraya yazın..."
            required
            minLength={10}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            En az 10 karakter ({formData.message.length}/10)
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.subject || formData.message.length < 10}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-blue-600 dark:to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Mesaj Gönder
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-2">
          📞 Hızlı İletişim
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Acil durumlar için: info@kitapkesif.com adresine e-posta gönderebilir veya
          7/24 çalışan online destek hattımızdan yardım alabilirsiniz.
        </p>
      </div>
    </div>
  );
}
