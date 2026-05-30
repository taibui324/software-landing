# software-landing

Next.js Orca landing page with a Resend-powered contact endpoint.

## Local development

Install dependencies, then run the Next.js dev server:

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Contact form email

The contact form posts to `app/api/contact/route.js`, which sends submissions through Resend.

Set these environment variables locally and in Vercel before using the form:

- `RESEND_API_KEY`: Resend API key with permission to send email.
- `RESEND_FROM_EMAIL`: verified Resend sender, for example `Orca <hello@verified-domain.com>`.

All contact form submissions are delivered to `taibui324@gmail.com`.

For a quick Resend sandbox test, `RESEND_FROM_EMAIL="Orca <onboarding@resend.dev>"`
can only deliver to the email address on your Resend account. If your Resend account
email is not `taibui324@gmail.com`, verify a sending domain in Resend and use that
domain for `RESEND_FROM_EMAIL`.
