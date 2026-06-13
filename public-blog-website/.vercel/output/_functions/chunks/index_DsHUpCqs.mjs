import { c as createComponent } from './consts_HDQ_ydgt.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, c as renderTemplate } from './entrypoint_BtIo6Lzg.mjs';
import { c as createLucideIcon, $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_Bhz4TgyJ.mjs';
import { a as SITE_DESCRIPTION, S as SITE_TITLE } from './consts_BuHq6iFx.mjs';
import { H as Heart, M as MessageCircle } from './message-circle_DsIb9Nf3.mjs';

const Book = createLucideIcon("book", [["path", { "d": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }]]);

const Share = createLucideIcon("share", [["path", { "d": "M12 2v13" }], ["path", { "d": "m16 6-4-4-4 4" }], ["path", { "d": "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }]]);

const Shield = createLucideIcon("shield", [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }]]);

const Zap = createLucideIcon("zap", [["path", { "d": "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" }]]);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-j7pv25f6": true })}${renderHead()}</head> <body data-astro-cid-j7pv25f6> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} <main data-astro-cid-j7pv25f6> <section class="hero" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <span class="badge" data-astro-cid-j7pv25f6>Public Blog Platform</span> <h1 data-astro-cid-j7pv25f6>Read ideas that actually stay with you.</h1> <p data-astro-cid-j7pv25f6>
Discover approved blogs from creators, developers, thinkers, and storytellers.
						Like what you love, comment your thoughts, and share the good stuff forward.
</p> <div class="actions" data-astro-cid-j7pv25f6> <a class="btn primary" href="/blog" data-astro-cid-j7pv25f6>Explore Blogs</a> <a class="btn secondary" href="/blog" data-astro-cid-j7pv25f6>Latest Articles</a> </div> </div> <aside class="preview-card" data-astro-cid-j7pv25f6> <div class="image" data-astro-cid-j7pv25f6><img src="https://res.cloudinary.com/dp7ksf2mb/image/upload/v1780380220/Screenshot_from_2026-06-02_11-31-48_rh7utv.png" alt="" data-astro-cid-j7pv25f6></div> <h3 data-astro-cid-j7pv25f6>Featured reads, cleanly curated.</h3> <p data-astro-cid-j7pv25f6>
Only approved posts appear here, so readers get a cleaner and more trusted blog experience.
</p> </aside> </section> <section class="grid" data-astro-cid-j7pv25f6> <div class="feature" data-astro-cid-j7pv25f6> <h5 data-astro-cid-j7pv25f6>${renderComponent($$result, "Book", Book, { "data-astro-cid-j7pv25f6": true })} Read</h5> <p data-astro-cid-j7pv25f6>Browse public blogs with clean layouts and fast loading pages.</p> </div> <div class="feature" data-astro-cid-j7pv25f6> <h5 data-astro-cid-j7pv25f6>${renderComponent($$result, "Heart", Heart, { "data-astro-cid-j7pv25f6": true })} React</h5> <p data-astro-cid-j7pv25f6>Like blogs and show writers which articles people enjoy most.</p> </div> <div class="feature" data-astro-cid-j7pv25f6> <h5 data-astro-cid-j7pv25f6>${renderComponent($$result, "MessageCircle", MessageCircle, { "data-astro-cid-j7pv25f6": true })} Discuss</h5> <p data-astro-cid-j7pv25f6>Comment on posts and join simple conversations around ideas.</p> </div> <div class="feature" data-astro-cid-j7pv25f6> <h5 data-astro-cid-j7pv25f6>${renderComponent($$result, "Share", Share, { "data-astro-cid-j7pv25f6": true })} Share</h5> <p data-astro-cid-j7pv25f6>Share articles through WhatsApp, copy link, or native browser sharing.</p> </div> <div class="feature" data-astro-cid-j7pv25f6> <h5 data-astro-cid-j7pv25f6>${renderComponent($$result, "Shield", Shield, { "data-astro-cid-j7pv25f6": true })} Curated</h5> <p data-astro-cid-j7pv25f6>Blogs are moderated before going public, keeping the feed cleaner.</p> </div> <div class="feature" data-astro-cid-j7pv25f6> <h5 data-astro-cid-j7pv25f6>${renderComponent($$result, "Zap", Zap, { "data-astro-cid-j7pv25f6": true })} Fast</h5> <p data-astro-cid-j7pv25f6>Built with Astro for a lightweight public reading experience.</p> </div> </section> <section class="cta" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Start exploring fresh stories.</h2> <p data-astro-cid-j7pv25f6>
Jump into the blog feed and find something worth reading today.
</p> <a class="btn" href="/blog" data-astro-cid-j7pv25f6>Browse Blogs →</a> </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} </body></html>`;
}, "/home/ts/learing-project/public-blog-website/src/pages/index.astro", void 0);

const $$file = "/home/ts/learing-project/public-blog-website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
