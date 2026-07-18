# songjaehyun.com

A lightweight, static portfolio for Jae Hyun Song. The site focuses on selected
client, product, and enterprise engineering work without runtime APIs or backend
dependencies.

## Local development

```bash
npm install
npm run dev
```

## Production export

```bash
npm run build
```

Next.js writes the static site to `out/`, ready to upload to S3 and serve behind
the configured domain and certificate.
