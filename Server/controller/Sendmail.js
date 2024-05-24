// controller/Sendmail.js

const nodemailer = require("nodemailer");
const randomItem = require("./randomItem");

const sendMail = async (users) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: 'encryptme96@gmail.com',
                pass: 'ynaucobudqotctma'
            },
        });

        const { quote, author } = await randomItem();

        for (let user of users) {
            const mailOptions = {
                from: 'laxmiray013@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: 'Inspirational Quote for Your Day', // Subject line
                html: `
                <div style="font-family: 'Arial', sans-serif; color: #444; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                    <p style="font-size: 16px; margin-bottom: 20px; color: #555;">Hi, ${user.name}</p>
                    <p style="font-size: 16px; margin-bottom: 20px; color: #555;">
                        I hope this message finds you well. Here’s a little inspiration to brighten your day:
                    </p>
                    <blockquote style="border-left: 6px solid #ff6600; margin: 20px 0; padding-left: 15px; font-style: italic; color: #333; background-color: #fff8e1; border-radius: 5px;">
                        <p style="font-size: 18px; margin: 0;">
                            ${quote}
                        </p>
                        <footer style="text-align: right; font-size: 16px; margin-top: 10px; color: #777;">— ${author}</footer>
                    </blockquote>
                    <p style="font-size: 16px; margin-bottom: 20px; color: #555;">Wishing you a wonderful and productive day!</p>
                    <p style="font-size: 16px; color: #555;">Best regards,<br>Bot</p>
                </div>
            `
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.email}`);
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;
