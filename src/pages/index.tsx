import type {ReactNode, MouseEvent} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.heroEyebrow}>NieR Re[in]carnation Preservation</p>
        <h1 className={styles.heroTitle}>Lunar Tear</h1>
        <p className={styles.heroSubtitle}>
          A preservation server implementation for The Cage.
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/docs/getting-started">
            Get Started
          </Link>
          <Link className="button button--outline button--lg" to="/docs/intro">
            About the Project
          </Link>
        </div>
      </div>
      <div className={styles.heroOverlay} />
    </header>
  );
}

function Intro() {
  return (
    <section className={styles.intro}>
      <div className="container">
        <p>
          <strong>Lunar Tear</strong> is a fan-made server implementation for{' '}
          <em>NieR Re[in]carnation</em>, the mobile RPG developed by Square Enix and
          Applibot, which shut down its official servers on April 29, 2024.
        </p>
      </div>
    </section>
  );
}

type Feature = {
  icon: string;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: '📖',
    title: 'Quests',
    body: 'Main story quests, EX chapters, event quests, and subjugation battles are all functional.',
  },
  {
    icon: '🎲',
    title: 'Gacha',
    body: 'Pull for costumes and weapons. The gacha system is fully implemented and working.',
  },
  {
    icon: '⚔️',
    title: 'Character & Weapon Management',
    body: 'Enhance, ascend, awaken, and evolve costumes and weapons. Skill levelling, character exalt, and the mythic slab are fully tracked.',
  },
  {
    icon: '🧩',
    title: 'Memoirs & Companions',
    body: 'Memoir enhancement, deck management, companion progression, and deck skins are all supported.',
  },
  {
    icon: '🛒',
    title: 'Shop & Missions',
    body: 'The item shop, mission progress tracking, explore system, and daily rewards work as in the original game.',
  },
  {
    icon: '🌐',
    title: 'Self-Hosted',
    body: 'No central server. Run it on your own machine and connect the game client locally.',
  },
];

function FeatureCard({icon, title, body}: Feature) {
  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget;
    const {left, top, width, height} = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    card.style.setProperty('--mouse-x', `${x * 100}%`);
    card.style.setProperty('--mouse-y', `${y * 100}%`);
  }

  return (
    <div className={styles.featureCard} onMouseMove={onMouseMove}>
      <div className={styles.featureCardSpotlight} />
      <span className={styles.featureIcon}>{icon}</span>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureBody}>{body}</p>
    </div>
  );
}

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>What's Available</h2>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}


function Community() {
  return (
    <section className={styles.community}>
      <div className="container">
        <div className={styles.communityInner}>
          <div className={styles.communityContent}>
            <h2 className={styles.communityTitle}>Join the Community</h2>
            <p className={styles.communityBody}>
              Follow development, discuss self-hosting, and help shape the project on Discord.
            </p>
          </div>
          <div className={styles.communityButtons}>
            <a
              className="button button--primary button--lg"
              href="https://discord.gg/MZAf5aVkJG"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord
            </a>
            <Link className="button button--outline button--lg" to="/docs/faq">
              Read the FAQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Private Server"
      description="Open-source, fan-made self-hosted server implementation for NieR Re[in]carnation. Non-commercial game preservation project."
    >
      <Head>
        <title>Lunar Tear</title>
      </Head>
      <Hero />
      <Intro />
      <Features />
<Community />
    </Layout>
  );
}
