import { c as createComponent } from './consts_DHlhKIrH.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, c as renderTemplate } from './entrypoint_CTYKeECl.mjs';
import { r as renderScript } from './script_bY7LuR2p.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_AgDkbsqa.mjs';
import { S as SITE_TITLE } from './consts_BuHq6iFx.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-j7y7d5ql> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `Login | ${SITE_TITLE}`, "description": "Login to your account", "data-astro-cid-j7y7d5ql": true })}${renderHead()}</head> <body data-astro-cid-j7y7d5ql> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-j7y7d5ql": true })} <main data-astro-cid-j7y7d5ql> <form class="auth-card" id="loginForm" data-astro-cid-j7y7d5ql> <h1 data-astro-cid-j7y7d5ql>Welcome back</h1> <p data-astro-cid-j7y7d5ql>Login to like, comment, and share blogs.</p> <label data-astro-cid-j7y7d5ql>Email</label> <input id="email" type="email" required placeholder="Enter email" data-astro-cid-j7y7d5ql> <label data-astro-cid-j7y7d5ql>Password</label> <input id="password" type="password" required placeholder="Enter password" data-astro-cid-j7y7d5ql> <button type="submit" data-astro-cid-j7y7d5ql>Login</button> <div class="link" data-astro-cid-j7y7d5ql>
Don't have an account? <a href="/auth/signup" data-astro-cid-j7y7d5ql>Sign up</a> </div> </form> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-j7y7d5ql": true })} ${renderScript($$result, "/home/ts/learing-project/public-blog-website/src/pages/auth/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/ts/learing-project/public-blog-website/src/pages/auth/login.astro", void 0);

const $$file = "/home/ts/learing-project/public-blog-website/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
