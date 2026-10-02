import type { ImgHTMLAttributes, SyntheticEvent } from "react";
import { assetPlaceholder } from "../assets/registry";
/** The fallback is original, explicitly labeled artwork; no remote asset discovery. */
export function AssetImage({
  onError,
  loading,
  fetchPriority,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      loading={loading ?? (fetchPriority === "high" ? "eager" : "lazy")}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={(event) => {
        handleArtworkError(event);
        onError?.(event);
      }}
    />
  );
}

export function handleArtworkError(event: SyntheticEvent<HTMLImageElement>) {
  const element = event.currentTarget;
  if (!element.src.endsWith("artwork-placeholder.svg")) {
    element.removeAttribute("srcset");
    element.parentElement
      ?.querySelectorAll("source")
      .forEach((source) => (source.srcset = assetPlaceholder));
    element.src = assetPlaceholder;
    element.dataset.placeholder = "true";
  }
}
