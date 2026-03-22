import pool from "@/lib/db";

interface TestCategory {
  id: number;
  name: string;
  description: string | null;
}

async function getCategories(): Promise<TestCategory[]> {
  const result = await pool.query<TestCategory>(
    "SELECT id, name, description FROM testcategories ORDER BY id"
  );
  return result.rows;
}

export default async function TestCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Test Categories</h1>
        <p className="text-gray-500 text-sm mt-1">
          Categories used for grouping medical tests.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-5 py-3 text-left font-semibold w-16">ID</th>
              <th className="px-5 py-3 text-left font-semibold w-32">Name</th>
              <th className="px-5 py-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-8 text-center text-gray-400 italic"
                >
                  No records found. Make sure the database is seeded.
                </td>
              </tr>
            ) : (
              categories.map((cat, i) => (
                <tr
                  key={cat.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-5 py-3 text-gray-500">{cat.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {cat.name}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {cat.description ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          {categories.length} record{categories.length !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}
