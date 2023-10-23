import { type ReactElement } from 'react';

interface ContactInfoProps {
  icon: ReactElement;
  content: string;
}
const ContactInfo = ({ icon, content }: ContactInfoProps) => {
  return (
    <div className="flex items-center justify-center">
      {icon}
      <span className="ml-2">{content}</span>
    </div>
  );
};

export default ContactInfo;
