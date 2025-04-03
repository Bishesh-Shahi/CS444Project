type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, boolean>;

export function cn(...inputs: ClassValue[]) {
  return inputs
    .filter(
      (input): input is Exclude<ClassValue, null | undefined | false> =>
        input !== null && input !== undefined && input !== false
    )
    .map((input) => {
      if (typeof input === "string" || typeof input === "number")
        return String(input);
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .join(" ");
}
