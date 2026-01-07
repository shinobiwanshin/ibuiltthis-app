import HeroSection from "@/components/landing-page/hero-section";
import FeaturedProducts from "@/components/landing-page/featured-products";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import { Suspense } from "react";
import { Divide, Loader } from "lucide-react";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Suspense
        fallback={
          <div className="wrapper flex items-center gap-2">
            <Loader className="size4 animate-spin" />
          </div>
        }
      >
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}
