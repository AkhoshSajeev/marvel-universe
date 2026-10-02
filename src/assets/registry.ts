/** Replace any entry with a licensed local asset path or an authorized HTTPS URL. */
export const assetOverrides: Record<string, string> = {
  // 'iron-man': 'assets/replacements/iron-man.webp',
};
export const assetPlaceholder = `${import.meta.env.BASE_URL}assets/artwork-placeholder.svg`;
export function imageAsset(id: string): string {
  if (import.meta.env.VITE_ASSET_MODE === "placeholder")
    return assetPlaceholder;
  const replacement = assetOverrides[id];
  if (replacement)
    return replacement.startsWith("https://")
      ? replacement
      : `${import.meta.env.BASE_URL}${replacement.replace(/^\//, "")}`;
  return `${import.meta.env.BASE_URL}assets/optimized/${id}.webp`;
}
