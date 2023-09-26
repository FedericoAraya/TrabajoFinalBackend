import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mailgen from 'mailgen'

dotenv.config();

class TicketService {
  async generateTicket(ticketDetails, userEmail) {
    const MailGenerator = new mailgen({
      theme: 'default',
      product: {
        name: 'ASGARD',
        link: 'http://www.coderhouse.com'
      }
    });

    const response = {
      body: {
        intro: 'Factura de compra',
        table: {
          data: [
            {
              item: 'Código',
              description: ticketDetails.code,
              price: '',
            },
            {
              item: 'Fecha de compra',
              description: ticketDetails.purchase_datetime.toISOString(),
              price: '',
            },
            {
              item: 'Monto',
              description: `${ticketDetails.amount} USD`,
              price: '',
            },
            {
              item: 'Comprador',
              description: ticketDetails.purchaser,
              price: '',
            },
          ],
        },
        outro: 'Gracias por tu compra!'
      }
    };

    const mail = MailGenerator.generate(response);
    const config = {
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    };
    
    try {
      const transporter = nodemailer.createTransport(config);
      const message = {
        from: process.env.GMAIL_USER,
        to: userEmail,
        subject: "¡Confirmación de compra ASGARD!",
        html: mail,
      };

      await transporter.sendMail(message);
    } catch (error) {
    }

    return response;
  }
}

const ticketService = new TicketService();
export default ticketService;
