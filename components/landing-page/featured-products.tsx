import { StarIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import ProductCard from "../products/product-card";
// TODO: Replace with real product data from API/database
const featuredProducts = [
  {
    id: "1",
    name: "Awesome App",
    description: "An awesome app that does awesome things.",
    tags: ["Productivity", "AI"],
    votes: 124,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Cool Tool",
    description: "A cool tool for cool people.",
    tags: ["Utility", "Tools"],
    votes: 98,
    isFeatured: false,
  },
  {
    id: "3",
    name: "Innovative SaaS",
    description: "An innovative SaaS solution for modern problems.",
    tags: ["SaaS", "Innovation"],
    votes: 76,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Creative Project",
    description: "A creative project showcasing unique ideas.",
    tags: ["Creative", "Design"],
    votes: 54,
    isFeatured: false,
  },
];
export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            icon={StarIcon}
            description="Top picks from our community this week"
          />
          <Button variant={"outline"} asChild className="hidden sm:flex ">
            <Link href="/explore">
              View All <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
