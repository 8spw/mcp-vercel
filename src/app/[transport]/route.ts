import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "cource_recommentaion",
      "Give a course recommendation to user",
      {
        experienceLevel: z.enum(["beginner", "intermediate"]),
      },
      ({ experienceLevel }) => ({
        content: [
          {
            type: "text",
            content: `I would recommend ${experienceLevel === "beginner" ? "Javascript Course" : "Next.js Course"}`,
          },
        ],
      }),
    );
  },
  {
    capabilities: {
      tools: {
        cource_recommentaion: {
          description: "Give a course recommendation to user",
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  },
);

export { handler as POST, handler as GET, handler as DELETE };
