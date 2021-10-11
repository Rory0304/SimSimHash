import { useEffect, useState, useRef } from "react";

export function useLazyImageHandler({ src }) {
    const [imgSrc, setImgSrc] = useState(null);
    const imgRef = useRef(null);

    useEffect(() => {
        let observer;
        if (imgSrc !== src) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setImgSrc(src);
                        observer.unobserve(imgRef.current);
                    }
                },
                { threshold: [0.25] }
            );
            observer.observe(imgRef.current);
        }
        return () => {
            observer && observer.disconnect();
        };
    }, [imgRef, imgSrc, src]);

    return { imgSrc, imgRef };
}
