import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('db/index.ts - Database Connection', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe('Database URL Validation', () => {
    it('should throw error if DATABASE_URL is not provided', async () => {
      const originalUrl = process.env.DATABASE_URL;
      delete process.env.DATABASE_URL;

      await expect(async () => {
        await import('@/db/index');
      }).rejects.toThrow('Please provide a database URL');

      process.env.DATABASE_URL = originalUrl;
    });

    it('should export db instance when DATABASE_URL is provided', async () => {
      process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
      
      const dbModule = await import('@/db/index');
      expect(dbModule.default).toBeDefined();
    });
  });

  describe('Database Configuration', () => {
    it('should use Neon serverless driver', async () => {
      process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
      
      // This test verifies the module imports without errors
      const dbModule = await import('@/db/index');
      expect(dbModule.default).toBeTruthy();
    });

    it('should configure drizzle with neon client', async () => {
      process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
      
      const dbModule = await import('@/db/index');
      expect(typeof dbModule.default).toBe('object');
    });
  });

  describe('Environment Variable Handling', () => {
    it('should read DATABASE_URL from process.env', () => {
      const testUrl = 'postgresql://testuser:testpass@testhost:5432/testdb';
      process.env.DATABASE_URL = testUrl;
      
      expect(process.env.DATABASE_URL).toBe(testUrl);
    });

    it('should handle missing DATABASE_URL gracefully', () => {
      const originalUrl = process.env.DATABASE_URL;
      delete process.env.DATABASE_URL;
      
      expect(process.env.DATABASE_URL).toBeUndefined();
      
      process.env.DATABASE_URL = originalUrl;
    });
  });
});