import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (elRef.current === null) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (modalRoot === null) {
      throw new Error("Unable to find modal root in html");
    }

    modalRoot.appendChild(elRef.current!);
    return () => {
      modalRoot.removeChild(elRef.current!);
    };
  }, []);

  return createPortal(<div className="modal">{children}</div>, elRef.current);
};

export default Modal;
