import { useGame } from '@/lib/stores/useGame';
import { quizQuestions } from '@/data/quizData';
import { Trophy, RotateCcw, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function CompletionScreen() {
  const { score, restart } = useGame();
  const totalQuestions = quizQuestions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage === 100) {
      return {
        title: "Perfect Score!",
        message: "Outstanding! You're a cybersecurity expert!",
        color: "from-yellow-400 to-orange-400",
        stars: 3
      };
    } else if (percentage >= 80) {
      return {
        title: "Excellent Work!",
        message: "Great job! You have strong cybersecurity knowledge.",
        color: "from-green-400 to-cyan-400",
        stars: 3
      };
    } else if (percentage >= 60) {
      return {
        title: "Good Effort!",
        message: "Well done! Keep learning to improve your cyber safety.",
        color: "from-cyan-400 to-blue-400",
        stars: 2
      };
    } else {
      return {
        title: "Keep Learning!",
        message: "Practice makes perfect. Try again to improve your score!",
        color: "from-blue-400 to-purple-400",
        stars: 1
      };
    }
  };

  const performance = getPerformanceMessage();

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl pointer-events-auto"
      >
        <div className="bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-md border-2 border-cyan-400 rounded-lg p-8 shadow-2xl shadow-cyan-500/50">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${performance.color}`}
            >
              {performance.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-cyan-100"
            >
              {performance.message}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-cyan-950/50 border-2 border-cyan-500/30 rounded-lg p-6 mb-6"
          >
            <div className="text-center mb-4">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-2">
                {score} / {totalQuestions}
              </div>
              <div className="text-2xl text-cyan-300 font-semibold mb-3">
                {percentage}% Correct
              </div>

              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: index < performance.stars ? 1 : 0.3,
                      scale: index < performance.stars ? 1 : 0.8
                    }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        index < performance.stars 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-slate-600'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="text-3xl font-bold text-green-400">{score}</div>
                <div className="text-sm text-cyan-300">Correct</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <div className="text-3xl font-bold text-red-400">{totalQuestions - score}</div>
                <div className="text-sm text-cyan-300">Incorrect</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <button
              onClick={restart}
              className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-white font-bold text-xl py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-lg shadow-cyan-500/50"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Try Again
            </button>

            <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-cyan-100 text-sm text-center">
                Remember: Cybersecurity is everyone's responsibility. 
                Stay safe online by following best practices!
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
