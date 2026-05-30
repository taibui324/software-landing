import Script from "next/script";
import "../styles.css";

export const metadata = {
  title: "Orca - AI Software Consultant for SMB Operations",
  description: "Productized AI consulting for SMB teams that need practical workflows, automations, and internal tools.",
  icons: {
    icon: "/assets/orca-logo.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            document.documentElement.classList.add("has-js");
            try {
              if (localStorage.getItem("orca-theme") === "dark") {
                document.documentElement.dataset.theme = "dark";
              }
            } catch (_) {}
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
