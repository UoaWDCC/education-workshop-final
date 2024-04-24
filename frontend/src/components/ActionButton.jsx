/* eslint-disable react/prop-types */
import styles from "./ActionButton.module.css";
import clsx from "clsx";

/**
 * A button! Yay!
 */
export function ActionButton({ text, ...props }) {
  return (
    <button className={styles.button} {...props}>
      {text}
    </button>
  );
}

/**
 * An alternatively-styled button! Also yay!
 */
export function RedActionButton({ text, ...props }) {
  return (
    <button className={clsx(styles.button, styles.red)} {...props}>
      {text}
    </button>
  );
}
