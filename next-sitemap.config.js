module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://astrovachan.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/"],
      },
    ],
  },
};
