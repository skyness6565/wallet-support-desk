import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  CheckCircle,
  ChevronRight,
  Coins,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageCircle,
  Search,
  Send,
  Shield,
  Wallet,
  Wrench,
  ArrowRightLeft,
} from "lucide-react";
import { useMemo, useState } from "react";

import walletHero from "@/assets/wallet-hero.png";
import supportIllustration from "@/assets/support-illustration.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Crypto Wallet Help Center" },
      {
        name: "description",
        content:
          "Independent crypto wallet support center. Browse help topics, learn about wallet security, transactions, fees, and contact support safely.",
      },
      { property: "og:title", content: "Crypto Wallet Help Center" },
      {
        property: "og:description",
        content:
          "Independent support and help resources for crypto wallet users.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const categories = [
  {
    id: "wallet-account",
    title: "Wallet & Account Help",
    description: "Create, back up, restore, and manage your wallet.",
    icon: Wallet,
    topics: [
      "How do I create a new wallet?",
      "Backing up your wallet safely",
      "Restoring from a recovery phrase",
      "Switching between wallets",
    ],
  },
  {
    id: "transactions",
    title: "Transactions",
    description: "Track, confirm, and understand your transaction history.",
    icon: ArrowRightLeft,
    topics: [
      "Why is my transaction pending?",
      "How to check transaction status",
      "Failed or dropped transactions",
      "Understanding transaction hashes",
    ],
  },
  {
    id: "sending-receiving",
    title: "Sending & Receiving Crypto",
    description: "Move assets in and out of your wallet with confidence.",
    icon: Send,
    topics: [
      "How to send crypto",
      "How to receive crypto",
      "Using QR codes for transfers",
      "Supported networks and tokens",
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Protect your assets and recognize common threats.",
    icon: Shield,
    topics: [
      "How to keep your recovery phrase safe",
      "Avoiding phishing scams",
      "Recognizing fake support messages",
      "Device security tips",
    ],
  },
  {
    id: "network-fees",
    title: "Network Fees",
    description: "Learn why fees vary and how they are calculated.",
    icon: BadgeDollarSign,
    topics: [
      "Why do network fees change?",
      "Choosing the right gas fee",
      "Fee estimation explained",
      "Reducing transaction costs",
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Fix common errors, sync issues, and app crashes.",
    icon: Wrench,
    topics: [
      "App won't open or crashes",
      "Balance not showing correctly",
      "Tokens missing from wallet",
      "Network connection issues",
    ],
  },
  {
    id: "token-assets",
    title: "Token & Asset Issues",
    description: "Manage tokens, NFTs, and unsupported assets.",
    icon: Coins,
    topics: [
      "Adding a custom token",
      "Token price not displayed",
      "What to do if a token is unsupported",
      "NFT visibility issues",
    ],
  },
  {
    id: "general",
    title: "General Questions",
    description: "Answers to frequently asked questions and getting started.",
    icon: HelpCircle,
    topics: [
      "What is a crypto wallet?",
      "Supported blockchains",
      "Wallet app updates",
      "Language and region settings",
    ],
  },
];

const popularTopics = [
  "How to back up your wallet",
  "Recovering a lost wallet",
  "Transaction pending for a long time",
  "Why your token balance may be zero",
  "Avoiding recovery phrase scams",
  "How to contact support safely",
];

export default function Index() {
  const [search, setSearch] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter(
      (cat) =>
        cat.title.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query) ||
        cat.topics.some((topic) => topic.toLowerCase().includes(query))
    );
  }, [search]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      return;
    }
    setFormStatus("success");
    setFormData({ name: "", email: "", description: "" });
    window.setTimeout(() => setFormStatus("idle"), 5000);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container-center flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-foreground">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-sm">
              <Wallet className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="hidden text-lg sm:inline">Help Center</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#categories" className="text-muted-foreground transition-colors hover:text-foreground">
              Help Topics
            </a>
            <a href="#popular" className="text-muted-foreground transition-colors hover:text-foreground">
              Popular
            </a>
            <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-ring"
            >
              <LifeBuoy className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Contact Support</span>
              <span className="sm:hidden">Support</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden gradient-hero py-16 sm:py-24 lg:py-32">
          <div className="container-center grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                Independent wallet support resources
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Welcome to the <span className="text-gradient">Wallet Help Center</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Find answers, explore support topics, and learn how to use your crypto wallet safely. This is an independent help page, not an official Trust Wallet site.
              </p>

              <div className="mt-8">
                <label htmlFor="hero-search" className="sr-only">
                  Search help articles
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <input
                    id="hero-search"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="How can we help?"
                    className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-foreground shadow-card placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 focus-ring"
                >
                  Browse Help Center
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted focus-ring"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Contact Support
                </button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                We will never ask for your recovery phrase, private keys, or passwords.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-accent/10 to-transparent blur-2xl" aria-hidden="true" />
              <img
                src={walletHero}
                alt="Illustration of a secure cryptocurrency wallet app on a phone"
                width={1536}
                height={1024}
                className="relative z-10 w-full rounded-3xl object-cover shadow-soft"
                priority="true"
              />
            </div>
          </div>
        </section>

        <section id="categories" className="py-16 sm:py-24">
          <div className="container-center">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Browse support categories</h2>
              <p className="mt-4 text-muted-foreground">
                Pick a topic to find step-by-step guides and answers to common questions.
              </p>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <Search className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden="true" />
                <p className="mt-4 font-medium text-foreground">No categories match your search.</p>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-3 text-sm font-semibold text-primary hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {filteredCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <article
                      key={category.id}
                      className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky text-sky-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-foreground">{category.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                      <ul className="mt-4 space-y-2">
                        {category.topics.slice(0, 3).map((topic) => (
                          <li key={topic} className="flex items-start gap-2 text-sm text-foreground">
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="overflow-hidden border-y border-border bg-secondary/50 py-16 sm:py-24">
          <div className="container-center grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <img
                src={supportIllustration}
                alt="Friendly support agent helping a user through a chat conversation"
                width={1536}
                height={1024}
                loading="lazy"
                className="w-full rounded-3xl object-cover shadow-soft"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Friendly support, focused on your safety
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our independent support team is here to answer general wallet questions and guide you toward safe, self-custody practices.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Fast responses to common wallet questions",
                  "Security-first guidance without asking for sensitive data",
                  "Clear help articles for every experience level",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-mint-foreground">
                      <CheckCircle className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={scrollToContact}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 focus-ring"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section id="popular" className="py-16 sm:py-24">
          <div className="container-center">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Popular help topics</h2>
              <p className="mt-4 text-muted-foreground">Quick links to the articles our visitors read most.</p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularTopics.map((topic) => (
                <a
                  key={topic}
                  href="#categories"
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition hover:border-primary/30 hover:bg-muted focus-ring"
                >
                  <span className="font-medium text-foreground">{topic}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 sm:py-24">
          <div className="container-center">
            <div className="mx-auto grid max-w-5xl gap-10 rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact Support</h2>
                <p className="mt-4 text-muted-foreground">
                  Tell us a little about your issue and we'll get back to you. We only need basic information — never your recovery phrase or private keys.
                </p>

                <div className="mt-8 rounded-2xl border border-warning/30 bg-warning/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-warning-foreground">Security reminder</h3>
                      <p className="mt-1 text-sm leading-relaxed text-warning-foreground/90">
                        Legitimate support will never ask for your recovery phrase, private keys, passwords, or ask you to send funds. If someone does, it's a scam.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                    support@example-help-center.com
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                    Live chat available during business hours
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                {formStatus === "success" ? (
                  <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-success" aria-hidden="true" />
                    <h3 className="mt-4 text-xl font-bold text-success-foreground">Message received</h3>
                    <p className="mt-2 text-sm text-success-foreground/90">
                      Thanks for reaching out. Our team will respond as soon as possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormStatus("idle")}
                      className="mt-6 rounded-lg border border-success/40 px-5 py-2 text-sm font-semibold text-success-foreground transition hover:bg-success/20"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="mb-2 block text-sm font-medium text-foreground">
                        How can we help?
                      </label>
                      <textarea
                        id="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        className="w-full resize-none rounded-xl border border-border bg-background p-4 text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                        placeholder="Describe your issue or question..."
                      />
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Do not include recovery phrases, private keys, passwords, or wallet addresses. We cannot process sensitive wallet data.
                    </p>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 focus-ring sm:w-auto"
                    >
                      Send message
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-secondary py-12">
        <div className="container-center">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5 font-bold text-foreground">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-sm">
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg">Help Center</span>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="#categories" className="transition hover:text-foreground">Help Center</a>
              <a href="#contact" className="transition hover:text-foreground">Support</a>
              <a href="#" className="transition hover:text-foreground">Privacy</a>
              <a href="#" className="transition hover:text-foreground">Terms</a>
            </nav>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Independent Crypto Wallet Help Center. All rights reserved.</p>
            <p>This is an independent support page and is not affiliated with Trust Wallet or its parent company.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
