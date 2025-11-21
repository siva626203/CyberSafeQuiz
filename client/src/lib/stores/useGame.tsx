import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Difficulty, Category } from "@/data/quizData";

export type GamePhase = "menu" | "playing" | "showingExplanation" | "completed" | "leaderboard";
export type GameMode = "normal" | "timed";
export type PowerUpType = "fiftyFifty" | "timeFreeze" | "hint";

export interface PowerUp {
  type: PowerUpType;
  used: boolean;
}

interface GameState {
  // Game configuration
  phase: GamePhase;
  difficulty: Difficulty;
  category: Category | "All Categories";
  gameMode: GameMode;
  
  // Quiz state
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  answeredQuestions: number[];
  
  // Timer state
  timeRemaining: number | null; // in seconds, null for untimed
  timerStartTime: number | null;
  isPaused: boolean;
  
  // Power-ups
  powerUps: PowerUp[];
  eliminatedOptions: number[]; // for 50/50 power-up
  hintUsed: boolean;
  
  // Session
  sessionId: string | null;
  playerName: string | null;
  startTime: number | null;
  
  // Actions
  setDifficulty: (difficulty: Difficulty) => void;
  setCategory: (category: Category | "All Categories") => void;
  setGameMode: (mode: GameMode) => void;
  setPlayerName: (name: string) => void;
  start: () => void;
  restart: () => void;
  selectAnswer: (answerIndex: number, isCorrect: boolean) => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  showLeaderboard: () => void;
  backToMenu: () => void;
  
  // Timer actions
  updateTimeRemaining: (seconds: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  
  // Power-up actions
  usePowerUp: (type: PowerUpType) => void;
  setEliminatedOptions: (options: number[]) => void;
  setHintUsed: (used: boolean) => void;
  resetPowerUps: () => void;
}

function generateSessionId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    phase: "menu",
    difficulty: "beginner",
    category: "All Categories",
    gameMode: "normal",
    
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isCorrect: null,
    answeredQuestions: [],
    
    timeRemaining: null,
    timerStartTime: null,
    isPaused: false,
    
    powerUps: [
      { type: "fiftyFifty", used: false },
      { type: "timeFreeze", used: false },
      { type: "hint", used: false }
    ],
    eliminatedOptions: [],
    hintUsed: false,
    
    sessionId: null,
    playerName: null,
    startTime: null,
    
    // Configuration actions
    setDifficulty: (difficulty) => set({ difficulty }),
    setCategory: (category) => set({ category }),
    setGameMode: (mode) => set({ gameMode: mode }),
    setPlayerName: (name) => set({ playerName: name }),
    
    // Game flow actions
    start: () => {
      const state = get();
      const sessionId = generateSessionId();
      const startTime = Date.now();
      
      set({
        phase: "playing",
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswer: null,
        isCorrect: null,
        answeredQuestions: [],
        sessionId,
        startTime,
        timeRemaining: state.gameMode === "timed" ? 60 : null,
        timerStartTime: state.gameMode === "timed" ? Date.now() : null,
        isPaused: false,
        eliminatedOptions: [],
        hintUsed: false,
        powerUps: [
          { type: "fiftyFifty", used: false },
          { type: "timeFreeze", used: false },
          { type: "hint", used: false }
        ]
      });
    },
    
    restart: () => {
      set({
        phase: "menu",
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswer: null,
        isCorrect: null,
        answeredQuestions: [],
        sessionId: null,
        playerName: null,
        startTime: null,
        timeRemaining: null,
        timerStartTime: null,
        isPaused: false,
        eliminatedOptions: [],
        hintUsed: false,
        powerUps: [
          { type: "fiftyFifty", used: false },
          { type: "timeFreeze", used: false },
          { type: "hint", used: false }
        ]
      });
    },
    
    selectAnswer: (answerIndex: number, isCorrect: boolean) => {
      set((state) => ({
        selectedAnswer: answerIndex,
        isCorrect: isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
        phase: "showingExplanation",
        answeredQuestions: [...state.answeredQuestions, state.currentQuestionIndex],
        eliminatedOptions: [], // reset for next question
        hintUsed: false // reset for next question
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
      set({ phase: "completed" });
    },
    
    showLeaderboard: () => {
      set({ phase: "leaderboard" });
    },
    
    backToMenu: () => {
      set({
        phase: "menu",
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswer: null,
        isCorrect: null,
        answeredQuestions: [],
        eliminatedOptions: [],
        hintUsed: false
      });
    },
    
    // Timer actions
    updateTimeRemaining: (seconds: number) => {
      set({ timeRemaining: seconds });
      
      if (seconds <= 0) {
        const state = get();
        if (state.phase === "playing") {
          state.completeQuiz();
        }
      }
    },
    
    pauseTimer: () => {
      set({ isPaused: true });
    },
    
    resumeTimer: () => {
      set({ isPaused: false, timerStartTime: Date.now() });
    },
    
    // Power-up actions
    usePowerUp: (type: PowerUpType) => {
      set((state) => ({
        powerUps: state.powerUps.map(p => 
          p.type === type ? { ...p, used: true } : p
        )
      }));
    },
    
    setEliminatedOptions: (options: number[]) => {
      set({ eliminatedOptions: options });
    },
    
    setHintUsed: (used: boolean) => {
      set({ hintUsed: used });
    },
    
    resetPowerUps: () => {
      set({
        powerUps: [
          { type: "fiftyFifty", used: false },
          { type: "timeFreeze", used: false },
          { type: "hint", used: false }
        ],
        eliminatedOptions: [],
        hintUsed: false
      });
    }
  }))
);
