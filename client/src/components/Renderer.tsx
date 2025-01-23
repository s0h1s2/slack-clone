import Quill from "quill";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
};
const Renderer = ({ value }: Props) => {
  const rendererRef = useRef<HTMLDivElement>(null);
  const [isImageAlone, setIsImageAlone] = useState(false);

  useEffect(() => {
    if (!rendererRef.current) return;
    const container = rendererRef.current;
    const quill = new Quill(document.createElement("div"), { theme: "snow" });
    quill.enable(false);
    quill.setContents(JSON.parse(value));
    const isEmpty = quill.getText()?.length === 0;
    setIsImageAlone(isEmpty);
    container.innerHTML = quill.root.innerHTML;
    return () => {
      container.innerHTML = "";
    };
  }, [value]);
  if (isImageAlone) return null;

  return <div ref={rendererRef} className="ql-editor ql-renderer" />;
};

export default Renderer;
