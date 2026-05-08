interface HeroSectionProps {
  ownerName: string;
  tagline: string;
}

export default function HeroSection({ ownerName, tagline }: HeroSectionProps) {
  return (
    <div>
      <h1>{ownerName}</h1>
      <p>{tagline}</p>
    </div>
  );
}
