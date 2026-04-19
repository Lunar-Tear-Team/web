import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Footer/Layout';
import styles from './styles.module.css';

const WORDMARK = 'LUNAR TEAR';

export default function FooterLayout({
  style,
  links,
  copyright,
}: Props): ReactNode {
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
        {links}
        <div className={styles.footerBottom}>
          <span className={styles.wordmark}>{WORDMARK}</span>
          {copyright && <div className={styles.copyright}>{copyright}</div>}
        </div>
      </div>
    </footer>
  );
}
