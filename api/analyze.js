export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://pierredopa.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { offer } = req.body || {};
  if (!offer || offer.trim().length < 40) {
    return res.status(400).json({ error: 'Offre trop courte' });
  }

  const prompt = `Tu es un expert en recrutement et rédaction d'offres d'emploi. Analyse l'offre selon 4 dimensions :
- Transparence : salaire affiché, modalités de travail, clarté du processus.
- Accessibilité : nombre de critères raisonnable, distinction requis/souhaitable, équilibre offre/attentes.
- Langage : pas de termes genrés ni de jargon vide ("chasseur", "talent", "ninja"), posture respectueuse.
- Contexte : équipe décrite, quotidien réel du poste, éléments concrets plutôt que slogans.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte ni markdown autour, structuré exactement ainsi :
{"scoreGlobal":<0-100>,"verdict":"<phrase courte et percutante>","dimensions":[{"nom":"Transparence","score":<0-100>,"commentaire":"<une phrase>"},{"nom":"Accessibilité","score":<0-100>,"commentaire":"<une phrase>"},{"nom":"Langage","score":<0-100>,"commentaire":"<une phrase>"},{"nom":"Contexte","score":<0-100>,"commentaire":"<une phrase>"}],"pointsFaibles":[{"titre":"<3-5 mots>","probleme":"<concret, une phrase>","action":"<action prioritaire, une phrase>"}],"profilsExclus":[{"icone":"<un emoji>","profil":"<type de candidat, termes humains>","raison":"<pourquoi, une phrase>"}]}

Contraintes : 2 ou 3 pointsFaibles (du plus au moins impactant), 2 ou 3 profilsExclus. Phrases courtes et concrètes. Tout en français.

OFFRE :
"""${offer.trim()}"""`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      console.error('Anthropic error:', err);
      return res.status(502).json({ error: 'Erreur API' });
    }

    const data = await r.json();
    const text = data.content?.[0]?.text || '';
    return res.status(200).json({ text });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
