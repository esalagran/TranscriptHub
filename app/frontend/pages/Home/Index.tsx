import { Head } from "@inertiajs/react"
import AppLayout from "../../layouts/AppLayout"

function Index() {
  return (
    <>
      <Head title="Home" />

      Home
    </>
  )
}

Index.layout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
)

export default Index
