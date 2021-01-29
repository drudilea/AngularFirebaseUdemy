import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Inicializar base de datos
const db = admin.firestore();
const gotyRef = db.collection('goty'); // Coleccion Game of the Year

// ====================================
// Funciones
// ====================================

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.json({ msj: 'Hello from Firebase!' });
});

export const getGoty = functions.https.onRequest(async (request, response) => {
  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map((doc) => doc.data());

  response.json(juegos);
});

// ====================================
// Express Server
// ====================================

const app = express();
app.use(cors({ origin: true }));

app.get('/goty', async (req, res) => {
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map((doc) => doc.data());

  res.json(juegos);
});

app.post('/goty/:id', async (req, res) => {
  const id = req.params.id;
  const gameRef = await gotyRef.doc(id);
  const gameSnap = await gameRef.get();

  if (!gameSnap.exists) {
    res.status(404).json({
      ok: false,
      msj: `No existe un juego con ese id ${id}`,
    });
  } else {
    const gameBefore = gameSnap.data() || { votos: 0 };
    await gameRef.update({ votos: gameBefore.votos + 1 });

    res.json({
      ok: true,
      msj: `Gracias por tu voto a ${gameBefore.name}`,
    });
  }

  res.json();
});

// Incluyo mi servidor express en las Cloud Functions
export const api = functions.https.onRequest(app);
