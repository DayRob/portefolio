"use client";

import { FormEvent, useState } from "react";
import { profile } from "../../data/profile";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    };

    try {
      setStatus("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-10 lg:space-y-12">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">
          Contact
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Discutons de votre besoin
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Une alternance, un stage ou un projet cybersécurité ? Envoyez-moi un
          message via ce formulaire ou directement par e-mail.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]">
        <form
          onSubmit={handleSubmit}
          className="card-glass space-y-4"
          autoComplete="off"
        >
          <div>
            <label
              htmlFor="name"
              className="text-xs font-medium text-slate-300"
            >
              Nom
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-brand"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-xs font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-brand"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="text-xs font-medium text-slate-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-brand"
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Envoi..." : "Envoyer le message"}
          </button>
          {status === "success" && (
            <p className="text-xs text-emerald-400">
              Merci ! Le message a été transmis (simulé côté serveur).
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-400">
              Une erreur est survenue. Vous pouvez aussi m’écrire directement à{" "}
              <a
                href={`mailto:${profile.email}`}
                className="underline underline-offset-2"
              >
                {profile.email}
              </a>
              .
            </p>
          )}
        </form>

        <aside className="space-y-4">
          <div className="card-glass space-y-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Coordonnées directes
            </h2>
            <p className="text-sm text-slate-300">
              Email :{" "}
              <a
                href={`mailto:${profile.email}`}
                className="underline-offset-2 hover:text-slate-50 hover:underline"
              >
                {profile.email}
              </a>
            </p>
            <p className="text-sm text-slate-300">Téléphone : {profile.phone}</p>
            <p className="text-sm text-slate-300">
              Localisation : {profile.location}
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
