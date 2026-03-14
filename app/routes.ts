import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("content-loader", "routes/content_loader.ts"),
  route("blog", "routes/blog.tsx"),
  route("about-us", "routes/about-us.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;