import { NextRequest, NextResponse } from "next/server";
import admin, { adminAuth } from "@/config/firebaseAdmin";
import { db } from "@/config/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { checkNSFW } from "@/lib/nsfwCheck";
import { checkSpam } from "@/lib/spamCheck";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const userName = decodedToken.name;
    const userPhoto = decodedToken.picture;

    const body = await req.json();
    const {
      title,
      description,
      tags = [],
      ingredients = [],
      instructions = [],
      image = null,
    } = body;

    if (
      !title ||
      !description ||
      ingredients.length === 0 ||
      instructions.length === 0 ||
      !image
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ingredient validation
    for (const ingredient of ingredients) {
      if (!ingredient.ingredient || !ingredient.quantity) {
        return NextResponse.json(
          { error: "Each ingredient must have a name and quantity." },
          { status: 400 }
        );
      }
    }

    // Instruction validation
    for (const step of instructions) {
      if (!step.instruction) {
        return NextResponse.json(
          { error: "Each step must have an instruction." },
          { status: 400 }
        );
      }
    }

    // Optional NSFW image check
    if (image && typeof image === "string" && image.trim() !== "") {
      const isNSFW = await checkNSFW(image);
      if (isNSFW) {
        console.log("Image is NSFW! Reject upload.");
        return NextResponse.json(
          { error: "Image is NSFW and cannot be uploaded." },
          { status: 400 }
        );
      }
    }

    // Spam checks
    const isTitleSpam = await checkSpam(title);
    if (isTitleSpam) {
      return NextResponse.json(
        { error: "Title contains spam content." },
        { status: 400 }
      );
    }

    const isDescriptionSpam = await checkSpam(description);
    if (isDescriptionSpam) {
      return NextResponse.json(
        { error: "Description contains spam content." },
        { status: 400 }
      );
    }

    for (const ingredient of ingredients) {
      const isSpam = await checkSpam(ingredient.ingredient);
      if (isSpam) {
        return NextResponse.json(
          { error: "Ingredient contains spam content." },
          { status: 400 }
        );
      }
    }

    for (const step of instructions) {
      const isSpam = await checkSpam(step.instruction);
      if (isSpam) {
        return NextResponse.json(
          { error: "Instruction contains spam content." },
          { status: 400 }
        );
      }
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, "recipes"), {
      title,
      description,
      tags,
      ingredients,
      instructions,
      image: image,
      authorId: userId,
      authorName: userName,
      authorPhoto: userPhoto,
      createdAt: Timestamp.now(),
      views: 0,
      likes: 0,
    });

    return NextResponse.json(
      { id: docRef.id, message: "Recipe successfully created" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting recipe:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
