import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Olfunara, strona główna">
      <span className="brand-mark" aria-hidden="true">
        ✦
      </span>
      olfunara<span className="brand-dot">.</span>
    </Link>
  );
}
