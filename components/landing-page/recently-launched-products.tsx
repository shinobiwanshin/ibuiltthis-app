import { Calendar1Icon, RocketIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import ProductCard from "../products/product-card";
import EmptyState from "../common/empty-state";
const recentlyLaunchedProducts = [
  //   {
  //     id: "1",
  //     name: "Awesome App",
  //     description: "An awesome app that does awesome things.",
  //     tags: ["Productivity", "AI"],
  //     votes: 124,
  //     isFeatured: true,
  //   },
  //   {
  //     id: "2",
  //     name: "Cool Tool",
  //     description: "A cool tool for cool people.",
  //     tags: ["Utility", "Tools"],
  //     votes: 98,
  //     isFeatured: false,
  //   },
  //   {
  //     id: "3",
  //     name: "Innovative SaaS",
  //     description: "An innovative SaaS solution for modern problems.",
  //     tags: ["SaaS", "Innovation"],
  //     votes: 76,
  //     isFeatured: true,
  //   },
  //   {
  //     id: "4",
  //     name: "Creative Project",
  //     description: "A creative project showcasing unique ideas.",
  //     tags: ["Creative", "Design"],
  //     votes: 54,
  //     isFeatured: false,
  //   },
];
export default function RecentlyLaunchedProducts() {
  return (
    <section className="py-20">
      <div className="wrapper space-y-8">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Discover the latest projects shared by our community"
        />

        {recentlyLaunchedProducts.length > 0 ? (
          <div className="grid-wrapper">
            {recentlyLaunchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No products launched in the last week. Check back soon for new launches"
            icon={Calendar1Icon}
          />
        )}
      </div>
    </section>
  );
}
