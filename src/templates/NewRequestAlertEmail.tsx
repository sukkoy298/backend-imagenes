import { Text, Section, Button, Hr } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

interface NewRequestAlertEmailProps {
    managerName: string;
    employeeName: string;
    employeeEmail: string;
    requestType: string;
    requestId: string;
    description?: string;
    appUrl?: string;
}

export function NewRequestAlertEmail({
    managerName,
    employeeName,
    employeeEmail,
    requestType,
    requestId,
    description,
    appUrl: appUrlProp
}: NewRequestAlertEmailProps) {
    return (
        <EmailLayout previewText={`Nueva solicitud de ${requestType} de ${employeeName}`}>
            <Section style={sectionStyle}>
                <Text style={greetingText}>¡Hola, {managerName}!</Text>
                <Text style={introText}>
                    Se ha creado una nueva solicitud que requiere tu revisión:
                </Text>
            </Section>

            <Section style={cardStyle}>
                <Text style={cardTitleStyle}>📋 Nueva Solicitud Pendiente</Text>

                <Hr style={hrStyle} />

                <Text style={labelStyle}>Empleado:</Text>
                <Text style={valueStyle}>{employeeName}</Text>

                <Text style={labelStyle}>Correo:</Text>
                <Text style={valueStyle}>{employeeEmail}</Text>

                <Text style={labelStyle}>Tipo de Solicitud:</Text>
                <Text style={valueStyle}>{requestType}</Text>

                {description && (
                    <>
                        <Text style={labelStyle}>Descripción:</Text>
                        <Text style={descriptionStyle}>{description}</Text>
                    </>
                )}

                <Hr style={hrStyle} />

                <Text style={idStyle}>ID de Solicitud: {requestId}</Text>
            </Section>

            <Section style={sectionStyle}>
                <Text style={introText}>
                    Ingresa al sistema para revisar y gestionar esta solicitud.
                </Text>
            </Section>

            <Section style={ctaSection}>
                <Button style={buttonStyle} href={appUrlProp || process.env.APP_URL || 'http://localhost:3000'}>
                    Revisar Solicitud
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

const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    margin: '0 0 4px 0',
};

const valueStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#1f2937',
    margin: '0 0 16px 0',
};

const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '6px',
};

const idStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#9ca3af',
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
