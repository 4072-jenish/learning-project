import { c as createComponent } from './consts_HDQ_ydgt.mjs';
import 'piccolore';
import { c as renderTemplate, r as renderComponent, b as renderHead } from './entrypoint_BtIo6Lzg.mjs';
import { b as $$Footer, a as $$Header, $ as $$BaseHead } from './Header_Bhz4TgyJ.mjs';
import { S as SITE_TITLE } from './consts_BuHq6iFx.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-35oxftto> <head>', "", "</head> <body data-astro-cid-35oxftto> ", ' <main data-astro-cid-35oxftto> <section class="profile-hero" data-astro-cid-35oxftto> <div class="avatar" id="avatar" data-astro-cid-35oxftto>U</div> <h1 id="userName" class="userName" data-astro-cid-35oxftto>Loading...</h1> <p class="email" id="userEmail" data-astro-cid-35oxftto>Loading...</p> <div class="stats" data-astro-cid-35oxftto> <div class="stat-card" data-astro-cid-35oxftto> <strong id="blogsCount" data-astro-cid-35oxftto>0</strong> <span data-astro-cid-35oxftto>Blogs</span> </div> <div class="stat-card" data-astro-cid-35oxftto> <strong id="likesCount" data-astro-cid-35oxftto>0</strong> <span data-astro-cid-35oxftto>Likes</span> </div> <div class="stat-card" data-astro-cid-35oxftto> <strong id="commentsCount" data-astro-cid-35oxftto>0</strong> <span data-astro-cid-35oxftto>Comments</span> </div> <div class="stat-card" data-astro-cid-35oxftto> <strong id="sharesCount" data-astro-cid-35oxftto>0</strong> <span data-astro-cid-35oxftto>Shares</span> </div> </div> <div class="actions" data-astro-cid-35oxftto> <a href="/blog" class="btn" data-astro-cid-35oxftto>Explore Blogs</a> <button id="logoutBtn" class="logout" data-astro-cid-35oxftto>Logout</button> </div> </section> <section class="section" data-astro-cid-35oxftto> <h2 data-astro-cid-35oxftto>Account Details</h2> <p data-astro-cid-35oxftto><strong data-astro-cid-35oxftto>Role:</strong> <span id="userRole" data-astro-cid-35oxftto>-</span></p> <p data-astro-cid-35oxftto><strong data-astro-cid-35oxftto>Status:</strong> <span id="userStatus" data-astro-cid-35oxftto>-</span></p> </section> </main> ', ' <script src="/src/scripts/profile-action.ts" type="module"><\/script> </body> </html>'])), renderComponent($$result, "BaseHead", $$BaseHead, { "title": `Profile | ${SITE_TITLE}`, "description": "User profile", "data-astro-cid-35oxftto": true }), renderHead(), renderComponent($$result, "Header", $$Header, { "data-astro-cid-35oxftto": true }), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-35oxftto": true }));
}, "/home/ts/learing-project/public-blog-website/src/pages/profile/index.astro", void 0);

const $$file = "/home/ts/learing-project/public-blog-website/src/pages/profile/index.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
