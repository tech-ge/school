import Link from 'next/link';
import { GraduationCap, Sparkles, ShieldCheck, Zap, Users, Award, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-16 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
            <GraduationCap className="w-6 h-6 text-black" />
          </div>
          <span className="font-display text-2xl gold-text tracking-wide">TechGeo</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#features" className="hover:text-gold transition">Features</a>
          <a href="#about" className="hover:text-gold transition">About</a>
          <a href="#contact" className="hover:text-gold transition">Contact</a>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="btn-ghost text-sm">Sign In</Link>
          <Link href="/register" className="btn-gold text-sm">Enroll Now</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-16 pt-16 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-gold mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ranked #1 in Innovation • 2026</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 animate-slide-up">
          Where <span className="gold-text">Legends</span> Are<br />
          Forged in Excellence
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-white/60 mb-12 animate-fade-in">
          TechGeo University blends elite academics with cutting-edge technology —
          a campus experience engineered for the world&apos;s next generation of pioneers.
        </p>

        <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
          <Link href="/register" className="btn-gold flex items-center gap-2">
            Begin Your Journey <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/login" className="btn-ghost">Explore Portal</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-24">
          {[
            { label: 'Students', value: '12K+' },
            { label: 'Faculty', value: '850+' },
            { label: 'Programs', value: '120+' },
            { label: 'Global Rank', value: '#12' },
          ].map((s, i) => (
            <div key={i} className="glass glass-hover p-6 rounded-2xl">
              <div className="font-display text-4xl gold-text mb-2">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 md:px-16 py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Engineered for <span className="gold-text">Excellence</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Every module crafted to elevate the academic journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: ShieldCheck, title: 'Secure Payments', desc: 'Paystack-powered instant fee settlement with bank-grade encryption.' },
            { icon: Zap, title: 'Real-Time Analytics', desc: 'Live dashboards for students, faculty, and administration.' },
            { icon: Users, title: 'Unified Portal', desc: 'One platform for admissions, classes, grades, and communication.' },
            { icon: Award, title: 'Accredited Programs', desc: 'Globally recognized degrees across 8 faculties.' },
            { icon: Sparkles, title: 'AI Tutor', desc: 'Personalized study companions driven by machine learning.' },
            { icon: GraduationCap, title: 'Alumni Network', desc: 'Connect with 40,000+ graduates across 90 countries.' },
          ].map((f, i) => (
            <div key={i} className="glass glass-hover card-hover p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
                <f.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-xl mb-3">{f.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="relative z-10 px-6 md:px-16 py-24">
        <div className="glass max-w-4xl mx-auto p-12 md:p-16 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px shimmer-line" />
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Your Future <span className="gold-text">Starts Here</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Join thousands of ambitious scholars shaping tomorrow.
          </p>
          <Link href="/register" className="btn-gold inline-flex items-center gap-2">
            Apply for Admission <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="relative z-10 border-t border-bg-border px-6 md:px-16 py-12 text-center text-sm text-muted">
        <div className="font-display text-xl gold-text mb-2">TechGeo University</div>
        <p>© 2026 TechGeo. All rights reserved.</p>
      </footer>
    </main>
  );
}