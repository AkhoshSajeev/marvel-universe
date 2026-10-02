import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

let externalDialogOpener: HTMLElement | null = null;

export function Modal({
  children,
  onClose,
  labelId,
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  labelId: string;
  className?: string;
}) {
  const content = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    if (
      previous &&
      previous !== document.body &&
      !previous.closest('[role="dialog"]')
    )
      externalDialogOpener = previous;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    content.current?.querySelector<HTMLButtonElement>(".modal-close")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = content.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex="0"], iframe',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", onKey);
      if (
        previous?.isConnected &&
        previous !== document.body &&
        !previous.closest('[role="dialog"]')
      )
        previous.focus();
      else externalDialogOpener?.focus();
    };
  }, [onClose]);
  return createPortal(
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className={`modal-panel ${className}`}
        ref={content}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        initial={{
          opacity: 0,
          y: reducedMotion ? 0 : 30,
          scale: reducedMotion ? 1 : 0.98,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : 15 }}
        transition={{ duration: reducedMotion ? 0 : 0.35 }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={22} />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
