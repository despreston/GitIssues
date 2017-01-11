/**
 * Shared tools used throughout the app
 */
import React from 'react';

export function ReplaceLineBreaks (text) {
  return text.split('\n').map((item, idx) => <span key={idx}>{item}<br /></span>);
}
