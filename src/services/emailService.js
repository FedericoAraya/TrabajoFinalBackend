import nodemailer from "nodemailer";
import mailgen from "mailgen";

const emailService = {
  sendPasswordResetEmail: async (toEmail, resetLink) => {
    const MailGenerator = new mailgen({
      theme: "default",
      product: {
        name: "Asgard",
        link: "https://www.coderhouse.com",
      },
    });

    const emailContent = {
      body: {
        intro: "¡Hola!",
        action: {
          instructions:
            "Enviamos el siguiente enlace para restablecer tu password",
          button: {
            text: "Restablecer password",
            link: resetLink,
          },
        },
        outro:
          "En caso de no haberlo solicitado, desestima este mensaje.",
        signature: "Asgard",
      },
    };

    const emailText = MailGenerator.generatePlaintext(emailContent);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const message = {
      from: process.env.GMAIL_USER,
      to: toEmail,
      subject: "Restablecer Password",
      html: MailGenerator.generate(emailContent),
      text: emailText,
    };

    try {
      await transporter.sendMail(message);
    } catch (error) {}
  },
};

export default emailService;
