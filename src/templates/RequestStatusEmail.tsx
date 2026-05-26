import { Text, Section, Button, Hr } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

interface RequestStatusEmailProps {
    name: string;
    requestType: string;
    status: 'EN_REVISION' | 'APROBADA' | 'RECHAZADA';
    reason?: string;
    additionalInfo?: string;
}

export function RequestStatusEmail({
    name,
    requestType,
    status,
    reason,
    additionalInfo
}: RequestStatusEmailProps) {
    const statusConfig = {
        EN_REVISION: {
            color: '#d97706',
            bgColor: '#fef3c7',
            borderColor: '#d97706',
            title: 'Solicitud en Revisión',
            subject: `Tu solicitud de ${requestType} está siendo revisada`,
            icon: '🔍',
        },
        APROBADA: {
            color: '#059669',
            bgColor: '#d1fae5',
            borderColor: '#059669',
            title: '¡Solicitud Aprobada!',
            subject: `Tu solicitud de ${requestType} ha sido aprobada`,
            icon: '✅',
        },
        RECHAZADA: {
            color: '#dc2626',
            bgColor: '#fee2e2',
            borderColor: '#dc2626',
            title: 'Solicitud Rechazada',
            subject: `Tu solicitud de ${requestType} ha sido rechazada`,
            icon: '❌',
        },
    };

    const config = statusConfig[status];

    return (
        <EmailLayout previewText={config.subject}>
            <Section style={sectionStyle}>
                <Text style={greetingText}>¡Hola, {name}!</Text>
                <Text style={introText}>
                    Te informamos sobre el estado de tu solicitud:
                </Text>
            </Section>

            <Section style={cardStyle}>
                <Text style={cardTitleStyle}>{config.icon} {config.title}</Text>

                <Hr style={hrStyle} />

                <Text style={requestTypeStyle}>Tipo de Solicitud: <strong>{requestType}</strong></Text>

                {status === 'RECHAZADA' && reason && (
                    <Section style={reasonSectionStyle}>
                        <Text style={reasonTitleStyle}>Motivo del Rechazo:</Text>
                        <Text style={reasonTextStyle}>{reason}</Text>
                    </Section>
                )}

                {status === 'APROBADA' && additionalInfo && (
                    <Section style={infoSectionStyle}>
                        <Text style={infoTitleStyle}>Indicaciones Adicionales:</Text>
                        <Text style={infoTextStyle}>{additionalInfo}</Text>
                    </Section>
                )}
            </Section>

            <Section style={sectionStyle}>
                <Text style={introText}>
                    Ingresa al sistema para ver más detalles.
                </Text>
            </Section>

            <Section style={ctaSection}>
                <Button style={buttonStyle} href={process.env.APP_URL || 'http://localhost:3000'}>
                    Ver Solicitud
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
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    margin: '24px 0',
    border: '1px solid #e5e7eb',
};

const cardTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px 0',
};

const hrStyle = {
    border: 'none',
    borderTop: '1px solid #e5e7eb',
    margin: '16px 0',
};

const requestTypeStyle: React.CSSProperties = {
    fontSize: '15px',
    color: '#4b5563',
    margin: '0 0 8px 0',
};

const reasonSectionStyle: React.CSSProperties = {
    backgroundColor: '#fee2e2',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px',
};

const reasonTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#991b1b',
    margin: '0 0 8px 0',
};

const reasonTextStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#7f1d1d',
    lineHeight: '1.6',
    margin: '0',
};

const infoSectionStyle: React.CSSProperties = {
    backgroundColor: '#d1fae5',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px',
};

const infoTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#065f46',
    margin: '0 0 8px 0',
};

const infoTextStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#064e3b',
    lineHeight: '1.6',
    margin: '0',
};

const ctaSection: React.CSSProperties = {
    textAlign: 'center' as const,
    padding: '16px 0',
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2563eb',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    padding: '14px 32px',
    textDecoration: 'none',
};
