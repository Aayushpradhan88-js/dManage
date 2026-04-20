import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old institute dashboard routes → new institute admin routes
      {
        source: "/institute/dashboard",
        destination: "/institute/admin/dashboard",
        permanent: true,
      },
      {
        source: "/institute/dashboard/student",
        destination: "/institute/admin/dashboard/students",
        permanent: true,
      },
      {
        source: "/institute/dashboard/teacher",
        destination: "/institute/admin/dashboard/teachers",
        permanent: true,
      },
      {
        source: "/institute/dashboard/course",
        destination: "/institute/admin/dashboard/courses",
        permanent: true,
      },
      {
        source: "/institute/dashboard/category",
        destination: "/institute/admin/dashboard",
        permanent: true,
      },
      {
        source: "/institute/dashboard/stats",
        destination: "/institute/admin/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
