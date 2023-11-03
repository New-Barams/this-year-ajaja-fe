'use client';

import { useState } from 'react';
import './index.scss';

type ButtonColor = 'background-100' | 'primary';

interface ButtonProps {
  background: ButtonColor;
  usage: string;
  content: string;
}

export default function Button({
  background,
  usage,
  content,
  ...props
}: ButtonProps) {
  return (
    <button className={`button--${usage}--${background}`} {...props}>
      {content}
    </button>
  );
}
