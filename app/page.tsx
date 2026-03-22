import Link from "next/link";

export default function Home() {
  const pages = [
    {
      href: "/uom",
      title: "Units of Measure",
      description:
        "Manage measurement units such as mg/dL, mmol/L, g/dL, IU/L, and cells/µL.",
      color: "bg-blue-600",
      icon: "📏",
    },
    {
      href: "/testcategories",
      title: "Test Categories",
      description:
        "Manage categories for grouping medical tests (e.g. BCT, CBC, LFT).",
      color: "bg-green-600",
      icon: "🗂️",
    },
    {
      href: "/medicaltests",
      title: "Medical Tests",
      description:
        "Manage individual medical tests with their normal range values and associated units.",
      color: "bg-purple-600",
      icon: "🔬",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">
        Medical Laboratory Systems — Simple CRUD Management
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link key={page.href} href={page.href} className="group block">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
              <div className={`${page.color} px-6 py-5 text-white`}>
                <span className="text-3xl">{page.icon}</span>
                <h2 className="text-xl font-semibold mt-2">{page.title}</h2>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 text-sm">{page.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-blue-600 group-hover:underline">
                  View &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
