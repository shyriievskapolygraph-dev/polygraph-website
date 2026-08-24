import { defineQuery } from "next-sanity";

export const SITE_CONTENT_QUERY = defineQuery(`{
  "homePage": *[_id == "homePage"][0],
  "aboutPage": *[_id == "aboutPage"][0],
  "siteSettings": *[_id == "siteSettings"][0],
  "services": *[_type == "service" && active != false] | order(order asc),
  "faqItems": *[_type == "faq" && active != false] | order(order asc)
}`);
