import Link from "next/link";
import { HomeIcon, SparkleIcon } from "lucide-react";
const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <SparkleIcon className="size-4 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">
        i <span className="text-primary">Built</span>This
      </span>
    </Link>
  );
};
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper px-12">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-1">
            <Link href="/">
              <HomeIcon className="size-4 items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" />
              <span>Home</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
