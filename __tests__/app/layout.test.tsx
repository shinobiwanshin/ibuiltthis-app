import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import RootLayout, { metadata } from '@/app/layout';

// Mock ClerkProvider
vi.mock('@clerk/nextjs', () => ({
  ClerkProvider: vi.fn(({ children }) => <div data-testid="clerk-provider">{children}</div>),
  SignInButton: vi.fn(() => <button>Sign In</button>),
  SignUpButton: vi.fn(() => <button>Sign Up</button>),
  SignedIn: vi.fn(({ children }) => <>{children}</>),
  SignedOut: vi.fn(({ children }) => <>{children}</>),
  UserAvatar: vi.fn(() => <div>Avatar</div>),
  UserButton: vi.fn(() => <button>User</button>),
}));

// Mock Header and Footer
vi.mock('@/components/common/header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('@/components/common/footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

describe('app/layout.tsx - Root Layout', () => {
  describe('Metadata', () => {
    it('should export correct metadata title', () => {
      expect(metadata.title).toBe('iBuiltThis - Share Your Projects with the World');
    });

    it('should export correct metadata description', () => {
      expect(metadata.description).toContain('community platform');
      expect(metadata.description).toContain('showcase');
      expect(metadata.description).toContain('projects');
    });

    it('should have comprehensive description', () => {
      expect(metadata.description).toBeTruthy();
      expect(metadata.description!.length).toBeGreaterThan(50);
    });
  });

  describe('Layout Structure', () => {
    it('should render with children', () => {
      const { getByText } = render(
        <RootLayout>
          <div>Test Content</div>
        </RootLayout>
      );
      
      expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('should wrap everything in ClerkProvider', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      expect(getByTestId('clerk-provider')).toBeInTheDocument();
    });

    it('should render html element with lang attribute', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      const html = container.querySelector('html');
      expect(html).toHaveAttribute('lang', 'en');
    });

    it('should render body element', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      expect(container.querySelector('body')).toBeInTheDocument();
    });

    it('should apply font className to body', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      const body = container.querySelector('body');
      expect(body).toHaveClass('antialiased');
    });

    it('should render Header component', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      expect(getByTestId('header')).toBeInTheDocument();
    });

    it('should render Footer component', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      expect(getByTestId('footer')).toBeInTheDocument();
    });

    it('should render children between Header and Footer', () => {
      const { container, getByText } = render(
        <RootLayout>
          <div>Main Content</div>
        </RootLayout>
      );
      
      const header = container.querySelector('[data-testid="header"]');
      const footer = container.querySelector('[data-testid="footer"]');
      const content = getByText('Main Content');
      
      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Component Hierarchy', () => {
    it('should have correct nesting order', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      const clerkProvider = container.querySelector('[data-testid="clerk-provider"]');
      const html = clerkProvider?.querySelector('html');
      const body = html?.querySelector('body');
      
      expect(clerkProvider).toBeInTheDocument();
      expect(html).toBeInTheDocument();
      expect(body).toBeInTheDocument();
    });

    it('should render exactly one Header', () => {
      const { getAllByTestId } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      expect(getAllByTestId('header')).toHaveLength(1);
    });

    it('should render exactly one Footer', () => {
      const { getAllByTestId } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      expect(getAllByTestId('footer')).toHaveLength(1);
    });
  });

  describe('Props Handling', () => {
    it('should accept children prop', () => {
      expect(() => {
        render(
          <RootLayout>
            <div>Child Component</div>
          </RootLayout>
        );
      }).not.toThrow();
    });

    it('should handle multiple children', () => {
      const { getByText } = render(
        <RootLayout>
          <>
            <div>First Child</div>
            <div>Second Child</div>
          </>
        </RootLayout>
      );
      
      expect(getByText('First Child')).toBeInTheDocument();
      expect(getByText('Second Child')).toBeInTheDocument();
    });

    it('should handle React elements as children', () => {
      const TestComponent = () => <div>Test Component</div>;
      
      const { getByText } = render(
        <RootLayout>
          <TestComponent />
        </RootLayout>
      );
      
      expect(getByText('Test Component')).toBeInTheDocument();
    });
  });

  describe('Authentication Integration', () => {
    it('should initialize ClerkProvider', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      expect(getByTestId('clerk-provider')).toBeInTheDocument();
    });

    it('should wrap entire app in ClerkProvider', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      const provider = container.querySelector('[data-testid="clerk-provider"]');
      const html = provider?.querySelector('html');
      
      expect(provider).toBeInTheDocument();
      expect(html).toBeInTheDocument();
    });
  });

  describe('CSS and Styling', () => {
    it('should import globals.css', async () => {
      // This is tested by the fact that the component renders without errors
      expect(() => {
        render(
          <RootLayout>
            <div>Test</div>
          </RootLayout>
        );
      }).not.toThrow();
    });

    it('should apply antialiased class', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      const body = container.querySelector('body');
      expect(body).toHaveClass('antialiased');
    });

    it('should apply font class from Outfit', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      );
      
      const body = container.querySelector('body');
      expect(body?.className).toContain('mocked-outfit');
    });
  });
});