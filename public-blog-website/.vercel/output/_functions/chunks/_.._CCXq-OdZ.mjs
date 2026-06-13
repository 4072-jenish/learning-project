import { c as createComponent } from './consts_CITKBvpJ.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, e as addAttribute, c as renderTemplate } from './entrypoint_-Gqi4B_L.mjs';
import { r as renderScript } from './script_DXuaGGmR.mjs';
import { c as createLucideIcon, $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_CaHWjbKu.mjs';
import { $ as $$FormattedDate } from './FormattedDate_DHAqZ_-e.mjs';
import { S as SITE_TITLE } from './consts_BuHq6iFx.mjs';
import { H as Heart, M as MessageCircle } from './message-circle_ICC4cTbL.mjs';

const Share2 = createLucideIcon("share-2", [["circle", { "cx": "18", "cy": "5", "r": "3" }], ["circle", { "cx": "6", "cy": "12", "r": "3" }], ["circle", { "cx": "18", "cy": "19", "r": "3" }], ["line", { "x1": "8.59", "x2": "15.42", "y1": "13.51", "y2": "17.49" }], ["line", { "x1": "15.41", "x2": "8.59", "y1": "6.51", "y2": "10.49" }]]);

const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const blogId = Array.isArray(slug) ? slug[0] : slug;
  const res = await fetch(
    `${"http://localhost:8000/"}blog/${blogId}`
  );
  if (!res.ok) {
    throw new Error("Blog not found");
  }
  const data = await res.json();
  const blog = data.blog || data;
  const heroImage = blog.imageUrl || "";
  const safeDate = blog.updatedAt || blog.createdAt || (/* @__PURE__ */ new Date()).toISOString();
  const likesCount = blog.likesCount ?? blog.likes?.length ?? 0;
  const commentsCount = blog.commentsCount ?? blog.comments?.length ?? 0;
  const sharesCount = blog.sharesCount ?? blog.shares?.length ?? 0;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `${blog.title} | ${SITE_TITLE}`, "description": blog.content?.slice(0, 150) })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <section${addAttribute(`hero ${heroImage ? "has-image" : ""}`, "class")}${addAttribute(heroImage ? `--hero-image: url('${heroImage}')` : "", "style")}> <div class="hero-inner"> <div class="breadcrumb"> <a href="/">Home</a> / <a href="/blog">Blog</a> / Article
</div> <h1>${blog.title}</h1> <div class="meta"> <span class="category-tag">Article</span> <span> <time${addAttribute(safeDate, "datetime")}> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": new Date(safeDate) })} </time> </span> </div> </div> </section> <main> <article class="article-content"> ${blog.content} </article> <div class="author-section"> <div class="author-avatar"> ${blog.author?.name?.charAt(0)?.toUpperCase() || "A"} </div> <div class="author-info"> <h3>${blog.author?.name || "About the Author"}</h3> <p>${blog.author?.email || "Passionate writer sharing insights."}</p> </div> </div> <div class="action-bar"> <button id="likeBtn" class="action-btn"${addAttribute(blog.id, "data-blog-id")}> ${renderComponent($$result, "Heart", Heart, {})} <span id="likeCount">${likesCount}</span> <span>Likes</span> </button> <button id="commentBtn" class="action-btn"${addAttribute(blog.id, "data-blog-id")}> ${renderComponent($$result, "MessageCircle", MessageCircle, {})} <span id="commentCount">${commentsCount}</span> <span>Comments</span> </button> <button id="shareBtn" class="action-btn"${addAttribute(blog.id, "data-blog-id")}> ${renderComponent($$result, "Share2", Share2, {})} <span id="shareCount">${sharesCount}</span> <span>Share</span> </button> </div> </main> <div id="commentModal" class="comment-modal"> <div class="comment-box"> <button id="closeCommentModal" class="close-btn">✕</button> <h2>Discussion</h2> <div id="commentsList" class="comments-list"> <p style="color: #888; text-align: center;">Loading comments...</p> </div> <form id="commentForm"> <textarea id="commentText" placeholder="Share your thoughts..." rows="3" required></textarea> <button type="submit">Post Comment</button> </form> </div> </div> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderScript($$result, "/home/ts/learing-project/public-blog-website/src/pages/blog/[...slug].astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/ts/learing-project/public-blog-website/src/pages/blog/[...slug].astro", void 0);
const $$file = "/home/ts/learing-project/public-blog-website/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
