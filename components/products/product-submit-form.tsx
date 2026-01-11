"use client";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
import { addProductAction } from "@/lib/products/product-actions";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import { FormState } from "@/types";
export default function ProductSubmitForm() {
  const initialState: FormState = {
    success: false,
    errors: {} as Record<string, string[]>,
    message: "",
  };
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState
  );
  const { errors, message, success } = state;
  return (
    <form className="space-y-6" action={formAction}>
      {message && (
        <div
          className={cn(
            "p-4 rounded-lg border",
            success
              ? "bg-primary/10 border-primary text-primary"
              : "bg-destructive/10 border-destructive text-destructive"
          )}
          role="alert"
          aria-live="polite"
        >
          {" "}
          {message}
        </div>
      )}
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="My Product"
        required={true}
        onChange={() => {}}
        error={errors?.name?.[0] ?? ""}
      />
      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-product"
        required={true}
        onChange={() => {}}
        error={errors?.slug?.[0] ?? ""}
        helperText="The slug is the URL-friendly version of the product name"
      />
      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="A short, catchy description"
        required={true}
        onChange={() => {}}
        error={errors?.tagline?.[0] ?? ""}
      />
      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Tell us about your product..."
        required={true}
        onChange={() => {}}
        error={errors?.description?.[0] ?? ""}
        textarea={true}
      />
      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://example.com"
        required={true}
        onChange={() => {}}
        error={errors?.websiteUrl?.[0] ?? ""}
        helperText="enter your product's website or landing page"
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="AI, Productivity, Design"
        required={true}
        onChange={() => {}}
        error={errors?.tags?.[0] ?? ""}
        helperText="Comma-separated tags to categorize your product"
      />
      <Button type="submit" size="lg" className="w-full">
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <>
            <SparklesIcon className="size-4" />
            Submit Product
          </>
        )}
      </Button>
    </form>
  );
}
