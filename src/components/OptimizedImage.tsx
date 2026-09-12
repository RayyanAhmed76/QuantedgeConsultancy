import Image, { type ImageProps } from "next/image";

/** Encode public path segments so spaces/`&` work with next/image. */
function publicSrc(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  return src
    .split("/")
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join("/");
}

type Props = Omit<ImageProps, "src"> & { src: string };

export default function OptimizedImage({
  src,
  alt,
  fill,
  style,
  ...props
}: Props) {
  return (
    <Image
      src={publicSrc(src)}
      alt={alt}
      fill={fill}
      style={
        fill
          ? { objectFit: "cover", ...style }
          : style
      }
      {...props}
    />
  );
}
