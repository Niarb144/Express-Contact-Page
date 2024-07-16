import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";


const app = express();
const port  = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));
app.use((req, res, next) => {
    res.locals.alert = null;
    next();
  });

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/send", (req, res) =>{
    let u_email = req.body.email;
    let u_subject = req.body.subject;
    let u_message = req.body.message;

    console.log(`email: ${u_email} message: ${u_message}`);
   // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'youremail@example.com', //your registered email
        pass: 'xxxx xxxx xxxx xxxx' //16 digit code
        }
    });

    // Email options
    const mailOptions = {
        from: 'someone@example.com',
        to: 'anyone@example.com',
        email: u_email,
        subject: u_subject,
        text: u_message,
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.locals.alert = { message: 'Email could not be sent.' };
            res.redirect("/");
        console.error('❌ Error:', error.message);
        } else {
        console.log('✅ Email sent:', info.response);
        }
        res.redirect("/#contacts");
    });
});



app.listen(port, ()=>{
    console.log(`Server Listening on ${port}.`);
});