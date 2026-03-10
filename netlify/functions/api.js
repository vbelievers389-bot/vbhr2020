/* ================= EMAIL ================= */
router.post("/send-mail", async (req, res) => {
  try {
    const { email, name, pdfData } = req.body;

    if (!email || !pdfData) {
      return res.status(400).json({ error: "Missing email or PDF data" });
    }

    // Extract base64 content from data URI
    // Handles format: "data:application/pdf;base64,JVBERi0xLjQK..."
    let base64Content = pdfData;
    
    if (pdfData.includes("base64,")) {
      base64Content = pdfData.split("base64,")[1];
    }

    // Validate that we have content
    if (!base64Content || base64Content.length === 0) {
      return res.status(400).json({ error: "Invalid PDF data format" });
    }

    // Send email with attachment
    await transporter.sendMail({
      from: '"V Believers HR" <vbmarketingpvt.ltd@gmail.com>',
      to: email,
      subject: `Selection Letter - ${name}`,
      html: `
        <h2>Dear ${name},</h2>
        <p>Congratulations!</p>
        <p>We are pleased to inform you that you have been selected at <strong>V Believers Marketing Private Limited</strong>.</p>
        <p>Please find attached the detailed Selection Letter in PDF format, which includes all terms and conditions of your appointment along with other important information.</p>
        <p>You are requested to carefully read the attached document and confirm your acceptance by replying to this email.</p>
        <p>We welcome you to the V Believers family and look forward to a long and successful professional association.</p>
        <br>
        <p><strong>Warm Regards,</strong></p>
        <p><strong>HR Department</strong></p>
        <p>V Believers Marketing Pvt Ltd.</p>
      `,
      attachments: [{
        filename: `${name}_Selection_Letter.pdf`,
        content: Buffer.from(base64Content, 'base64'),
        contentType: 'application/pdf'
      }]
    });

    await Log.create({ action: "EMAIL_SENT", details: email });

    res.json({ message: "Email sent successfully" });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.status(500).json({ error: err.message || "Failed to send email" });
  }
});
