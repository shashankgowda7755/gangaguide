import { 
  users,
  destinations,
  blogPosts,
  packages,
  type User, 
  type InsertUser,
  type Destination,
  type InsertDestination,
  type BlogPost,
  type InsertBlogPost,
  type Package,
  type InsertPackage
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import type { NeonDatabase } from 'drizzle-orm/neon-serverless';

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  updateDestination(id: string, destination: Partial<InsertDestination>): Promise<Destination | undefined>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  
  getAllPackages(): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package | undefined>;
}

export class DatabaseStorage implements IStorage {
  private db: NeonDatabase<any>;

  constructor(database: NeonDatabase<any>) {
    this.db = database;
  }
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllDestinations(): Promise<Destination[]> {
    return await this.db.select().from(destinations);
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    const [destination] = await this.db.select().from(destinations).where(eq(destinations.id, id));
    return destination || undefined;
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const [destination] = await this.db
      .insert(destinations)
      .values(insertDestination)
      .returning();
    return destination;
  }

  async updateDestination(id: string, updates: Partial<InsertDestination>): Promise<Destination | undefined> {
    const [destination] = await this.db
      .update(destinations)
      .set(updates)
      .where(eq(destinations.id, id))
      .returning();
    return destination || undefined;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await this.db.select().from(blogPosts);
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [blogPost] = await this.db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return blogPost || undefined;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [blogPost] = await this.db
      .insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    return blogPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [blogPost] = await this.db
      .update(blogPosts)
      .set(updates)
      .where(eq(blogPosts.id, id))
      .returning();
    return blogPost || undefined;
  }

  async getAllPackages(): Promise<Package[]> {
    return await this.db.select().from(packages);
  }

  async getPackage(id: string): Promise<Package | undefined> {
    const [pkg] = await this.db.select().from(packages).where(eq(packages.id, id));
    return pkg || undefined;
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const [pkg] = await this.db
      .insert(packages)
      .values(insertPackage)
      .returning();
    return pkg;
  }

  async updatePackage(id: string, updates: Partial<InsertPackage>): Promise<Package | undefined> {
    const [pkg] = await this.db
      .update(packages)
      .set(updates)
      .where(eq(packages.id, id))
      .returning();
    return pkg || undefined;
  }
}

class MemStorage implements IStorage {
  private users: Map<string, User>;
  private destinations: Map<string, Destination>;
  private blogPosts: Map<string, BlogPost>;
  private packages: Map<string, Package>;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.blogPosts = new Map();
    this.packages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = randomUUID();
    const destination: Destination = { 
      id, 
      ...insertDestination,
      image2: insertDestination.image2 ?? null,
      image3: insertDestination.image3 ?? null,
      image4: insertDestination.image4 ?? null,
      region: insertDestination.region ?? null,
      featured: insertDestination.featured ?? false,
    };
    this.destinations.set(id, destination);
    return destination;
  }

  async updateDestination(id: string, updates: Partial<InsertDestination>): Promise<Destination | undefined> {
    const destination = this.destinations.get(id);
    if (!destination) return undefined;
    
    const updated: Destination = { ...destination, ...updates };
    this.destinations.set(id, updated);
    return updated;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const blogPost: BlogPost = { 
      id, 
      ...insertBlogPost,
      image2: insertBlogPost.image2 ?? null,
      image3: insertBlogPost.image3 ?? null,
      image4: insertBlogPost.image4 ?? null,
      featured: insertBlogPost.featured ?? false,
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const blogPost = this.blogPosts.get(id);
    if (!blogPost) return undefined;
    
    const updated: BlogPost = { ...blogPost, ...updates };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }

  async getPackage(id: string): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const id = randomUUID();
    const pkg: Package = { 
      id, 
      ...insertPackage,
      price: insertPackage.price ?? null,
      featured: insertPackage.featured ?? false,
    };
    this.packages.set(id, pkg);
    return pkg;
  }

  async updatePackage(id: string, updates: Partial<InsertPackage>): Promise<Package | undefined> {
    const pkg = this.packages.get(id);
    if (!pkg) return undefined;
    
    const updated: Package = { ...pkg, ...updates };
    this.packages.set(id, updated);
    return updated;
  }
}

function createStorage(): IStorage {
  if (process.env.DATABASE_URL) {
    const { db } = require("./db");
    return new DatabaseStorage(db);
  } else {
    console.warn("DATABASE_URL not found, using in-memory storage. Data will be lost on restart.");
    return new MemStorage();
  }
}

export const storage = createStorage();
