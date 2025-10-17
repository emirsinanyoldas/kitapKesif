import { Bot, X } from 'lucide-react';
import { useState, useMemo, memo } from 'react';
import { getRandomGreeting } from '../utils/aiGreetings';

export const AIAssistant = memo(function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Generate a random greeting once when component mounts
  // useMemo ensures it doesn't change on every render
  const greeting = useMemo(() => getRandomGreeting(), []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}
        className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div 
          style={{ position: 'fixed', bottom: '6rem', right: '2rem', zIndex: 9999 }}
          className="w-96 h-[500px] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-blue-200/50 dark:border-blue-800/50 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Kitap Asistanı
            </h3>
            <p className="text-blue-100 text-sm">Size nasıl yardımcı olabilirim?</p>
          </div>

          <div className="p-4 h-[350px] overflow-y-auto">
            <div className="flex flex-col gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-2xl rounded-tl-none animate-fadeIn">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {greeting}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-blue-900/50">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Bir şey sorun..."
                className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-blue-800 text-gray-800 dark:text-gray-200 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
              />
              <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
