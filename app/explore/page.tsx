import SectionHeader from "@/components/common/section-header";
import { CompassIcon } from "lucide-react";
import ProductExplorer from "@/components/products/product-explorer";
import { getAllApprovedProducts } from "@/lib/products/product-select";
import { Suspense } from "react";
import ProductSkeleton from "@/components/products/product-skeleton";

async function ExploreContent() {
  const products = await getAllApprovedProducts();
  return <ProductExplorer products={products} />;
}

export default function ExplorePage() {
  return (
    <div className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Explore All Products"
            icon={CompassIcon}
            description="Browse and discover amazing products from our community"
          />
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <ExploreContent />
        </Suspense>
      </div>
    </div>
  );
}
