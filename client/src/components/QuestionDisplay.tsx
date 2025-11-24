import { useGame } from '@/lib/stores/useGame';
import { useAudio } from '@/lib/stores/useAudio';
import { quizQuestions } from '@/data/quizData';
import { CheckCircle2, XCircle, ChevronRight, ShieldCheck, Mail } from 'lucide-react';
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

  const renderVisualContent = () => {
    if (currentQuestion.type === 'image-identification') {
        // Fallback or actual image logic
        if (currentQuestion.imageUrl?.includes('shield')) {
            return (
                <div className="flex justify-center mb-6">
                    <div className="bg-cyan-950/50 p-6 rounded-xl border border-cyan-500/30">
                        <ShieldCheck className="w-24 h-24 text-cyan-400" />
                    </div>
                </div>
            );
        } else if (currentQuestion.imageUrl?.includes('phishing')) {
             return (
                <div className="flex justify-center mb-6">
                    <div className="bg-cyan-950/50 p-6 rounded-xl border border-cyan-500/30">
                        <Mail className="w-24 h-24 text-yellow-400" />
                    </div>
                </div>
            );
        } else if (currentQuestion.imageUrl) {
          return (
             <div className="flex justify-center mb-6">
                <img
                  src={currentQuestion.imageUrl}
                  alt="Question Visual"
                  className="max-w-full h-auto max-h-48 rounded-lg border border-cyan-500/30"
                  onError={(e) => {
                    // Fallback if image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
             </div>
          );
        }
    }
    return null;
  };

  const renderScenarioText = () => {
      if (currentQuestion.type === 'scenario' && currentQuestion.scenarioText) {
          return (
            <div className="mb-6 bg-slate-800/50 p-4 rounded-lg border-l-4 border-cyan-500 italic text-cyan-50">
                "{currentQuestion.scenarioText}"
            </div>
          )
      }
      return null;
  }

  // Define grid class based on question type
  const optionsGridClass = currentQuestion.type === 'true-false'
    ? 'grid grid-cols-2 gap-4'
    : 'space-y-2 sm:space-y-3';

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none p-4 overflow-y-auto">
      <div className="w-full max-w-3xl pointer-events-auto my-auto">
        <div className="bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-md border-2 border-cyan-400 rounded-lg p-4 sm:p-6 md:p-8 shadow-2xl shadow-cyan-500/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="text-cyan-300 font-semibold text-sm sm:text-base">
              Question {currentQuestionIndex + 1} / {totalQuestions}
            </div>
            <div className="bg-cyan-950/50 border border-cyan-500/30 px-3 sm:px-4 py-2 rounded-lg">
              <span className="text-cyan-100 text-sm">Score: </span>
              <span className="text-green-400 font-bold text-lg sm:text-xl">{score}</span>
            </div>
          </div>

          <div className="mb-4">
             <div className="flex gap-2">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-1 inline-block mb-3">
                    <span className="text-cyan-300 text-xs sm:text-sm font-medium">{currentQuestion.category}</span>
                </div>
                 <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-1 inline-block mb-3">
                    <span className="text-purple-300 text-xs sm:text-sm font-medium uppercase">{currentQuestion.type.replace('-', ' ')}</span>
                </div>
             </div>
          </div>

          {renderVisualContent()}

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-100 mb-6">
            {currentQuestion.question}
          </h2>

          {renderScenarioText()}

          <div className={`${optionsGridClass} mb-6`}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              const showCorrect = isShowingExplanation && isCorrectAnswer;
              const showIncorrect = isShowingExplanation && isSelected && !isCorrect;

              // For True/False, we might want to color them specifically (e.g., Green for True, Red for False initially, but keeping it consistent is safer)

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isShowingExplanation}
                  className={`
                    w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base
                    ${!isShowingExplanation ? 'hover:border-cyan-400 hover:bg-cyan-500/20 cursor-pointer' : 'cursor-not-allowed'}
                    ${showCorrect ? 'border-green-500 bg-green-500/20' : ''}
                    ${showIncorrect ? 'border-red-500 bg-red-500/20' : ''}
                    ${!isShowingExplanation ? 'border-cyan-600 bg-cyan-950/30' : ''}
                    ${isShowingExplanation && !showCorrect && !showIncorrect ? 'border-slate-600 bg-slate-900/30 opacity-50' : ''}
                    ${currentQuestion.type === 'true-false' ? 'text-center h-20 text-xl font-bold flex justify-center items-center' : ''}
                  `}
                  whileHover={!isShowingExplanation ? { scale: 1.02 } : {}}
                  whileTap={!isShowingExplanation ? { scale: 0.98 } : {}}
                >
                  <div className={`flex items-center gap-2 ${currentQuestion.type === 'true-false' ? 'justify-center w-full' : 'justify-between'}`}>
                    <span className="text-cyan-100 font-medium">{option}</span>
                    {(showCorrect || showIncorrect) && currentQuestion.type !== 'true-false' && (
                        <>
                        {showCorrect && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />}
                        {showIncorrect && <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />}
                        </>
                    )}
                     {currentQuestion.type === 'true-false' && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                            {showIncorrect && <XCircle className="w-6 h-6 text-red-400" />}
                        </div>
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
                className={`mb-6 p-3 sm:p-4 rounded-lg border-2 text-sm sm:text-base ${
                  isCorrect 
                    ? 'bg-green-500/10 border-green-500/50' 
                    : 'bg-red-500/10 border-red-500/50'
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <h3 className={`font-bold text-base sm:text-lg mb-2 ${
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
              className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-white font-bold text-base sm:text-lg py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50"
            >
              {currentQuestionIndex < totalQuestions - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              ) : (
                <>
                  See Results
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
