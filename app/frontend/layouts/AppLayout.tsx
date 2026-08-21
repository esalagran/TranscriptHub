import { usePage } from "@inertiajs/react";
import FlashMessages from "../components/FlashMessages";
import { PropsWithChildren } from "react";
import { SharedProps } from "../types/inertia";
import Sidebar from "../components/Sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  const { flash } = usePage<SharedProps>().props;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <FlashMessages flash={flash} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
