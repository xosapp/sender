const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();
app.use(express.json({limit: '1mb'}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.post('/verify', (req, res) => {
    console.log(req.body);
    let infos = {
        infos: `${req.body.name}, ${req.body.city}`
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'xosappgame@gmail.com',
          pass: `${process.env.API_PASSWORD}`
        }
    });

    var mailOptions = {
        from: 'noreply-xos@gmail.com',
        to: `${req.body.name}`,
        subject: 'Email Confirmation➡️',
        /*html: htmlContent*/
        text: 'Hello, your code is : XYZABC'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.json({
                body: error
            })
        }
        else{
            console.log('Email sent: ' + info.response);
            res.json({
                body: `'Email sent: ${info.response}`
            });
        }
    });
    
    //res.json(infos);
})