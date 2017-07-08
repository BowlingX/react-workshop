/**
 * @flow
 */

export default function () {
  // 16777215 == ffffff in decimal
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};