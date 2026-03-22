import Link from "next/link";

export default function Home() {
  const pages = [
    {
      href: "/uom",
      label: "01",
      title: "Units of Measure",
      description:
        "Manage measurement units — mg/dL, mmol/L, g/dL, IU/L, cells/µL.",
    },
    {
      href: "/testcategories",
      label: "02",
      title: "Test Categories",
      description:
        "Group medical tests into categories such as BCT, CBC, and LFT.",
    },
    {
      href: "/medicaltests",
      label: "03",
      title: "Medical Tests",
      description:
        "Individual tests with reference ranges, units, and categories.",
    },
  ];

  return (
    <div>
      {/* Page heading */}
      <div className="mb-12 border-b border-neutral-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 mb-3">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold text-neutral-800">
          Medical Laboratory Systems
        </h1>
        <p className="text-neutral-400 text-sm mt-2">
          Manage your lab data across three modules below.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group bg-white p-8 flex flex-col justify-between min-h-48 hover:bg-neutral-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-neutral-300">
                {page.label}
              </span>
              <span className="text-neutral-200 group-hover:text-rose-400 transition-colors text-lg">
                →
              </span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-800 mb-2">
                {page.title}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {page.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
