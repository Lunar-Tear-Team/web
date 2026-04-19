import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.heroEyebrow}>NieR Re[in]carnation · Private Server</p>
        <h1 className={styles.heroTitle}>Lunar Tear</h1>
        <p className={styles.heroSubtitle}>
          The official servers are gone but the story isn't over.
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

function Notice() {
  return (
    <div className={styles.notice}>
      <div className="container">
        <p>
          <strong>April 29, 2024</strong>. Square Enix and Applibot shut down the official
          NieR Re[in]carnation servers. Lunar Tear is a fan-made preservation project
          that brings the game back, non-commercially and with no affiliation to either company.
        </p>
      </div>
    </div>
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
    body: 'Main story quests, EX chapters, event quests, and subjugation battles. All functional.',
  },
  {
    icon: '🎲',
    title: 'Gacha',
    body: 'Pull for costumes and weapons. The gacha system is implemented and working.',
  },
  {
    icon: '⚔️',
    title: 'Character & Weapon Management',
    body: 'Enhance, ascend, awaken, and evolve costumes and weapons. Skill levelling and the mythic slab are fully tracked.',
  },
  {
    icon: '🧩',
    title: 'Memoirs & Companions',
    body: 'Memoir enhancement, deck management, and companion progression are all supported.',
  },
  {
    icon: '🛒',
    title: 'Shop & Missions',
    body: 'The item shop, mission progress tracking, and daily rewards work as in the original game.',
  },
  {
    icon: '🌐',
    title: 'Self-Hosted',
    body: 'No central server. Run it on your own machine and connect the game client locally.',
  },
];

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>What's Available</h2>
        <div className={styles.featureGrid}>
          {features.map(({icon, title, body}) => (
            <div key={title} className={styles.featureCard}>
              <span className={styles.featureIcon}>{icon}</span>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureBody}>{body}</p>
            </div>
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
          <div>
            <h2 className={styles.communityTitle}>Join the Community</h2>
            <p className={styles.communityBody}>
              The Discord is currently developer-focused. If you're interested in contributing
              or following development progress, come join us.
            </p>
          </div>
          <div className={styles.communityButtons}>
            <a
              className="button button--primary button--lg"
              href="https://discord.gg/G3anrfcV"
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
      description="Fan-made private server for NieR Re[in]carnation. Non-commercial game preservation project."
    >
      <Head>
        <title>Lunar Tear</title>
      </Head>
      <Hero />
      <Notice />
      <Features />
<Community />
    </Layout>
  );
}
