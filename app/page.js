import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function getLandingMarkup() {
  const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const match = html.match(/<body>\s*([\s\S]*?)\s*<script src="public\/script\.js"><\/script>\s*<\/body>/);

  if (!match) {
    throw new Error("Could not extract landing page markup from index.html");
  }

  return match[1];
}

export default function Home() {
  return (
    <>
      <div className="next-page-shell" dangerouslySetInnerHTML={{ __html: getLandingMarkup() }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
