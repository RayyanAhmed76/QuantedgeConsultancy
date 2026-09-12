import { BRAND } from "@/data/site";

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="logo" aria-label={BRAND}>
      <span
        className="logo-mark"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
      <span className="logo-word">{BRAND}</span>
    </span>
  );
}
