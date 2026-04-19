import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/NotFound/Content';

import styles from './styles.module.css';

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx(styles.notFound, className)}>
      <div className={styles.panel}>
        <img className={styles.mama} src="/img/404.webp" alt="Mama" />
        <p className={styles.eyebrow}>Error 404</p>
        <h1 className={styles.title}>Lost in The Cage?</h1>
        <p className={styles.quote}>“Don&apos;t worry. Mama&apos;s here.”</p>
        <p className={styles.body}>
          This page does not exist, or it moved somewhere Mama cannot reach.
        </p>
        <div className={styles.actions}>
          <Link className="button button--primary button--lg" to="/">
            Return Home
          </Link>
          <Link className="button button--outline button--lg" to="/docs/intro">
            Open the Wiki
          </Link>
        </div>
      </div>
    </main>
  );
}
