import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "menu" | "playing" | "showingExplanation" | "completed";

interface GameState {
  phase: GamePhase;
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  answeredQuestions: number[];
  
  // Actions
  start: () => void;
  restart: () => void;
  selectAnswer: (answerIndex: number, isCorrect: boolean) => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set) => ({
    phase: "menu",
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isCorrect: null,
    answeredQuestions: [],
    
    start: () => {
      set(() => ({
        phase: "playing",
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswer: null,
        isCorrect: null,
        answeredQuestions: []
      }));
    },
    
    restart: () => {
      set(() => ({
        phase: "menu",
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswer: null,
        isCorrect: null,
        answeredQuestions: []
      }));
    },
    
    selectAnswer: (answerIndex: number, isCorrect: boolean) => {
      set((state) => ({
        selectedAnswer: answerIndex,
        isCorrect: isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
        phase: "showingExplanation",
        answeredQuestions: [...state.answeredQuestions, state.currentQuestionIndex]
      }));
    },
    
    nextQuestion: () => {
      set((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
        isCorrect: null,
        phase: "playing"
      }));
    },
    
    completeQuiz: () => {
      set(() => ({
        phase: "completed"
      }));
    }
  }))
);
