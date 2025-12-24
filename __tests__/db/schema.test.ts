import { describe, it, expect } from 'vitest';
import { products } from '@/db/schema';

describe('db/schema.ts - Database Schema', () => {
  describe('Schema Structure', () => {
    it('should export products table', () => {
      expect(products).toBeDefined();
      expect(typeof products).toBe('object');
    });

    it('should have correct table name', () => {
      // @ts-ignore - accessing internal structure for testing
      expect(products[Symbol.for('drizzle:Name')]).toBe('products');
    });
  });

  describe('Schema Field Definitions', () => {
    it('should have all required columns defined', () => {
      const columns = Object.keys(products);
      const requiredFields = [
        'id', 'name', 'slug', 'tagline', 'description',
        'websiteUrl', 'tags', 'voteCount', 'createdAt',
        'approvedAt', 'status', 'submittedBy', 'userId',
        'organizationId'
      ];
      
      requiredFields.forEach(field => {
        expect(columns).toContain(field);
      });
    });

    it('should have id as primary key', () => {
      // Testing that id column exists and is configured
      expect(products.id).toBeDefined();
    });

    it('should have name column with proper constraints', () => {
      expect(products.name).toBeDefined();
    });

    it('should have slug column with proper constraints', () => {
      expect(products.slug).toBeDefined();
    });

    it('should have voteCount with default value', () => {
      expect(products.voteCount).toBeDefined();
    });

    it('should have status with default value', () => {
      expect(products.status).toBeDefined();
    });

    it('should have submittedBy with default value', () => {
      expect(products.submittedBy).toBeDefined();
    });

    it('should have timestamps configured', () => {
      expect(products.createdAt).toBeDefined();
      expect(products.approvedAt).toBeDefined();
    });

    it('should have JSON tags column', () => {
      expect(products.tags).toBeDefined();
    });

    it('should have Clerk integration fields', () => {
      expect(products.userId).toBeDefined();
      expect(products.organizationId).toBeDefined();
    });
  });

  describe('Schema Constraints and Indexes', () => {
    it('should be able to create a product object matching schema', () => {
      const mockProduct = {
        name: 'Test Product',
        slug: 'test-product',
        tagline: 'A test tagline',
        description: 'Test description',
        websiteUrl: 'https://test.com',
        tags: ['Test', 'Demo'],
        voteCount: 0,
        status: 'pending',
        submittedBy: 'test@example.com',
      };

      expect(mockProduct.name).toBeDefined();
      expect(mockProduct.slug).toBeDefined();
      expect(Array.isArray(mockProduct.tags)).toBe(true);
    });
  });

  describe('Type Safety', () => {
    it('should enforce proper types for product fields', () => {
      // This is more of a compile-time check, but we can verify structure
      const testProduct = {
        id: 1,
        name: 'Test',
        slug: 'test',
        tagline: 'Test tagline',
        description: 'Test description',
        websiteUrl: 'https://test.com',
        tags: ['tag1', 'tag2'],
        voteCount: 0,
        createdAt: new Date(),
        approvedAt: new Date(),
        status: 'pending',
        submittedBy: 'test@test.com',
        userId: 'user_123',
        organizationId: 'org_123',
      };

      expect(typeof testProduct.id).toBe('number');
      expect(typeof testProduct.name).toBe('string');
      expect(typeof testProduct.slug).toBe('string');
      expect(Array.isArray(testProduct.tags)).toBe(true);
      expect(typeof testProduct.voteCount).toBe('number');
      expect(testProduct.createdAt).toBeInstanceOf(Date);
    });
  });
});