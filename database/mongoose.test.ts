import { connectToDatabase } from './mongoose';
import mongoose from 'mongoose';

describe('Database Connection Integration Tests', () => {
    
    // Clean up after all tests
    afterAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        global.mongooseCache = { conn: null, promise: null };
    }, 20000);

    describe('Error Handling', () => {
        it('should throw error when MONGODB_URI is not defined', async () => {
            const originalUri = process.env.MONGODB_URI;
            delete process.env.MONGODB_URI;

            await expect(connectToDatabase()).rejects.toThrow('MONGODB_URI is not defined');

            process.env.MONGODB_URI = originalUri;
        });

        it('should throw error when MONGODB_URI is empty string', async () => {
            const originalUri = process.env.MONGODB_URI;
            process.env.MONGODB_URI = '';

            await expect(connectToDatabase()).rejects.toThrow('MONGODB_URI is not defined');

            process.env.MONGODB_URI = originalUri;
        });
    });

    describe('Real Connection Tests', () => {
        it('should successfully connect to database', async () => {
            const result = await connectToDatabase();

            expect(result).toBeDefined();
            expect(result.connection).toBeDefined();
            expect(result.connection.readyState).toBe(1); // 1 = connected
        }, 15000);

        it('should have correct connection details', async () => {
            const result = await connectToDatabase();

            expect(result.connection).toBeDefined();
            expect(result.connection.readyState).toBe(1);
        }, 15000);
    });

    describe('Connection Caching', () => {
        it('should initialize global cache properly', () => {
            expect(global.mongooseCache).toBeDefined();
            expect(global.mongooseCache).toHaveProperty('conn');
            expect(global.mongooseCache).toHaveProperty('promise');
        });

        it('should cache connection and reuse it', async () => {
            // First connection should create cache
            const firstResult = await connectToDatabase();
            expect(firstResult).toBeDefined();
            expect(global.mongooseCache.conn).toBeDefined();
            expect(global.mongooseCache.conn).toBe(firstResult);
            expect(global.mongooseCache.promise).toBeDefined();
            
            // Second call should return cached connection
            const secondResult = await connectToDatabase();
            expect(secondResult).toBe(firstResult);
            expect(firstResult.connection.readyState).toBe(1);
        }, 15000);
    });
});
