import { Html, Head, Body, Container, Section, Text, Hr, Img, Link, Row, Column } from '@react-email/components';
import path from 'path';

interface EmailLayoutProps {
    children: React.ReactNode;
    previewText?: string;
}

export function EmailLayout({ children, previewText }: EmailLayoutProps) {
    const logoSrc = `https://raw.githubusercontent.com/anomalyco/nextjs-myfirstproyect/main/src/assets/logotipo.png`;

    return (
        <Html>
            <Head>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                `}</style>
            </Head>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    <Section style={headerSection}>
                        <Row>
                            <Column style={logoColumnStyle}>
                                <div style={logoBackgroundStyle}>
                                    <Img
                                        src='https://keystone.net.ve/wp-content/uploads/2024/01/logotipo.png'
                                        alt="Keystone"
                                        width="160"
                                        style={logoStyle}
                                    />
                                </div>
                            </Column>
                        </Row>
                        <Text style={subtitle}>Sistema de Solicitudes</Text>
                    </Section>
                    <Section style={contentSection}>
                        {children}
                    </Section>
                    <Hr style={hrStyle} />
                    <Section style={footerSection}>
                        <Text style={footerText}>
                            Este correo fue enviado desde el sistema de solicitudes de Keystone.
                        </Text>
                        <Link href="https://keystone.net.ve" style={linkStyle}>
                            www.keystone.net.ve
                        </Link>
                        <Text style={footerSmall}>
                            © 2026 Keystone. Todos los derechos reservados.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const bodyStyle: React.CSSProperties = {
    backgroundColor: '#f8fafc',
    fontFamily: '"Inter", Arial, sans-serif',
};

const containerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    margin: '40px auto',
    padding: '0',
    maxWidth: '600px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
};

const headerSection: React.CSSProperties = {
    backgroundColor: '#dc2626',
    borderRadius: '16px 16px 0 0',
    padding: '40px 32px 32px 32px',
    textAlign: 'center' as const,
};

const logoBackgroundStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px 24px',
    display: 'inline-block',
    marginBottom: '16px',
};

const logoColumnStyle: React.CSSProperties = {
    textAlign: 'center' as const,
};

const logoStyle: React.CSSProperties = {
    margin: '0 auto',
    display: 'block',
    height: 'auto',
};

const subtitle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '15px',
    margin: '0',
    fontWeight: '500',
    letterSpacing: '0.5px',
};

const contentSection: React.CSSProperties = {
    padding: '40px 32px',
};

const hrStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid #f1f5f9',
    margin: '0 32px',
};

const footerSection: React.CSSProperties = {
    padding: '28px 32px',
    textAlign: 'center' as const,
    backgroundColor: '#fafafa',
};

const footerText: React.CSSProperties = {
    color: '#64748b',
    fontSize: '14px',
    margin: '0 0 8px 0',
};

const linkStyle: React.CSSProperties = {
    color: '#dc2626',
    fontSize: '14px',
    margin: '0 0 8px 0',
    display: 'block',
    textDecoration: 'none',
    fontWeight: '500',
};

const footerSmall: React.CSSProperties = {
    color: '#94a3b8',
    fontSize: '12px',
    margin: '0',
};
