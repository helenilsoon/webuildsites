import nodemailer from "nodemailer";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendProposalEmail(
  to: string,
  proposal: string
) {
  const rawHtml = await marked(proposal);
  const htmlContent = sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'hr', 'u', 'span']),
    allowedAttributes: {
      '*': ['style', 'class'],
      a: ['href', 'target'],
    },
  });

  await transporter.sendMail({
    from: `"WebuildSites 🚀" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Sua Proposta WebuildSites",
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2>Proposta Comercial</h2>
        <div style="white-space: pre-wrap; font-size:14px;">
          ${htmlContent}
          <hr/>
        </div>
      </div>
    `,
  });
}
