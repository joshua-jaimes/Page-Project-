require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`>>> [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.static('.'));

app.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    
    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: 'Recycle Life', email: 'jefersonrojast1101@gmail.com' },
            to: [{ email: email }],
            subject: 'Welcome to Recycle Life! 🌿',
            htmlContent: `<h1>Welcome!</h1><p>Thanks for joining with: ${email}</p>`
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({ success: true });
    } catch (error) {
        // CAPTURAMOS EL ERROR REAL DE BREVO
        const errorDetail = error.response ? error.response.data.message : error.message;
        console.error('Error de Brevo:', errorDetail);
        
        // Lo enviamos al frontend para verlo en el alert()
        res.status(500).json({ 
            success: false, 
            error: errorDetail 
        });
    }
});



app.post('/login', async (req, res) => {
    const { email } = req.body;
    
    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: 'Recycle Life', email: 'jefersonrojast1101@gmail.com' },
            to: [{ email: email }],
            subject: 'Welcome to Recycle Life! 🌿',
           htmlContent: `
  <h1>Welcome to the Green Team! 🌍</h1>
  <p>Your login was successful. Ready to help the planet and win prizes?</p>
  
  <h3>How it works:</h3>
  <ul>
    <li><b>Upload:</b> Share photos of the trash you collected and how you separated it.</li>
    <li><b>Earn:</b> Get points for every valid photo you upload.</li>
    <li><b>Win:</b> Weekly prizes for the best recyclers in San Gil!</li>
  </ul>
  
  <p>The San Gil trash trucks are coming—show us your separation skills and let's save the planet together!</p>
  
  <p><i>Account: ${email}</i></p>
`
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({ success: true });
    } catch (error) {
        // CAPTURAMOS EL ERROR REAL DE BREVO
        const errorDetail = error.response ? error.response.data.message : error.message;
        console.error('Error de Brevo:', errorDetail);
        
        // Lo enviamos al frontend para verlo en el alert()
        res.status(500).json({ 
            success: false, 
            error: errorDetail 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
