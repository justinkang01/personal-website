interface AboutSectionProps {
  bio: string;
  interests: string[];
  avatarSrc: string;
}

export default function AboutSection({ bio, interests, avatarSrc }: AboutSectionProps) {
  return (
    <div>
      <img src={avatarSrc} alt="Profile photo" />
      <p>{bio}</p>
      <ul>{interests.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}
