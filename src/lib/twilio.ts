import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const from = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";

export async function sendWhatsApp(to: string, body: string) {
  return client.messages.create({
    from,
    to: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
    body,
  });
}
