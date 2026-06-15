import { Text, Section, Button, Hr } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

interface GreetingEmailProps {
    name: string;
    personalId?: string;
    appUrl?: string;
}

export function GreetingEmail({ name, personalId, appUrl: appUrlProp }: GreetingEmailProps) {
    const appUrl = appUrlProp || process.env.APP_URL || 'http://localhost:3000';
    const registerUrl = personalId
        ? `${appUrl}/auth/register?cedula=${encodeURIComponent(personalId)}`
        : `${appUrl}/auth/register`;

    return (
        <EmailLayout previewText="Bienvenido al sistema de solicitudes">
            <Section style={sectionStyle}>
                <Text style={greetingText}>¡Hola, {name}!</Text>
                <Text style={introText}>
                    Bienvenido al sistema de solicitudes de Keystone. Estamos encantados de tenerte en nuestro equipo.
                </Text>
            </Section>

            <Hr style={dividerStyle} />

            <Section style={sectionStyle}>
                <Text style={subtitleStyle}>¿Qué puedes hacer en el sistema?</Text>
                <ul style={listStyle}>
                    <li style={listItemStyle}>Solicitar:</li>
                    <ul style={listStyle}>
                        <li style={listItemStyle}>Vacaciones y permisos</li>
                        <li style={listItemStyle}>Anticipo de prestaciones</li>
                        <li style={listItemStyle}>Constancias de trabajo</li>
                    </ul>
                    <li style={listItemStyle}>Dar seguimiento a tus solicitudes</li>
                    <li style={listItemStyle}>Ver Formatos de solicitud</li>
                    <li style={listItemStyle}>Consultar información personal</li>
                </ul>
            </Section>


            <Section style={ctaSection}>
                <Button style={buttonStyle} href={registerUrl}>
                    Crear mi Cuenta
                </Button>
            </Section>

            <Section style={sectionStyle}>
                <Text style={introText}>
                    Si tienes alguna pregunta, no dudes en contactar al departamento de Gestión Humana.
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

const subtitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px 0',
};

const listStyle: React.CSSProperties = {
    paddingLeft: '20px',
    margin: '0',
};

const listItemStyle: React.CSSProperties = {
    fontSize: '15px',
    color: '#4b5563',
    marginBottom: '8px',
};

const dividerStyle: React.CSSProperties = {
    borderTop: '1px solid #e5e7eb',
    margin: '24px 0',
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
