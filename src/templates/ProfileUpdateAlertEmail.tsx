import { Text, Section, Button, Hr } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

interface ProfileUpdateAlertEmailProps {
    managerName: string;
    employeeName: string;
    employeeEmail: string;
    updatedFields: string[];
    updateDate: string;
    appUrl?: string;
}

export function ProfileUpdateAlertEmail({
    managerName,
    employeeName,
    employeeEmail,
    updatedFields,
    updateDate,
    appUrl: appUrlProp
}: ProfileUpdateAlertEmailProps) {
    return (
        <EmailLayout previewText={`Actualización de datos de ${employeeName}`}>
            <Section style={sectionStyle}>
                <Text style={greetingText}>¡Hola, {managerName}!</Text>
                <Text style={introText}>
                    Un empleado ha actualizado sus datos personales en el sistema. A continuación los detalles:
                </Text>
            </Section>

            <Section style={cardStyle}>
                <Text style={cardTitleStyle}>📝 Actualización de Datos Personales</Text>

                <Hr style={hrStyle} />

                <Text style={labelStyle}>Empleado:</Text>
                <Text style={valueStyle}>{employeeName}</Text>

                <Text style={labelStyle}>Correo:</Text>
                <Text style={valueStyle}>{employeeEmail}</Text>

                <Text style={labelStyle}>Fecha de actualización:</Text>
                <Text style={valueStyle}>{updateDate}</Text>

                <Hr style={hrStyle} />

                <Text style={labelStyle}>Campos actualizados:</Text>
                <ul style={fieldsListStyle}>
                    {updatedFields.map((field, index) => (
                        <li key={index} style={fieldItemStyle}>
                            {field}
                        </li>
                    ))}
                </ul>
            </Section>

            <Section style={sectionStyle}>
                <Text style={introText}>
                    Ingresa al sistema si necesitas revisar o validar esta actualización.
                </Text>
            </Section>

            <Section style={ctaSection}>
                <Button style={buttonStyle} href={appUrlProp || process.env.APP_URL || 'http://localhost:3000'}>
                    Ver Empleado
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

const fieldsListStyle: React.CSSProperties = {
    margin: '0',
    paddingLeft: '20px',
};

const fieldItemStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '8px',
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
