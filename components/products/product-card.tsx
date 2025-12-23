import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  tags: string[];
  votes: number;
  isFeatured: boolean;
}
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          {product.isFeatured && <Badge>Featured</Badge>}
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          {product.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
