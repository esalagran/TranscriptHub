import { Head } from "@inertiajs/react"
import AppLayout from "../../layouts/AppLayout"

function Index() {
  return (
    <>
      <Head title="Home" />

      <h1>Home</h1>
    </>
  )
}

Index.layout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
)

export default Index
