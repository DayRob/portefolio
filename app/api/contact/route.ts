import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Dans un vrai projet, ici on appellerait un service d'email ou on stockerait en base.
  // Pour ce portfolio, on se contente de logger côté serveur.
  // eslint-disable-next-line no-console
  console.log("Nouveau message de contact reçu:", body);

  return NextResponse.json({ ok: true });
}
