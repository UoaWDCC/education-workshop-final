import { useRef } from "react";
import styles from "./Modal.module.css";

/**
 * A modal dialog.
 */
export default function Modal({ visible, onClose, children }) {
  const backgroundRef = useRef();

  function handleBackgroundClick(e) {
    if (e.target === backgroundRef.current) onClose(e);
  }

  if (visible)
    return (
      <div ref={backgroundRef} className={styles.modal} onClick={handleBackgroundClick}>
        {children}
      </div>
    );
  return undefined;
}
