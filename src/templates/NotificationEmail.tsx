import { Text, Section, Button, Hr } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

interface NotificationEmailProps {
    name: string;
    subject: string;
    message: string;
    appUrl?: string;
}

export function NotificationEmail({ name, subject, message, appUrl: appUrlProp }: NotificationEmailProps) {
    return (
        <EmailLayout previewText={subject}>
            <Section style={sectionStyle}>
                <Text style={greetingText}>¡Hola, {name}!</Text>
                <Text style={introText}>
                    Has recibido una nueva notificación del sistema de solicitudes:
                </Text>
            </Section>

            <Section style={cardStyle}>
                <Text style={cardTitleStyle}>{subject}</Text>
                <Text style={messageStyle}>{message}</Text>
            </Section>

            <Section style={sectionStyle}>
                <Text style={introText}>
                    Ingresa al sistema para ver más detalles.
                </Text>
            </Section>

            <Section style={ctaSection}>
                <Button style={buttonStyle} href={appUrlProp || process.env.APP_URL || 'http://localhost:3000'}>
                    Ver Detalles
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

const cardStyle: React.CSSProperties = {
    backgroundColor: '#fef2f2',
    borderRadius: '8px',
    padding: '24px',
    margin: '24px 0',
    borderLeft: '4px solid #dc2626',
};

const cardTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#991b1b',
    margin: '0 0 12px 0',
};

const messageStyle: React.CSSProperties = {
    fontSize: '15px',
    color: '#4b5563',
    lineHeight: '1.6',
    margin: '0',
};

const ctaSection: React.CSSProperties = {
    textAlign: 'center' as const,
    padding: '16px 0',
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
