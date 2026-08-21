// frontend/components/FlashMessages.tsx
import { Flash } from "../types/inertia";

export default function FlashMessages({ flash }: { flash: Flash }) {
  return (
    <>
      {flash.notice && (
        <div className="bg-green-100 p-4 text-green-800">{flash.notice}</div>
      )}

      {flash.alert && (
        <div className="bg-red-100 p-4 text-red-800">{flash.alert}</div>
      )}
    </>
  );
}
