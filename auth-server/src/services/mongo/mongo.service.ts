import { MongoClient, Db } from "mongodb";

class MongoService {
  private readonly client: MongoClient;
  private database: Db | null = null;
  private readonly uri: string;
  private readonly dbName: string;

  constructor(uri: string, dbName: string) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri, {
      // Optional: Configure connection options
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
  }

  // Connect to MongoDB and return the database instance
  async connect(): Promise<Db> {
    if (this.database) {
      return this.database; // Return existing connection if already connected
    }

    try {
      await this.client.connect();
      this.database = this.client.db(this.dbName);
      console.log(`Connected to MongoDB database: ${this.dbName}`);
      return this.database;
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw new Error("Database connection failed");
    }
  }

  // Get the database instance (throws if not connected)
  db(): Db {
    if (!this.database) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.database;
  }
}

export const mongodbErrors = {
  DUPLICATE: 11_000,
};

// Singleton instance (optional, for single connection across app)
export const mongoService = new MongoService(
  process.env.MONGO_URI ?? "",
  "authdb"
);
