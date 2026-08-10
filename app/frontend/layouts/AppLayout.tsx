import { usePage } from "@inertiajs/react"
import FlashMessages from "../components/FlashMessages"
import { PropsWithChildren } from "react"
import { SharedProps } from "../types/inertia"

export default function AppLayout({ children }: PropsWithChildren) {
  const { flash } = usePage<SharedProps>().props

  return (
    <>

      <FlashMessages flash={flash} />

      <main>
        {children}
      </main>
    </>
  )
}
