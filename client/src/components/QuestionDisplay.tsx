import { useGame } from '@/lib/stores/useGame';
import { useAudio } from '@/lib/stores/useAudio';
import { quizQuestions } from '@/data/quizData';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function QuestionDisplay() {
  const { 
    currentQuestionIndex, 
    score, 
    phase, 
    selectedAnswer, 
    isCorrect,
    selectAnswer, 
    nextQuestion,
    completeQuiz 
  } = useGame();
  
  const { playSuccess, playHit } = useAudio();
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const isShowingExplanation = phase === 'showingExplanation';

  if (!currentQuestion) {
    return null;
  }

  const handleAnswerClick = (answerIndex: number) => {
    if (isShowingExplanation) return;
    
    const correct = answerIndex === currentQuestion.correctAnswer;
    selectAnswer(answerIndex, correct);
    
    if (correct) {
      playSuccess();
    } else {
      playHit();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      nextQuestion();
    } else {
      completeQuiz();
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none p-4">
      <div className="w-full max-w-3xl pointer-events-auto">
        <div className="bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-md border-2 border-cyan-400 rounded-lg p-6 md:p-8 shadow-2xl shadow-cyan-500/50">
          <div className="flex justify-between items-center mb-6">
            <div className="text-cyan-300 font-semibold">
              Question {currentQuestionIndex + 1} / {totalQuestions}
            </div>
            <div className="bg-cyan-950/50 border border-cyan-500/30 px-4 py-2 rounded-lg">
              <span className="text-cyan-100">Score: </span>
              <span className="text-green-400 font-bold text-xl">{score}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-1 inline-block mb-3">
              <span className="text-cyan-300 text-sm font-medium">{currentQuestion.category}</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              const showCorrect = isShowingExplanation && isCorrectAnswer;
              const showIncorrect = isShowingExplanation && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isShowingExplanation}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                    ${!isShowingExplanation ? 'hover:border-cyan-400 hover:bg-cyan-500/20 cursor-pointer' : 'cursor-not-allowed'}
                    ${showCorrect ? 'border-green-500 bg-green-500/20' : ''}
                    ${showIncorrect ? 'border-red-500 bg-red-500/20' : ''}
                    ${!isShowingExplanation ? 'border-cyan-600 bg-cyan-950/30' : ''}
                    ${isShowingExplanation && !showCorrect && !showIncorrect ? 'border-slate-600 bg-slate-900/30 opacity-50' : ''}
                  `}
                  whileHover={!isShowingExplanation ? { scale: 1.02 } : {}}
                  whileTap={!isShowingExplanation ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-100 font-medium">{option}</span>
                    {showCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 ml-2" />
                    )}
                    {showIncorrect && (
                      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {isShowingExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-6 p-4 rounded-lg border-2 ${
                  isCorrect 
                    ? 'bg-green-500/10 border-green-500/50' 
                    : 'bg-red-500/10 border-red-500/50'
                }`}
              >
                <div className="flex items-start mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${
                      isCorrect ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h3>
                    <p className="text-cyan-100 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isShowingExplanation && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-white font-bold text-lg py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg shadow-cyan-500/50"
            >
              {currentQuestionIndex < totalQuestions - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  See Results
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </motion.button>
          )}

          <div className="mt-4 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentQuestionIndex + (isShowingExplanation ? 1 : 0)) / totalQuestions) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
