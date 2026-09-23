import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui class combiner: clsx for conditional classes, tailwind-merge so
 * the last class wins conflicts (e.g. `static` overriding a vendored
 * primitive's `absolute`, or `-ml-6` overriding its `-ml-4`). Both deps are
 * required for this exact behavior — a plain join would leave conflict
 * resolution to stylesheet order.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
