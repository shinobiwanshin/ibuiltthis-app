"use client";
import { SparklesIcon } from "lucide-react";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
export default function ProductSubmitForm() {
  return (
    <form className="space-y-6">
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="My Product"
        required={true}
        onChange={() => {}}
        error=""
      />
      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-product"
        required={true}
        onChange={() => {}}
        error=""
        helperText="The slug is the URL-friendly version of the product name"
      />
      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="A short, catchy description"
        required={true}
        onChange={() => {}}
        error=""
      />
      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Tell us about your product..."
        required={true}
        onChange={() => {}}
        error=""
        textarea={true}
      />
      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://example.com"
        required={true}
        onChange={() => {}}
        error=""
        helperText="enter your product's website or landing page"
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="AI, Productivity, Design"
        required={true}
        onChange={() => {}}
        error=""
        helperText="Comma-separated tags to categorize your product"
      />
      <Button type="submit" size="lg" className="w-full">
        <SparklesIcon className="size-4" />
        Submit Product
      </Button>
    </form>
  );
}
