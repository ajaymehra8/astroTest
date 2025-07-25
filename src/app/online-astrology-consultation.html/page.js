"use client";

import { useEffect, useState } from "react";

export default function AstrologerPage() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch("/api/astrologer");
      const data = await res.json();
      setHtmlContent(data.htmlContent);
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = data.htmlContent;
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
          newScript.async = true;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });
    };
    fetchContent();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
