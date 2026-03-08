export default function Logo({
  variant = "dark",
  size = 120,
}: {
  variant?: "dark" | "light";
  size?: number;
}) {
  const src =
    variant === "dark"
      ? "/branding/logo-dark.png"
      : "/branding/logo-light.png";

  return (
    <img
      src={src}
      alt="Kosmos Studio"
      loading="eager"
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}
