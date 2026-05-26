import { Text, Section, Button } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

interface CustomEmailProps {
    name: string;
    subject: string;
    message: string;
}

export function CustomEmail({ name, subject, message }: CustomEmailProps) {
    return (
        <EmailLayout previewText={subject}>
            <Section style={sectionStyle}>
                <Text style={greetingText}>¡Hola, {name}!</Text>
                <Text style={introText}>{message}</Text>
            </Section>

            <Section style={ctaSection}>
                <Button style={buttonStyle} href={process.env.APP_URL || 'http://localhost:3000'}>
                    Ir al Sistema
                </Button>
            </Section>
        </EmailLayout>
    );
}

const sectionStyle: React.CSSProperties = {
    padding: '8px 0',
};

const greetingText: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px 0',
};

const introText: React.CSSProperties = {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '1.6',
    margin: '0',
};

const ctaSection: React.CSSProperties = {
    textAlign: 'center' as const,
    padding: '24px 0',
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#dc2626',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    padding: '14px 32px',
    textDecoration: 'none',
};
