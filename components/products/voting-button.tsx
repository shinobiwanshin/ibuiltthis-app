"use client";
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  upvoteProductAction,
  downvoteProductAction,
} from "@/lib/products/product-actions";
import { useOptimistic, useTransition } from "react";
import { number, set } from "zod";
export default function VotingButtons({
  hasVoted,
  voteCount: initialVoteCount,
  productId,
}: {
  hasVoted?: boolean;
  voteCount: number;
  productId: number;
}) {
  const [optimisticvoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change)
  );
  const [isPending, startTransition] = useTransition();
  const handleUpvote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(1);
      const result = await upvoteProductAction(productId);
    });
  };
  const handleDownvote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(-1);
      const result = await downvoteProductAction(productId);
    });
  };
  return (
    <div
      className="flex flex-col items-center gap-1 shrink-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Button
        onClick={handleUpvote}
        variant="ghost"
        size="icon-sm"
        aria-label="Upvote product"
        className={cn(
          "h-8 w-8 text-primary",
          hasVoted
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-primary/10 hover:text-primary"
        )}
        disabled={isPending}
      >
        <ChevronUpIcon className="size-5" />
      </Button>
      <span className="text-sm font-semibold transition-colors text-foreground">
        {optimisticvoteCount}
      </span>
      <Button
        onClick={handleDownvote}
        variant="ghost"
        size="icon-sm"
        aria-label="Downvote product"
        className={cn(
          "h-8 w-8 text-primary",
          hasVoted ? "hover:text-destructive" : "opacity-50 cursor-not-allowed"
        )}
        disabled={isPending}
      >
        <ChevronDownIcon className="size-5" />
      </Button>
    </div>
  );
}
