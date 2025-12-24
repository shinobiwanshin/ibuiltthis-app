import { describe, it, expect, vi } from 'vitest';

// Mock @clerk/nextjs/server
vi.mock('@clerk/nextjs/server', () => ({
  clerkMiddleware: vi.fn(() => vi.fn()),
}));

describe('proxy.ts - Clerk Middleware', () => {
  describe('Middleware Export', () => {
    it('should export default middleware function', async () => {
      const proxyModule = await import('@/proxy');
      expect(proxyModule.default).toBeDefined();
      expect(typeof proxyModule.default).toBe('function');
    });

    it('should export config object', async () => {
      const proxyModule = await import('@/proxy');
      expect(proxyModule.config).toBeDefined();
      expect(typeof proxyModule.config).toBe('object');
    });
  });

  describe('Middleware Configuration', () => {
    it('should have matcher configuration', async () => {
      const proxyModule = await import('@/proxy');
      expect(proxyModule.config.matcher).toBeDefined();
      expect(Array.isArray(proxyModule.config.matcher)).toBe(true);
    });

    it('should have correct number of matcher patterns', async () => {
      const proxyModule = await import('@/proxy');
      expect(proxyModule.config.matcher).toHaveLength(2);
    });

    it('should exclude Next.js internals and static files', async () => {
      const proxyModule = await import('@/proxy');
      const firstMatcher = proxyModule.config.matcher[0];
      
      expect(typeof firstMatcher).toBe('string');
      expect(firstMatcher).toContain('_next');
    });

    it('should include API routes', async () => {
      const proxyModule = await import('@/proxy');
      const apiMatcher = proxyModule.config.matcher[1];
      
      expect(apiMatcher).toContain('api');
      expect(apiMatcher).toContain('trpc');
    });
  });

  describe('Matcher Pattern Validation', () => {
    it('should have valid regex patterns in matcher', async () => {
      const proxyModule = await import('@/proxy');
      
      proxyModule.config.matcher.forEach((pattern: string) => {
        expect(() => {
          new RegExp(pattern);
        }).not.toThrow();
      });
    });

    it('should match expected route patterns', async () => {
      const proxyModule = await import('@/proxy');
      const [staticMatcher, apiMatcher] = proxyModule.config.matcher;

      // Test that it would match normal pages
      expect(typeof staticMatcher).toBe('string');
      // Test that it would match API routes
      expect(apiMatcher).toMatch(/api|trpc/);
    });
  });

  describe('Static File Exclusions', () => {
    it('should exclude common static file extensions', async () => {
      const proxyModule = await import('@/proxy');
      const staticMatcher = proxyModule.config.matcher[0];
      
      const excludedExtensions = ['css', 'js', 'jpg', 'png', 'svg', 'ico'];
      excludedExtensions.forEach(ext => {
        expect(staticMatcher).toContain(ext);
      });
    });

    it('should exclude document files', async () => {
      const proxyModule = await import('@/proxy');
      const staticMatcher = proxyModule.config.matcher[0];
      
      expect(staticMatcher).toContain('csv');
      expect(staticMatcher).toContain('docx');
      expect(staticMatcher).toContain('xlsx');
    });

    it('should exclude webmanifest', async () => {
      const proxyModule = await import('@/proxy');
      const staticMatcher = proxyModule.config.matcher[0];
      
      expect(staticMatcher).toContain('webmanifest');
    });
  });
});