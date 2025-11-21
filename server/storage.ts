import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { 
  users, 
  leaderboard, 
  userProgress, 
  achievements,
  type User, 
  type InsertUser,
  type Leaderboard,
  type InsertLeaderboard,
  type UserProgress,
  type InsertUserProgress,
  type Achievement,
  type InsertAchievement
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Leaderboard methods
  addLeaderboardEntry(entry: InsertLeaderboard): Promise<Leaderboard>;
  getLeaderboard(difficulty?: string, category?: string, limit?: number): Promise<Leaderboard[]>;
  
  // User progress methods
  saveProgress(progress: InsertUserProgress): Promise<UserProgress>;
  getProgress(sessionId: string): Promise<UserProgress | undefined>;
  updateProgress(sessionId: string, updates: Partial<InsertUserProgress>): Promise<UserProgress | undefined>;
  deleteProgress(sessionId: string): Promise<void>;
  
  // Achievement methods
  unlockAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getAchievements(sessionId: string): Promise<Achievement[]>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Leaderboard methods
  async addLeaderboardEntry(entry: InsertLeaderboard): Promise<Leaderboard> {
    const result = await db.insert(leaderboard).values(entry).returning();
    return result[0];
  }
  
  async getLeaderboard(difficulty?: string, category?: string, limit: number = 10): Promise<Leaderboard[]> {
    if (difficulty && category) {
      return db.select().from(leaderboard)
        .where(eq(leaderboard.difficulty, difficulty))
        .where(eq(leaderboard.category, category))
        .orderBy(desc(leaderboard.score))
        .limit(limit);
    } else if (difficulty) {
      return db.select().from(leaderboard)
        .where(eq(leaderboard.difficulty, difficulty))
        .orderBy(desc(leaderboard.score))
        .limit(limit);
    } else if (category) {
      return db.select().from(leaderboard)
        .where(eq(leaderboard.category, category))
        .orderBy(desc(leaderboard.score))
        .limit(limit);
    }
    
    return db.select().from(leaderboard)
      .orderBy(desc(leaderboard.score))
      .limit(limit);
  }
  
  // User progress methods
  async saveProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const result = await db.insert(userProgress).values(progress).returning();
    return result[0];
  }
  
  async getProgress(sessionId: string): Promise<UserProgress | undefined> {
    const result = await db.select().from(userProgress).where(eq(userProgress.sessionId, sessionId));
    return result[0];
  }
  
  async updateProgress(sessionId: string, updates: Partial<InsertUserProgress>): Promise<UserProgress | undefined> {
    const result = await db
      .update(userProgress)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userProgress.sessionId, sessionId))
      .returning();
    return result[0];
  }
  
  async deleteProgress(sessionId: string): Promise<void> {
    await db.delete(userProgress).where(eq(userProgress.sessionId, sessionId));
  }
  
  // Achievement methods
  async unlockAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const result = await db.insert(achievements).values(achievement).returning();
    return result[0];
  }
  
  async getAchievements(sessionId: string): Promise<Achievement[]> {
    return db.select().from(achievements).where(eq(achievements.sessionId, sessionId));
  }
}

export const storage = new DbStorage();
