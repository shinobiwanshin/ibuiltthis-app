import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// TODO: Replace with real product data from API/database
const placeholderProducts = [
  {
    id: 1,
    title: "Product 1",
    category: "SaaS",
    description: "Amazing product",
  },
  {
    id: 2,
    title: "Product 2",
    category: "AI Tool",
    description: "Innovative solution",
  },
  { id: 3, title: "Product 3", category: "App", description: "Great app" },
];

export default function FeaturedProducts() {
  return (
    <section className="wrapper py-12 lg:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Featured Products
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover the latest projects from our community
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">
                {product.category}
              </Badge>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
