import { useGame } from '@/lib/stores/useGame';
import { useAudio } from '@/lib/stores/useAudio';
import { quizQuestions } from '@/data/quizData';
import { CheckCircle2, XCircle, ChevronRight, ShieldCheck, Mail, Lock, Code, Terminal } from 'lucide-react';
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

  // --- LEVEL CALCULATION LOGIC ---
  // Simple logic: Break questions into chunks of ~4
  // Level 1: Q1-4 (Novice)
  // Level 2: Q5-8 (Apprentice)
  // Level 3: Q9-12 (Specialist)
  // Level 4: Q13+ (Master)
  const getLevelInfo = (index: number) => {
      const levelSize = 4;
      const level = Math.floor(index / levelSize) + 1;
      let title = "Novice";
      if (level === 2) title = "Apprentice";
      if (level === 3) title = "Specialist";
      if (level >= 4) title = "Master";
      return { level, title };
  };

  const { level, title: levelTitle } = getLevelInfo(currentQuestionIndex);

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

  // --- RENDERERS FOR DIFFERENT GAME TYPES ---

  const renderVisualContent = () => {
    if (currentQuestion.type === 'image-identification') {
        if (currentQuestion.imageUrl?.includes('shield')) {
            return (
                <div className="flex justify-center mb-6">
                    <div className="bg-cyan-950/50 p-6 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <ShieldCheck className="w-24 h-24 text-cyan-400" />
                    </div>
                </div>
            );
        } else if (currentQuestion.imageUrl?.includes('phishing')) {
             return (
                <div className="flex justify-center mb-6">
                    <div className="bg-cyan-950/50 p-6 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
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
                    e.currentTarget.style.display = 'none';
                  }}
                />
             </div>
          );
        }
    }
    return null;
  };

  const renderPuzzleContent = () => {
      if (currentQuestion.type === 'puzzle' && currentQuestion.puzzleData) {
          return (
            <div className="flex flex-col items-center mb-6 w-full">
                <div className="w-full bg-black/40 p-6 rounded-lg border-2 border-green-500/50 font-mono text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
                    <Terminal className="w-6 h-6 text-green-500 absolute top-2 left-2 opacity-50" />
                    <span className="text-2xl sm:text-4xl font-bold tracking-[0.2em] text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)] z-10 relative">
                        {currentQuestion.puzzleData}
                    </span>
                    <div className="text-green-500/60 text-xs mt-2 uppercase tracking-widest">
                        // Decryption Required
                    </div>
                </div>
            </div>
          );
      }
      return null;
  };

  const renderScenarioText = () => {
      if (currentQuestion.type === 'scenario' && currentQuestion.scenarioText) {
          return (
            <div className="mb-6 bg-slate-800/80 p-5 rounded-lg border-l-4 border-cyan-500 italic text-cyan-50 shadow-lg">
                <div className="flex gap-2 mb-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    <span>Scenario Context</span>
                </div>
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

        {/* LEVEL HEADER */}
        <div className="flex justify-between items-end mb-2 px-1">
            <div className="flex flex-col">
                 <span className="text-cyan-500 text-xs font-bold tracking-widest uppercase mb-1">Current Level</span>
                 <div className="flex items-baseline gap-2">
                     <span className="text-white text-3xl font-black italic">
                         LVL {level}
                     </span>
                     <span className="text-cyan-400 text-lg font-medium">
                         // {levelTitle}
                     </span>
                 </div>
            </div>
            <div className="text-cyan-300 font-mono text-sm">
              Q{currentQuestionIndex + 1} of {totalQuestions}
            </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-md border-2 border-cyan-400 rounded-lg p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(8,145,178,0.3)] relative overflow-hidden">

          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             {currentQuestion.type === 'puzzle' ? <Code className="w-32 h-32 text-green-400" /> : <Lock className="w-32 h-32 text-cyan-400" />}
          </div>

          <div className="flex justify-between items-center gap-4 mb-6 relative z-10">
            <div className="flex gap-2">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-1">
                    <span className="text-cyan-300 text-xs sm:text-sm font-medium">{currentQuestion.category}</span>
                </div>
                 <div className={`border rounded-lg px-3 py-1
                    ${currentQuestion.type === 'puzzle' ? 'bg-green-500/10 border-green-500/30' : 'bg-purple-500/10 border-purple-500/30'}`}>
                    <span className={`text-xs sm:text-sm font-medium uppercase
                        ${currentQuestion.type === 'puzzle' ? 'text-green-300' : 'text-purple-300'}`}>
                        {currentQuestion.type.replace('-', ' ')}
                    </span>
                </div>
             </div>

             <div className="bg-cyan-950/80 border border-cyan-500/50 px-4 py-1 rounded-full shadow-inner shadow-black/50">
              <span className="text-cyan-400 text-xs uppercase tracking-wider mr-2">Score</span>
              <span className="text-white font-bold text-lg">{score}</span>
            </div>
          </div>

          {renderVisualContent()}
          {renderPuzzleContent()}

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 leading-tight drop-shadow-sm relative z-10">
            {currentQuestion.question}
          </h2>

          {renderScenarioText()}

          <div className={`${optionsGridClass} mb-6 relative z-10`}>
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
                    w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base relative overflow-hidden
                    ${!isShowingExplanation ? 'hover:border-cyan-400 hover:bg-cyan-500/20 cursor-pointer hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'cursor-not-allowed'}
                    ${showCorrect ? 'border-green-500 bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}
                    ${showIncorrect ? 'border-red-500 bg-red-500/20' : ''}
                    ${!isShowingExplanation ? 'border-cyan-600/50 bg-slate-900/60' : ''}
                    ${isShowingExplanation && !showCorrect && !showIncorrect ? 'border-slate-700 bg-slate-900/30 opacity-40' : ''}
                    ${currentQuestion.type === 'true-false' ? 'text-center h-20 text-xl font-bold flex justify-center items-center' : ''}
                    ${currentQuestion.type === 'puzzle' && !isShowingExplanation ? 'font-mono' : ''}
                  `}
                  whileHover={!isShowingExplanation ? { scale: 1.01, x: 4 } : {}}
                  whileTap={!isShowingExplanation ? { scale: 0.99 } : {}}
                >
                  <div className={`flex items-center gap-2 ${currentQuestion.type === 'true-false' ? 'justify-center w-full' : 'justify-between'}`}>
                    <span className={`font-medium ${showCorrect ? 'text-white' : 'text-cyan-50'}`}>{option}</span>
                    {(showCorrect || showIncorrect) && currentQuestion.type !== 'true-false' && (
                        <div className="flex-shrink-0">
                        {showCorrect && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />}
                        {showIncorrect && <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />}
                        </div>
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-6 p-4 rounded-lg border-l-4 overflow-hidden ${
                  isCorrect 
                    ? 'bg-green-900/20 border-green-500'
                    : 'bg-red-900/20 border-red-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0">
                    <h3 className={`font-bold text-lg mb-1 ${
                      isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isCorrect ? 'Correct Analysis' : 'Incorrect Analysis'}
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isShowingExplanation && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/50 uppercase tracking-widest"
            >
              {currentQuestionIndex < totalQuestions - 1 ? (
                <>
                  Next Challenge
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  View Final Results
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          )}

          {/* Progress Bar with "Steps" look */}
           <div className="mt-8 relative">
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1 uppercase tracking-widest">
                    <span>Initiation</span>
                    <span>Completion</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{
                        width: `${((currentQuestionIndex + (isShowingExplanation ? 1 : 0)) / totalQuestions) * 100}%`
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
           </div>

        </div>
      </div>
    </div>
  );
}
