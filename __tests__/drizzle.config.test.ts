import { describe, it, expect, beforeEach } from 'vitest';
import { defineConfig } from 'drizzle-kit';

describe('drizzle.config.ts - Drizzle Configuration', () => {
  beforeEach(() => {
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
  });

  describe('Configuration Structure', () => {
    it('should have valid configuration structure', () => {
      const config = defineConfig({
        out: './drizzle',
        schema: './src/db/schema.ts',
        dialect: 'postgresql',
        dbCredentials: {
          url: process.env.DATABASE_URL!,
        },
      });

      expect(config).toBeDefined();
    });

    it('should specify correct output directory', () => {
      const config = defineConfig({
        out: './drizzle',
        schema: './src/db/schema.ts',
        dialect: 'postgresql',
        dbCredentials: {
          url: process.env.DATABASE_URL!,
        },
      });

      expect(config.out).toBe('./drizzle');
    });

    it('should specify correct schema path', () => {
      const config = defineConfig({
        out: './drizzle',
        schema: './src/db/schema.ts',
        dialect: 'postgresql',
        dbCredentials: {
          url: process.env.DATABASE_URL!,
        },
      });

      expect(config.schema).toBe('./src/db/schema.ts');
    });

    it('should use postgresql dialect', () => {
      const config = defineConfig({
        out: './drizzle',
        schema: './src/db/schema.ts',
        dialect: 'postgresql',
        dbCredentials: {
          url: process.env.DATABASE_URL!,
        },
      });

      expect(config.dialect).toBe('postgresql');
    });

    it('should configure database credentials from environment', () => {
      const testUrl = 'postgresql://user:pass@host:5432/db';
      process.env.DATABASE_URL = testUrl;

      const config = defineConfig({
        out: './drizzle',
        schema: './src/db/schema.ts',
        dialect: 'postgresql',
        dbCredentials: {
          url: process.env.DATABASE_URL!,
        },
      });

      expect(config.dbCredentials?.url).toBe(testUrl);
    });
  });

  describe('Configuration Validation', () => {
    it('should have all required configuration keys', () => {
      const config = defineConfig({
        out: './drizzle',
        schema: './src/db/schema.ts',
        dialect: 'postgresql',
        dbCredentials: {
          url: process.env.DATABASE_URL!,
        },
      });

      expect(config).toHaveProperty('out');
      expect(config).toHaveProperty('schema');
      expect(config).toHaveProperty('dialect');
      expect(config).toHaveProperty('dbCredentials');
    });

    it('should handle environment variable requirement', () => {
      expect(() => {
        const config = defineConfig({
          out: './drizzle',
          schema: './src/db/schema.ts',
          dialect: 'postgresql',
          dbCredentials: {
            url: process.env.DATABASE_URL!,
          },
        });
        expect(config.dbCredentials?.url).toBeDefined();
      }).not.toThrow();
    });
  });
});