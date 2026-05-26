import { Router, Request, Response } from "express";
import { render } from "@react-email/components";
import { transporter } from "../lib/mailer";

import { GreetingEmail } from "../templates/GreetingEmail";
import { NotificationEmail } from "../templates/NotificationEmail";
import { PasswordRecoveryEmail } from "../templates/PasswordRecoveryEmail";
import { CustomEmail } from "../templates/CustomEmail";
import { RequestStatusEmail } from "../templates/RequestStatusEmail";
import { NewRequestAlertEmail } from "../templates/NewRequestAlertEmail";
import { EmployeeUpdateEmail } from "../templates/EmployeeUpdate";
import { ProfileUpdateAlertEmail } from "../templates/ProfileUpdateAlertEmail";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Email request received:`, { type: req.body.type, to: req.body.email });
  
  try {
    const {
      type,
      name,
      email,
      message,
      resetToken,
      subject,
      requestType,
      status,
      reason,
      additionalInfo,
      personalId,
      employeeName,
      employeeEmail,
      requestId,
      updatedFields,
      updateDate,
    } = req.body;

    if (!email) {
      console.log(`[${Date.now() - startTime}ms] Missing email address`);
      res.status(400).json({ status: "error", message: "Email requerido" });
      return;
    }

    console.log(`[${Date.now() - startTime}ms] Starting template render...`);
    
    let htmlContent: string;
    let emailSubject: string;

    switch (type) {
      case "greeting":
        htmlContent = await render(GreetingEmail({ name, personalId }));
        emailSubject = "Bienvenido al sistema de solicitudes";
        break;
      case "employeeUpdate":
        htmlContent = await render(EmployeeUpdateEmail({ name, subject: subject || "Notificación", message: message || "" }));
        emailSubject = subject || "Notificación";
        break;
      case "notification":
        htmlContent = await render(NotificationEmail({
          name,
          subject: subject || "Nueva notificación",
          message: message || "Tienes una nueva notificación.",
        }));
        emailSubject = subject || "Nueva notificación";
        break;
      case "passwordRecovery":
        htmlContent = await render(PasswordRecoveryEmail({ name, resetToken: resetToken || "" }));
        emailSubject = "Recuperación de contraseña";
        break;
      case "custom":
        htmlContent = await render(CustomEmail({ name, subject: subject || "Notificación", message: message || "" }));
        emailSubject = subject || "Notificación";
        break;
      case "requestStatus":
        if (!status || !["EN_REVISION", "APROBADA", "RECHAZADA"].includes(status)) {
          res.status(400).json({ status: "error", message: "Estado inválido para notificación" });
          return;
        }
        htmlContent = await render(RequestStatusEmail({
          name,
          requestType: requestType || "Solicitud",
          status,
          reason,
          additionalInfo,
        }));
        emailSubject = `Estado de tu solicitud: ${status === "EN_REVISION" ? "En Revisión" : status === "APROBADA" ? "Aprobada" : "Rechazada"}`;
        break;
      case "newRequestAlert":
        htmlContent = await render(NewRequestAlertEmail({
          managerName: name || "Gerente",
          employeeName: employeeName || "Empleado",
          employeeEmail: employeeEmail || "",
          requestType: requestType || "Solicitud",
          requestId: requestId || "",
          description: message,
        }));
        emailSubject = `Nueva solicitud pendiente de revisión: ${requestType || "Solicitud"}`;
        break;
      case "profileUpdate":
        htmlContent = await render(ProfileUpdateAlertEmail({
          managerName: name || "Gerente",
          employeeName: employeeName || "Empleado",
          employeeEmail: employeeEmail || "",
          updatedFields: updatedFields || [],
          updateDate: updateDate || new Date().toLocaleDateString("es-VE"),
        }));
        emailSubject = `Actualización de datos personales: ${employeeName || "Empleado"}`;
        break;
      default:
        htmlContent = await render(NotificationEmail({ name, subject: "Notificación", message: message || "" }));
        emailSubject = "Notificación";
    }

    console.log(`[${Date.now() - startTime}ms] Template rendered successfully (${htmlContent.length} chars)`);

    const messageConfig = {
      from: `Equipo de Gestion Humana <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: emailSubject,
      html: htmlContent,
    };

    console.log(`[${Date.now() - startTime}ms] Sending email via SMTP...`);
    
    // Timeout de 15 segundos para sendMail
    const sendMailPromise = transporter.sendMail(messageConfig);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("SMTP timeout - 15s")), 15000);
    });
    
    await Promise.race([sendMailPromise, timeoutPromise]);
    
    console.log(`[${Date.now() - startTime}ms] Email sent successfully`);
    res.status(200).json({ status: "success", message: "Email sent successfully" });
  } catch (err: any) {
    console.error(`[${Date.now() - startTime}ms] Email error:`, err);
    res.status(500).json({ status: "error", message: err.message || "Error al enviar email" });
  }
});

export default router;
