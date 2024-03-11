# Almost Studio CMS Site
A portfolio website built with <a href="https://nextjs.org">Next.js</a> and <a href="https://sanity.io">Sanity.io</a> for content.</p>


## Notes

- The website uses React/P5, and p5-wrapper
  

## Project Overview

| [Personal Website][site]          | [Studio][studio]                 |
| --------------------------------- | -------------------------------- |

### Important files and folders

| File(s)                                                   | Description                                     |
| --------------------------------------------------------- | ----------------------------------------------- |
| [`sanity.config.ts`](sanity.config.ts)                    | Config file for Sanity Studio                   |
| [`sanity.client.ts`](sanity/sanity.client.ts)             | Config file for Sanity CLI                      |
| [`studio`](<./app/(studio)/studio/[[...index]]/page.tsx>) | Where Sanity Studio is mounted                  |
| [`schemas`](./schemas)                                    | Where Sanity Studio gets its content types from |
| [`sanity.query.ts`](./sanity/sanity.query.ts)             | Where Sanity data is described and retrieved    |

## Run project locally

Run these commands in the terminal.

```bash
npm install

npm run dev
```

Visit [http://localhost:3000][localhost-3000] to see your site <br />
Visit [http://localhost:3000/edit][localhost-3000-studio] to edit content



<!-- LINK VARIABLES -->

[site]: https://almost-studio.vercel.app
[studio]: https://almost-studio.vercel.app/edit
[localhost-3000]: http://localhost:3000
[localhost-3000-studio]: http://localhost:3000/edit
