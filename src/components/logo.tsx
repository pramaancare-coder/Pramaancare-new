import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const logos = {
  light: {
    // local optimized asset in public/images
    src: "/images/light logo.svg",
    width: 160,
    height: 44,
  },
  dark: {
    src: "/images/logo darkkk.svg",
    width: 160,
    height: 44,
  }
}

type LogoProps = {
    variant?: keyof typeof logos;
    className?: string;
    asChild?: boolean;
}

export function Logo({ variant = "light", className, asChild = false }: LogoProps) {
  const selectedLogo = logos[variant];
  const logoImage = (
    <Image
        src={selectedLogo.src}
        alt="Pramaan Care Logo"
        width={selectedLogo.width}
        height={selectedLogo.height}
        className={cn("h-12 sm:h-10 w-auto logo-image", className)}
        priority
      />
  );

  if (asChild) {
    return logoImage;
  }

  return (
    <Link href="/" aria-label="Pramaan Care Home">
      {logoImage}
    </Link>
  );
}
