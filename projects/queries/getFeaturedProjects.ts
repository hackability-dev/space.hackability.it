import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(async () => {
  const projects = await db.project.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 18,
  })

  return {
    projects,
  }
})
