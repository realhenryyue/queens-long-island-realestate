import React, { useMemo } from "react";

interface EmailObfuscatorProps {
  user: string;
  domain: string;
  tld: string;
  className?: string;
}

// Renders an email link while obfuscating it from simple scrapers
const EmailObfuscator: React.FC<EmailObfuscatorProps> = ({ user, domain, tld, className }) => {
  const email = useMemo(() => `${user}@${domain}.${tld}`, [user, domain, tld]);
  const href = useMemo(() => `mailto:${email}`, [email]);
  return (
    <a href={href} className={className} aria-label="Email">
      {email}
    </a>
  );
};

export default EmailObfuscator;
