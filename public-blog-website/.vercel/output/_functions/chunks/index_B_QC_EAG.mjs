import { c as createComponent } from './consts_DHlhKIrH.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, e as addAttribute, c as renderTemplate } from './entrypoint_CTYKeECl.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_AgDkbsqa.mjs';
import { $ as $$FormattedDate } from './FormattedDate_Cq5vz-kC.mjs';
import { a as SITE_DESCRIPTION, S as SITE_TITLE } from './consts_BuHq6iFx.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const res = await fetch(`${"http://localhost:8000/"}blog/`);
  const data = await res.json();
  const posts = data.blogs || [];
  return renderTemplate`<html lang="en" data-astro-cid-5tznm7mj> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `Blogs | ${SITE_TITLE}`, "description": SITE_DESCRIPTION, "data-astro-cid-5tznm7mj": true })}${renderHead()}</head> <body data-astro-cid-5tznm7mj> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5tznm7mj": true })} <main data-astro-cid-5tznm7mj> <section class="page-hero" data-astro-cid-5tznm7mj> <span class="badge" data-astro-cid-5tznm7mj>Latest Blogs</span> <h1 data-astro-cid-5tznm7mj>Fresh stories, ideas, and insights.</h1> <p data-astro-cid-5tznm7mj>
Browse approved articles from our writers and discover something worth reading today.
</p> </section> <section data-astro-cid-5tznm7mj> ${posts.length > 0 ? renderTemplate`<ul class="blog-grid" data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<li class="blog-card" data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.id}/`, "href")} data-astro-cid-5tznm7mj> <div class="image-wrap" data-astro-cid-5tznm7mj> ${post.imageUrl && renderTemplate`<img${addAttribute(post.imageUrl, "src")}${addAttribute(post.title, "alt")} loading="lazy" data-astro-cid-5tznm7mj>`} </div> <div class="card-content" data-astro-cid-5tznm7mj> <p class="date" data-astro-cid-5tznm7mj> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": new Date(post.createdAt), "data-astro-cid-5tznm7mj": true })} </p> <h2 class="title" data-astro-cid-5tznm7mj>${post.title}</h2> <p class="excerpt" data-astro-cid-5tznm7mj> ${post.content?.slice(0, 120)}...
</p> <span class="read-more" data-astro-cid-5tznm7mj>Read article →</span> </div> </a> </li>`)} </ul>` : renderTemplate`<div class="empty-state" data-astro-cid-5tznm7mj> <h2 data-astro-cid-5tznm7mj>No blogs published yet.</h2> <p data-astro-cid-5tznm7mj>Approved blogs will appear here once writers publish them.</p> </div>`} </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5tznm7mj": true })} </body></html>`;
}, "/home/ts/learing-project/public-blog-website/src/pages/blog/index.astro", void 0);
const $$file = "/home/ts/learing-project/public-blog-website/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
