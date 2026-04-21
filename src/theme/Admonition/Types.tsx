import React, {type ReactNode} from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

type Props = {
  children: ReactNode;
  title?: string;
};

function QuestionIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden="true" style={{flexShrink: 0}}>
      <text x="2" y="11" fontSize="12" fontWeight="bold">?</text>
    </svg>
  );
}

function AbstractIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden="true" style={{flexShrink: 0}}>
      <rect x="0" y="1" width="13" height="1.5" rx="0.5" />
      <rect x="0" y="5" width="10" height="1.5" rx="0.5" />
      <rect x="0" y="9" width="7" height="1.5" rx="0.5" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink: 0}}>
      <polyline points="2,7 5.5,10.5 11,3" />
    </svg>
  );
}

function makeAdmonition(className: string, icon: ReactNode, defaultTitle: string) {
  return function CustomAdmonition({children, title}: Props) {
    return (
      <div className={`alert alert--${className}`} role="note">
        <div className="admonition-custom-heading">
          {icon}
          {title ?? defaultTitle}
        </div>
        <div>{children}</div>
      </div>
    );
  };
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  question: makeAdmonition('question', <QuestionIcon />, 'question'),
  abstract: makeAdmonition('abstract', <AbstractIcon />, 'abstract'),
  success: makeAdmonition('success', <SuccessIcon />, 'success'),
};

export default AdmonitionTypes;
