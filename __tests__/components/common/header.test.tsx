import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/common/header';

// Mock Clerk components
vi.mock('@clerk/nextjs', () => ({
  SignInButton: vi.fn(({ children }) => <button>{children || 'Sign In'}</button>),
  SignUpButton: vi.fn(({ children }) => <button>{children || children}</button>),
  SignedIn: vi.fn(({ children }) => <div data-testid="signed-in">{children}</div>),
  SignedOut: vi.fn(({ children }) => <div data-testid="signed-out">{children}</div>),
  UserButton: vi.fn(() => <button>User Menu</button>),
}));

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: vi.fn(({ children, href }) => <a href={href}>{children}</a>),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Sparkles: () => <svg data-testid="sparkles-icon" />,
  HomeIcon: () => <svg data-testid="home-icon" />,
  Compass: () => <svg data-testid="compass-icon" />,
  Ghost: () => <svg data-testid="ghost-icon" />,
  UserIcon: () => <svg data-testid="user-icon" />,
}));

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: vi.fn(({ children, asChild, ...props }) => 
    asChild ? <>{children}</> : <button {...props}>{children}</button>
  ),
}));

describe('components/common/header.tsx - Header Component', () => {
  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should render logo with correct text', () => {
      render(<Header />);
      expect(screen.getByText('i')).toBeInTheDocument();
      expect(screen.getByText('Built')).toBeInTheDocument();
      expect(screen.getByText('This')).toBeInTheDocument();
    });

    it('should render logo as a link to home', () => {
      render(<Header />);
      const logoLinks = screen.getAllByRole('link');
      const homeLink = logoLinks.find(link => link.getAttribute('href') === '/');
      expect(homeLink).toBeInTheDocument();
    });

    it('should have sticky positioning', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      expect(header).toHaveClass('sticky');
    });
  });

  describe('Navigation Links', () => {
    it('should render Home navigation link', () => {
      render(<Header />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render Explore navigation link', () => {
      render(<Header />);
      expect(screen.getByText('Explore')).toBeInTheDocument();
    });

    it('should have correct href for Home link', () => {
      render(<Header />);
      const links = screen.getAllByRole('link');
      const homeLink = links.find(link => 
        link.textContent?.includes('Home') && link.getAttribute('href') === '/'
      );
      expect(homeLink).toBeInTheDocument();
    });

    it('should have correct href for Explore link', () => {
      render(<Header />);
      const links = screen.getAllByRole('link');
      const exploreLink = links.find(link => 
        link.textContent?.includes('Explore') && link.getAttribute('href') === '/explore'
      );
      expect(exploreLink).toBeInTheDocument();
    });
  });

  describe('Authentication UI', () => {
    it('should render SignedOut component', () => {
      render(<Header />);
      expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    });

    it('should render SignedIn component', () => {
      render(<Header />);
      expect(screen.getByTestId('signed-in')).toBeInTheDocument();
    });

    it('should render SignInButton in SignedOut state', () => {
      render(<Header />);
      const signedOut = screen.getByTestId('signed-out');
      expect(signedOut.textContent).toContain('Sign In');
    });

    it('should render SignUpButton with text in SignedOut state', () => {
      render(<Header />);
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('should render Submit button in SignedIn state', () => {
      render(<Header />);
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('should have Submit button link to /submit', () => {
      render(<Header />);
      const links = screen.getAllByRole('link');
      const submitLink = links.find(link => 
        link.textContent?.includes('Submit') && link.getAttribute('href') === '/submit'
      );
      expect(submitLink).toBeInTheDocument();
    });

    it('should render UserButton in SignedIn state', () => {
      render(<Header />);
      const signedIn = screen.getByTestId('signed-in');
      expect(signedIn.textContent).toContain('User Menu');
    });
  });

  describe('Icons', () => {
    it('should render Sparkles icon in logo', () => {
      render(<Header />);
      expect(screen.getAllByTestId('sparkles-icon')).toHaveLength(2); // Logo + Submit button
    });

    it('should render HomeIcon for Home link', () => {
      render(<Header />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should render Compass icon for Explore link', () => {
      render(<Header />);
      expect(screen.getByTestId('compass-icon')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should have border bottom', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      expect(header).toHaveClass('border-b');
    });

    it('should have backdrop blur effect', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      expect(header).toHaveClass('backdrop-blur');
    });

    it('should have z-index for stacking', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      expect(header).toHaveClass('z-50');
    });

    it('should have wrapper with padding', () => {
      const { container } = render(<Header />);
      const wrapper = container.querySelector('.wrapper');
      expect(wrapper).toHaveClass('px-12');
    });

    it('should have flex layout for header content', () => {
      const { container } = render(<Header />);
      const flexContainer = container.querySelector('.flex.h-16');
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should use semantic header element', () => {
      render(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should use semantic nav element', () => {
      render(<Header />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should have descriptive link text', () => {
      render(<Header />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Explore')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should have correct component hierarchy', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      const wrapper = header?.querySelector('.wrapper');
      const flex = wrapper?.querySelector('.flex');
      
      expect(header).toBeInTheDocument();
      expect(wrapper).toBeInTheDocument();
      expect(flex).toBeInTheDocument();
    });

    it('should separate logo, navigation, and auth sections', () => {
      const { container } = render(<Header />);
      const nav = container.querySelector('nav');
      const authSection = container.querySelector('.flex.items-center.gap-3');
      
      expect(nav).toBeInTheDocument();
      expect(authSection).toBeInTheDocument();
    });
  });
});