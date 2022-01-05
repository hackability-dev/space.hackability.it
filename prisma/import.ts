import db from "."
import admin from "firebase-admin"

admin.initializeApp()

const firestore = admin.firestore()

async function main() {
  const res = await firestore.collection("projects").limit(100).where("completed", "==", true).get()
  const p = res.docs.map((d) => {
    const data = d.data()
    return {
      body: "",
      description: data.short || "",
      name: data.name || "",
      previewImage: data.preview?.thumbnail || "",
      what: data.what || "",
      why: data.why || "",
    }
  })
  console.log(p)
  // await db.project.createMany({
  //   data: p,
  // })
}

main().then()
