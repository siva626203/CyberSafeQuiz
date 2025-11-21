import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Leaderboard scores
export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  timeTaken: integer("time_taken"), // in seconds, null for untimed
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLeaderboardSchema = createInsertSchema(leaderboard).omit({
  id: true,
  createdAt: true,
});

export type Leaderboard = typeof leaderboard.$inferSelect;
export type InsertLeaderboard = z.infer<typeof insertLeaderboardSchema>;

// User progress tracking
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  currentQuestionIndex: integer("current_question_index").notNull().default(0),
  score: integer("score").notNull().default(0),
  answeredQuestions: text("answered_questions").notNull().default("[]"), // JSON array of question IDs
  powerUpsUsed: text("power_ups_used").notNull().default("[]"), // JSON array of power-up types used
  timeRemaining: integer("time_remaining"), // in seconds, null for untimed
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  updatedAt: true,
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

// Achievements
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  achievementType: varchar("achievement_type", { length: 50 }).notNull(),
  unlockedAt: timestamp("unlocked_at").notNull().defaultNow(),
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  unlockedAt: true,
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
