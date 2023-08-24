'use client';

import Script from "next/script";

export default function AboutScript() {

    // function handleClick() {
    //   console.log("increment like count")
    // }

    return (
        // <button onClick={handleClick}>Projects</button>
        <Script src="/js/project.js" strategy="afterInteractive" />
      )
}
 