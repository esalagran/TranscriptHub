// app/frontend/components/Sidebar.tsx
import { Link, usePage } from "@inertiajs/react"
import { root_path, logout_path } from "../routes"
import { SharedProps } from "../types/inertia"

export default function Sidebar() {
  const { url, props } = usePage<SharedProps>()
  const { user } = props

  const isActive = (path: string) => url === path

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-gray-50 p-4 flex flex-col">
      <div className="text-lg font-semibold mb-6">TranscriptHub</div>

      <nav className="flex flex-col gap-1">
        <Link
          href={root_path()}
          className={`rounded px-3 py-2 text-sm ${
            isActive(root_path())
              ? "bg-gray-200 text-gray-900 font-medium"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Home
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-200">
        {user && (
          <div className="px-3 py-2 text-sm text-gray-600 truncate">
            {user.email_address}
          </div>
        )}
        <Link
          href={logout_path()}
          method="delete"
          as="button"
          className="w-full text-left rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
        >
          Log out
        </Link>
      </div>
    </aside>
  )
}