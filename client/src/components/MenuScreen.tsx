import { useGame } from '@/lib/stores/useGame';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

export function MenuScreen() {
  const { start } = useGame();

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="bg-gradient-to-br from-cyan-900/90 to-blue-900/90 backdrop-blur-sm border-2 border-cyan-400 rounded-lg p-8 max-w-2xl w-full mx-4 pointer-events-auto shadow-2xl shadow-cyan-500/50">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-16 h-16 text-cyan-400 mr-4" />
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
            Cyber Safety Quiz
          </h1>
        </div>
        
        <div className="mb-8 text-center">
          <p className="text-xl text-cyan-100 mb-4">
            Test your knowledge of cybersecurity best practices!
          </p>
          <p className="text-lg text-cyan-200">
            Learn how to protect yourself online through 10 interactive questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-cyan-950/50 border border-cyan-500/30 rounded-lg p-4 text-center">
            <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-cyan-300 font-semibold mb-1">Passwords</h3>
            <p className="text-cyan-100 text-sm">Learn about strong passwords</p>
          </div>
          
          <div className="bg-cyan-950/50 border border-cyan-500/30 rounded-lg p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-cyan-300 font-semibold mb-1">Phishing</h3>
            <p className="text-cyan-100 text-sm">Spot malicious emails</p>
          </div>
          
          <div className="bg-cyan-950/50 border border-cyan-500/30 rounded-lg p-4 text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-cyan-300 font-semibold mb-1">Safe Browsing</h3>
            <p className="text-cyan-100 text-sm">Browse the web safely</p>
          </div>
        </div>

        <button
          onClick={start}
          className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-white font-bold text-xl py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
