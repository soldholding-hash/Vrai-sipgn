const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.static(path.join(__dirname)));

app.post('/api/save-visitor-photo', (req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).json({ error: 'Aucune image reçue.' });
    }

    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const filename = `visitor_${Date.now()}.png`;
    const filepath = path.join(__dirname, 'uploads', filename);

    fs.writeFile(filepath, base64Data, 'base64', (err) => {
        if (err) {
            console.error("Erreur lors de l'enregistrement :", err);
            return res.status(500).json({ error: "Erreur serveur." });
        }
        console.log(`[+] Photo enregistrée : ${filename}`);
        res.json({ success: true, message: 'Photo sauvegardée avec succès.' });
    });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
