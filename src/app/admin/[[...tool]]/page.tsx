import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function AdminPage() {
  if (!isSanityConfigured) {
    return (
      <main className="min-h-screen bg-[#1f1f1f] px-6 py-16 text-[#f5f0eb]">
        <div className="mx-auto max-w-2xl border border-[#c9a96e]/30 bg-[#292929] p-8 sm:p-12">
          <p className="mb-4 text-sm uppercase tracking-[0.22em] text-[#c9a96e]">
            Sanity Studio
          </p>
          <h1 className="mb-5 text-3xl">Потрібне підключення до Sanity</h1>
          <p className="mb-6 leading-7 text-[#b9afa5]">
            Адмінка вже встановлена. Додайте ідентифікатор Sanity-проєкту та
            назву dataset у файл <code>.env.local</code>, а потім перезапустіть
            локальний сервер.
          </p>
          <pre className="overflow-x-auto bg-[#181818] p-4 text-sm leading-6 text-[#dfc190]">
            {`NEXT_PUBLIC_SANITY_PROJECT_ID=ваш-project-id\nNEXT_PUBLIC_SANITY_DATASET=production`}
          </pre>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
