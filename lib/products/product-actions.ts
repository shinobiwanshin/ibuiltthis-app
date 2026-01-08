"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";
import { products } from "@/db/schema";
import { db, sql } from "@/db";
import { z } from "zod";
import { FormState } from "@/types";
import { eq } from "drizzle-orm";
import { refresh, revalidatePath } from "next/cache";

export const addProductAction = async (
  prevState: FormState,
  formdata: FormData
) => {
  console.log(formdata);
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to submit a product",
      };
    }
    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
      };
    }
    // data
    const rawFormData = Object.fromEntries(formdata.entries());
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";
    //validate the data
    const validateData = productSchema.safeParse(rawFormData);

    if (!validateData.success) {
      const fieldErrors = validateData.error.flatten().fieldErrors;
      console.log("Validation errors:", fieldErrors);
      return {
        success: false,
        error: fieldErrors,
        message: "Validation failed",
      };
    }
    const { name, slug, tagline, description, websiteUrl, tags } =
      validateData.data;
    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];
    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });
    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed soon.",
    };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed, please check your input.",
      };
    }
    return {
      success: false,
      errors: error,
      message: "Product submission failed!",
    };
  }
};

export const upvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to upvote a product",
      };
    }
    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to upvote a product",
      };
    }
    // Add upvote logic here
    // Use a raw UPDATE to increment safely (avoids sending the sql-tag as a param)
    await db.execute(
      `UPDATE products SET vote_count = GREATEST(0, vote_count + 1) WHERE id = ${productId}`
    );
    revalidatePath("/");
    return {
      success: true,
      message: "Product upvoted successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Upvote failed!",
    };
  }
};
export const downvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to downvote a product",
      };
    }
    if (!orgId) {
      return {
        success: false,
        message:
          "You must be a member of an organization to downvote a product",
      };
    }
    // Add upvote logic here
    // Use a raw UPDATE to increment safely (avoids sending the sql-tag as a param)
    await db.execute(
      `UPDATE products SET vote_count = GREATEST(0, vote_count - 1) WHERE id = ${productId}`
    );
    revalidatePath("/");
    return {
      success: true,
      message: "Product downvoted successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Downvote failed!",
    };
  }
};
