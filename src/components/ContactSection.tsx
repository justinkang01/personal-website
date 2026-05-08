import type { ReactNode } from 'react';

interface ContactSectionProps {
  email: string;
  profiles: { label: string; url: string; icon: ReactNode }[];
}

export default function ContactSection({ email, profiles }: ContactSectionProps) {
  return (
    <div>
      <a href={`mailto:${email}`}>{email}</a>
      {profiles.map((p) => (
        <a key={p.label} href={p.url}>{p.label}</a>
      ))}
    </div>
  );
}
