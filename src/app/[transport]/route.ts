import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";

const handler = createMcpHandler((server) => {
  server.tool(
    "cource_recommendation",
    "Give a course recommendation to user",
    {
      experienceLevel: z.enum(["beginner", "intermediate"]),
    },
    ({ experienceLevel }) => ({
      content: [
        {
          type: "text",
          text: `I would recommend ${
            experienceLevel === "beginner"
              ? "Javascript Course"
              : "Next.js Course"
          }`,
        },
      ],
    })
  );
});

export { handler as POST, handler as GET, handler as DELETE };
