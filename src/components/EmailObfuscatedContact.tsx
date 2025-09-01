import React from "react";
import EmailObfuscator from "./EmailObfuscator";

interface EmailObfuscatedContactProps {
  className?: string;
  user?: string;
  domain?: string;
  tld?: string;
}

const EmailObfuscatedContact: React.FC<EmailObfuscatedContactProps> = ({ 
  className = "text-primary hover:text-primary/80 transition-colors",
  user = "RealHenryYue",
  domain = "gmail", 
  tld = "com"
}) => {
  return (
    <EmailObfuscator 
      user={user}
      domain={domain}
      tld={tld}
      className={className}
    />
  );
};

export default EmailObfuscatedContact;