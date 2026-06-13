import { c as createComponent } from './consts_CITKBvpJ.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, c as renderTemplate } from './entrypoint_-Gqi4B_L.mjs';
import 'clsx';

const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "/home/ts/learing-project/public-blog-website/src/components/FormattedDate.astro", void 0);

export { $$FormattedDate as $ };
