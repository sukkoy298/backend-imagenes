import { Text, Section, Button, Hr } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

interface PasswordRecoveryEmailProps {
    name: string;
    resetToken: string;
}

export function PasswordRecoveryEmail({ name, resetToken }: PasswordRecoveryEmailProps) {
    const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    return (
        <EmailLayout previewText="Recuperación de contraseña">
            <Section style={sectionStyle}>
                <Text style={greetingText}>¡Hola, {name}!</Text>
                <Text style={introText}>
                    Hemos recibido una solicitud para restablecer tu contraseña. Si no fuiste tú, puedes ignorar este correo.
                </Text>
            </Section>

            <Section style={warningStyle}>
                <Text style={warningText}>
                    ⚠️ Este enlace expira en 24 horas por seguridad.
                </Text>
            </Section>

            <Section style={ctaSection}>
                <Button style={buttonStyle} href={resetUrl}>
                    Restablecer Contraseña
                </Button>
            </Section>

            <Section style={sectionStyle}>
                <Text style={smallText}>
                    Si el botón no funciona, copia y pega este enlace en tu navegador:
                </Text>
                <Text style={linkText}>{resetUrl}</Text>
            </Section>

            <Hr style={hrStyle} />

            <Section style={sectionStyle}>
                <Text style={securityText}>
                    Si tienes problemas o no solicitaste este cambio, contacta al administrador del sistema inmediatamente.
                </Text>
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

const warningStyle: React.CSSProperties = {
    backgroundColor: '#fef2c7',
    borderRadius: '8px',
    padding: '16px',
    margin: '24px 0',
};

const warningText: React.CSSProperties = {
    color: '#92400e',
    fontSize: '14px',
    margin: '0',
    textAlign: 'center' as const,
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

const smallText: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0',
};

const linkText: React.CSSProperties = {
    fontSize: '13px',
    color: '#dc2626',
    wordBreak: 'break-all' as const,
    margin: '0',
};

const hrStyle: React.CSSProperties = {
    borderTop: '1px solid #e5e7eb',
    margin: '24px 0',
};

const securityText: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
    margin: '0',
};
