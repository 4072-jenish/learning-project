import { c as createComponent } from './consts_HDQ_ydgt.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, c as renderTemplate } from './entrypoint_BtIo6Lzg.mjs';
import { r as renderScript } from './script_DlMDNZC7.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_Bhz4TgyJ.mjs';
import { S as SITE_TITLE } from './consts_BuHq6iFx.mjs';

const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `Sign Up | ${SITE_TITLE}`, "description": "Create your account" })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <form id="signupForm"> <h1>Create account</h1> <p>Sign up to like and comment on blogs.</p> <input id="name" type="text" required placeholder="Name"> <input id="email" type="email" required placeholder="Email"> <input id="password" type="password" required placeholder="Password"> <button type="submit">Sign Up</button> <p>Already have an account? <a href="/auth/login">Login</a></p> </form> </main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderScript($$result, "/home/ts/learing-project/public-blog-website/src/pages/auth/signup.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/ts/learing-project/public-blog-website/src/pages/auth/signup.astro", void 0);

const $$file = "/home/ts/learing-project/public-blog-website/src/pages/auth/signup.astro";
const $$url = "/auth/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Signup,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
