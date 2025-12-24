import { describe, it, expect } from 'vitest';
import { allProducts } from '@/db/data';

describe('db/data.ts - Product Data', () => {
  describe('Data Structure Validation', () => {
    it('should export an array of products', () => {
      expect(Array.isArray(allProducts)).toBe(true);
      expect(allProducts.length).toBeGreaterThan(0);
    });

    it('should have at least 8 products', () => {
      expect(allProducts.length).toBeGreaterThanOrEqual(8);
    });

    it('should have unique IDs for all products', () => {
      const ids = allProducts.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique slugs for all products', () => {
      const slugs = allProducts.map(p => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });

  describe('Product Schema Validation', () => {
    it('should have all required fields for each product', () => {
      allProducts.forEach((product, index) => {
        expect(product.id, `Product at index ${index} missing id`).toBeDefined();
        expect(product.name, `Product at index ${index} missing name`).toBeDefined();
        expect(product.slug, `Product at index ${index} missing slug`).toBeDefined();
        expect(product.status, `Product at index ${index} missing status`).toBeDefined();
      });
    });

    it('should have valid ID format (positive integers)', () => {
      allProducts.forEach(product => {
        expect(product.id).toBeGreaterThan(0);
        expect(Number.isInteger(product.id)).toBe(true);
      });
    });

    it('should have valid name format (non-empty strings)', () => {
      allProducts.forEach(product => {
        expect(typeof product.name).toBe('string');
        expect(product.name.length).toBeGreaterThan(0);
        expect(product.name.length).toBeLessThanOrEqual(120);
      });
    });

    it('should have valid slug format (lowercase with hyphens)', () => {
      allProducts.forEach(product => {
        expect(typeof product.slug).toBe('string');
        expect(product.slug).toMatch(/^[a-z0-9-]+$/);
        expect(product.slug.length).toBeGreaterThan(0);
        expect(product.slug.length).toBeLessThanOrEqual(140);
      });
    });

    it('should have valid tagline format when present', () => {
      allProducts.forEach(product => {
        if (product.tagline) {
          expect(typeof product.tagline).toBe('string');
          expect(product.tagline.length).toBeLessThanOrEqual(200);
        }
      });
    });

    it('should have valid description format when present', () => {
      allProducts.forEach(product => {
        if (product.description) {
          expect(typeof product.description).toBe('string');
          expect(product.description.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have valid website URLs', () => {
      const urlPattern = /^https?:\/\/.+/;
      allProducts.forEach(product => {
        if (product.websiteUrl) {
          expect(product.websiteUrl).toMatch(urlPattern);
        }
      });
    });

    it('should have valid tags array', () => {
      allProducts.forEach(product => {
        if (product.tags) {
          expect(Array.isArray(product.tags)).toBe(true);
          product.tags.forEach(tag => {
            expect(typeof tag).toBe('string');
            expect(tag.length).toBeGreaterThan(0);
          });
        }
      });
    });

    it('should have valid vote counts', () => {
      allProducts.forEach(product => {
        expect(typeof product.voteCount).toBe('number');
        expect(product.voteCount).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(product.voteCount)).toBe(true);
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['approved', 'pending', 'rejected'];
      allProducts.forEach(product => {
        expect(validStatuses).toContain(product.status);
      });
    });

    it('should have valid email format for submittedBy', () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      allProducts.forEach(product => {
        expect(product.submittedBy).toMatch(emailPattern);
      });
    });

    it('should have valid date objects for createdAt', () => {
      allProducts.forEach(product => {
        expect(product.createdAt).toBeInstanceOf(Date);
        expect(product.createdAt.getTime()).not.toBeNaN();
      });
    });

    it('should have valid date objects for approvedAt when present', () => {
      allProducts.forEach(product => {
        if (product.approvedAt) {
          expect(product.approvedAt).toBeInstanceOf(Date);
          expect(product.approvedAt.getTime()).not.toBeNaN();
        }
      });
    });
  });

  describe('Business Logic Validation', () => {
    it('should have approvedAt date when status is approved', () => {
      const approvedProducts = allProducts.filter(p => p.status === 'approved');
      approvedProducts.forEach(product => {
        expect(product.approvedAt).toBeDefined();
        expect(product.approvedAt).toBeInstanceOf(Date);
      });
    });

    it('should have approvedAt on or after createdAt', () => {
      allProducts.forEach(product => {
        if (product.approvedAt) {
          expect(product.approvedAt.getTime()).toBeGreaterThanOrEqual(
            product.createdAt.getTime()
          );
        }
      });
    });

    it('should have createdAt dates in the past', () => {
      const now = Date.now();
      allProducts.forEach(product => {
        expect(product.createdAt.getTime()).toBeLessThanOrEqual(now);
      });
    });

    it('should not have duplicate product names', () => {
      const names = allProducts.map(p => p.name.toLowerCase());
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });

  describe('Specific Product Tests', () => {
    it('should contain ProofyBubble product with correct details', () => {
      const proofyBubble = allProducts.find(p => p.slug === 'proofybubble');
      expect(proofyBubble).toBeDefined();
      expect(proofyBubble?.name).toBe('ProofyBubble');
      expect(proofyBubble?.websiteUrl).toBe('https://proofybubble.com');
      expect(proofyBubble?.status).toBe('approved');
      expect(proofyBubble?.voteCount).toBeGreaterThan(500);
    });

    it('should contain ParityKit product with correct details', () => {
      const parityKit = allProducts.find(p => p.slug === 'paritykit');
      expect(parityKit).toBeDefined();
      expect(parityKit?.name).toBe('ParityKit');
      expect(parityKit?.websiteUrl).toBe('https://paritykit.com');
      expect(parityKit?.tags).toContain('SaaS');
      expect(parityKit?.tags).toContain('Pricing');
    });

    it('should contain Developer to Leader Course with pending status', () => {
      const devCourse = allProducts.find(p => p.slug === 'developer-to-leader-course');
      expect(devCourse).toBeDefined();
      expect(devCourse?.status).toBe('pending');
    });
  });

  describe('Data Integrity Edge Cases', () => {
    it('should handle products with minimal data', () => {
      allProducts.forEach(product => {
        // Even minimal products must have core fields
        expect(product.id).toBeDefined();
        expect(product.name).toBeDefined();
        expect(product.slug).toBeDefined();
        expect(product.status).toBeDefined();
      });
    });

    it('should handle products with maximum vote counts', () => {
      const maxVotes = Math.max(...allProducts.map(p => p.voteCount));
      expect(maxVotes).toBeGreaterThan(0);
      expect(maxVotes).toBeLessThan(1000000); // Sanity check
    });

    it('should handle products with multiple tags', () => {
      const productsWithTags = allProducts.filter(p => p.tags && p.tags.length > 0);
      expect(productsWithTags.length).toBeGreaterThan(0);
      
      productsWithTags.forEach(product => {
        expect(product.tags!.length).toBeGreaterThan(0);
        expect(product.tags!.length).toBeLessThan(20); // Reasonable upper limit
      });
    });

    it('should have consistent data types across all products', () => {
      const firstProduct = allProducts[0];
      allProducts.forEach(product => {
        expect(typeof product.id).toBe(typeof firstProduct.id);
        expect(typeof product.name).toBe(typeof firstProduct.name);
        expect(typeof product.slug).toBe(typeof firstProduct.slug);
        expect(typeof product.voteCount).toBe(typeof firstProduct.voteCount);
      });
    });
  });

  describe('Sorting and Filtering Readiness', () => {
    it('should be sortable by vote count', () => {
      const sorted = [...allProducts].sort((a, b) => b.voteCount - a.voteCount);
      expect(sorted[0].voteCount).toBeGreaterThanOrEqual(sorted[sorted.length - 1].voteCount);
    });

    it('should be filterable by status', () => {
      const approved = allProducts.filter(p => p.status === 'approved');
      const pending = allProducts.filter(p => p.status === 'pending');
      
      expect(approved.length + pending.length).toBeGreaterThan(0);
      approved.forEach(p => expect(p.status).toBe('approved'));
      pending.forEach(p => expect(p.status).toBe('pending'));
    });

    it('should be searchable by tags', () => {
      const saasProducts = allProducts.filter(p => 
        p.tags?.some(tag => tag.toLowerCase().includes('saas'))
      );
      expect(saasProducts.length).toBeGreaterThan(0);
    });
  });
});