# CAS Tech Labs — Static Website

This is the production-oriented static replacement for the Wix site.

## Stack
- Plain HTML
- CSS
- Vanilla JavaScript
- Cloudflare Pages
- Cloudflare Pages Function for `/api/contact`
- Resend for email delivery

## Deploy to Cloudflare Pages
1. Put this folder in a GitHub repository.
2. In Cloudflare, create a Pages project connected to the repository.
3. Framework preset: None.
4. Build command: leave blank.
5. Output directory: `/`.
6. Deploy.

## Contact form setup
The contact form uses `functions/api/contact.js`.
In the Cloudflare Pages project, add these environment variables/secrets:
- `RESEND_API_KEY` — your Resend API key
- `CONTACT_FROM` — a verified sender, for example `CAS Tech Labs Website <website@castechlabs.com>`

The destination is `hr@castechlabs.com`.

Do not put the Resend API key into HTML, JavaScript, GitHub, or this README.

## Domain
After testing the Cloudflare Pages URL:
- Add `castechlabs.com` as the custom domain in Cloudflare.
- Move DNS to Cloudflare if it is not already there.
- Verify the root domain and `www` behavior.
- Keep Wix running until DNS, forms and all pages have been tested.
- Only then cancel the Wix subscription.

## Important migration notes
- `/programs111` redirects permanently to `/programs`.
- The old `info@mysite.com` reference has been removed.
- Duplicate DevOps content from the Wix Services page has been consolidated.
- The original CAS Tech Labs logo supplied by the owner is used.
- Sitemap and robots.txt are included.
- Submit the sitemap in Google Search Console after launch.

## Pre-launch checklist
- [ ] Verify every page on the Cloudflare preview URL.
- [ ] Test mobile navigation.
- [ ] Test contact form.
- [ ] Confirm email delivery to `hr@castechlabs.com`.
- [ ] Configure custom domain.
- [ ] Test HTTPS.
- [ ] Test `/programs111` redirect.
- [ ] Test `/`, `/services`, `/programs`, `/careers`, `/contact`.
- [ ] Check Google Search Console.
- [ ] Confirm phone and email.
- [ ] Keep Wix active until all tests pass.
