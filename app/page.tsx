"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { education } from "../data/education";
import { experiences } from "../data/experiences";
import { skillCategories } from "../data/skills";
import { hobbies } from "../data/hobbies";
import { SkillBadge } from "../components/ui/SkillBadge";

export default function HomePage() {
  const latestExperiences = experiences.slice(0, 3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Éléments décoratifs animés */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-brand/30 rounded-full animate-float" />
        <div className="particle absolute top-1/3 right-1/3 w-1 h-1 bg-accent-purple/40 rounded-full animate-float" />
        <div className="particle absolute bottom-1/3 left-1/2 w-3 h-3 bg-accent-pink/20 rounded-full animate-float" />
        <div className="particle absolute top-2/3 right-1/4 w-2 h-2 bg-accent-emerald/30 rounded-full animate-float" />

        {/* Formes géométriques décoratives */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-brand/20 rounded-full animate-float" style={{ animationDelay: '-1s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-accent-purple/20 rotate-45 animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-brand/10 to-accent-blue/10 rounded-lg animate-float" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="relative space-y-20 lg:space-y-24">
        {/* Hero Section Redessinée */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-accent-purple/5" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Colonne principale avec contenu */}
            <div className={`space-y-8 ${mounted ? 'animate-slide-in-left' : ''}`}>
              {/* Titre principal avec effet typographique */}
              <div className="space-y-4">
                <p className="text-base font-medium text-slate-400 tracking-wide">
                  {profile.location}
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-50 via-slate-100 to-slate-300 sm:text-5xl lg:text-6xl xl:text-7xl">
                  {profile.name.split(' ').map((word, index) => (
                    <span key={index} className="block sm:inline">
                      {word}
                      {index < profile.name.split(' ').length - 1 && <br className="sm:hidden" />}
                      {index < profile.name.split(' ').length - 1 && ' '}
                    </span>
                  ))}
                </h1>
                <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light lg:text-2xl">
                  {profile.title}
                </p>
              </div>

              {/* Description avec meilleure hiérarchie */}
              <div className="space-y-4 max-w-2xl">
                <p className="text-lg text-slate-300 leading-relaxed">
                  {profile.shortBio}
                </p>
                <p className="text-base text-slate-400 leading-relaxed">
                  {profile.secondaryBio}
                </p>
              </div>

              {/* Boutons d'action redesignés */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/experiences" className="btn-primary group">
                  <span>Voir mon parcours</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/projets" className="btn-outline group">
                  <span>Explorer mes projets & labs</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </div>

              {/* Informations de contact redesignées */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <Link
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 hover:text-brand transition-colors group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {profile.email}
                </Link>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {profile.phone}
                </div>
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-brand transition-colors group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Link>
              </div>
            </div>

            {/* Carte latérale redesignée avec effets avancés */}
            <div className={`relative ${mounted ? 'animate-slide-in-up' : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className="card-glass relative overflow-hidden group">
                {/* Effets de lumière et particules */}
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-brand/40 to-accent-purple/30 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-tr from-accent-pink/30 to-accent-blue/30 blur-2xl group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand/5 to-accent-purple/5" />

                {/* Forme géométrique décorative */}
                <div className="absolute top-4 right-4 w-20 h-20 border border-brand/30 rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-accent-emerald/20 to-accent-blue/20 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />

                <div className="relative space-y-6">
                  {/* Titre de section */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200">Focus cybersécurité</h3>
                  </div>

                  {/* Liste des spécialités avec icônes */}
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-brand" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">
                        Tests d'intrusion, analyse de vulnérabilités et renforcement des systèmes
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-accent-purple" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">
                        Mise en place de labs Proxmox pour expérimenter dans des environnements isolés
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent-pink/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">
                        Culture GRC, investigation d'incidents et threat intelligence
                      </span>
                    </li>
                  </ul>

                  {/* Compétences clés */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-medium">
                      Compétences clés
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillCategories[0]?.skills.slice(0, 4).map((s, index) => (
                        <div key={s.name} className={`animate-slide-in-up`} style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                          <SkillBadge>{s.name}</SkillBadge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Formation redesignée */}
        <section id="formation" className={`space-y-8 ${mounted ? 'animate-slide-in-up' : ''}`} style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">Formation</h2>
                <p className="text-slate-400 mt-1">Parcours académique et certifications</p>
              </div>
            </div>
            <Link
              href="/experiences"
              className="group flex items-center gap-2 text-sm text-slate-400 hover:text-brand transition-colors"
            >
              <span>Voir la timeline complète</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {education.map((edu) => (
              <div key={edu.id} className="card-glass p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand/20 to-accent-purple/20 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-50">{edu.title}</h3>
                      <p className="text-xs text-slate-400">{edu.school} • {edu.level}</p>
                      <p className="text-xs text-slate-500 mt-1">{edu.location}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-400 bg-slate-800/60 px-4 py-2 rounded-full whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Expériences redesignée */}
        <section id="experiences" className={`space-y-8 ${mounted ? 'animate-slide-in-up' : ''}`} style={{ animationDelay: '0.9s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-emerald to-accent-blue flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V8a2 2 0 002 2h4a2 2 0 002-2V6" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">Expériences récentes</h2>
                <p className="text-slate-400 mt-1">Mon parcours professionnel en cybersécurité</p>
              </div>
            </div>
            <Link href="/experiences" className="btn-outline">
              <span>Voir toutes les expériences</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestExperiences.map((exp) => (
              <div
                key={exp.id}
                className={`card-glass group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-orange/20 to-accent-pink/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-50 mb-2 group-hover:text-accent-orange transition-colors">
                  {exp.role}
                </h3>

                <div className="space-y-1 text-sm text-slate-400 mb-4">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {exp.company}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {exp.location}
                  </p>
                </div>

                <ul className="space-y-2">
                  {exp.highlights.slice(0, 2).map((h, hIndex) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand/60 mt-2 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section Projets redesignée */}
        <section id="projets" className={`space-y-8 ${mounted ? 'animate-slide-in-up' : ''}`} style={{ animationDelay: '1.2s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-purple flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">Projets & Labs</h2>
                <p className="text-slate-400 mt-1">Environnements de test et expérimentations</p>
              </div>
            </div>
            <Link href="/projets" className="btn-outline">
              <span>Découvrir les projets</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
          </div>

          <div className="card-glass p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-50">Infrastructure Proxmox</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Virtualisation et gestion d'environnements de test sécurisés pour les expérimentations en cybersécurité.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-50">Plateformes CTF</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Challenges sur Root Me, TryHackMe et autres plateformes pour maintenir et développer les compétences techniques.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-emerald/20 to-accent-blue/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-50">Projets créatifs</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Mélange de technique et de création pour rester curieux et opérationnel dans le domaine de la cybersécurité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section À propos redesignée */}
        <section id="a-propos" className={`space-y-8 ${mounted ? 'animate-slide-in-up' : ''}`} style={{ animationDelay: '1.5s' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-orange to-accent-pink flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">À propos & centres d'intérêt</h2>
              <p className="text-slate-400 mt-1">Ma vision et mes passions</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card-glass p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand/20 to-accent-purple/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-50">Mon approche</h3>
                </div>

                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    Je construis progressivement un profil d'ingénieur cybersécurité capable de comprendre les enjeux métiers,
                    d'identifier les risques et de proposer des solutions pragmatiques.
                  </p>
                  <p>
                    J'apprécie particulièrement les environnements où l'on peut combiner technique, pédagogie et accompagnement des équipes.
                  </p>
                  <p>
                    Mon objectif est de devenir un professionnel polyvalent capable d'évoluer dans des contextes variés,
                    tout en gardant une curiosité technique intacte et une capacité d'adaptation aux nouvelles menaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-glass p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-emerald/20 to-accent-blue/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-50">Centres d'intérêt</h3>
                </div>

                <div className="grid gap-3">
                  {hobbies.map((hobby, index) => (
                    <div
                      key={hobby.id}
                      className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 hover:from-accent-emerald/10 hover:to-accent-blue/10 transition-all duration-300 group ${mounted ? 'animate-slide-in-left' : ''}`}
                      style={{ animationDelay: `${1.7 + index * 0.1}s` }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-emerald/20 to-accent-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-sm font-semibold text-accent-emerald">{hobby.emoji}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-300 group-hover:text-slate-50 transition-colors">
                        {hobby.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
