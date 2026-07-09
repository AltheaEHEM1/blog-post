// Utility helpers for the project
// `cn` merges class name strings, ignoring falsy values.
// This mirrors the common pattern used in many Next.js starter kits.

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Additional helpers can be added here in the future.
