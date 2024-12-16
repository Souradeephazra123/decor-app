import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.APP_URL,
  consumerKey: process.env.consumer_key,
  consumerSecret: process.env.consumer_secret,
  version: "wc/v3",
});

export default api;
