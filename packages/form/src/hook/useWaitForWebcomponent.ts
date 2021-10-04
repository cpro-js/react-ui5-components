import { useEffect, useRef, useState } from "react";

const noop = () => undefined;

export const useWaitForWebcomponent = (elementTag: string) => {
  const [loaded, setLoaded] = useState<boolean>(
    !!window.customElements.get(elementTag)
  );
  const loadedRef = useRef<boolean>(!!window.customElements.get(elementTag));

  useEffect(() => {
    let cb = setLoaded;

    if (!loadedRef.current) {
      window.customElements
        .whenDefined(elementTag)
        .then(() => {
          cb(true);
        })
        .catch(noop);
    }
    return () => {
      cb = noop;
    };
  }, [elementTag, setLoaded]);

  return loaded;
};
