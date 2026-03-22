import pool from "@/lib/db";

interface MedicalTest {
  id: number;
  name: string;
  description: string | null;
  category: string;
  unit: string;
  normalmin: number | null;
  normalmax: number | null;
}

async function getMedicalTests(): Promise<MedicalTest[]> {
  // JOIN query: shows UOM Name and Category Name instead of raw IDs
  const result = await pool.query<MedicalTest>(`
    SELECT
      mt.id,
      mt.name,
      mt.description,
      tc.name AS category,
      u.name  AS unit,
      mt.normalmin,
      mt.normalmax
    FROM medicaltests mt
    JOIN testcategories tc ON mt.idcategory = tc.id
    JOIN uom u             ON mt.iduom     = u.id
    ORDER BY mt.id
  `);
  return result.rows;
}

export default async function MedicalTestsPage() {
  const tests = await getMedicalTests();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Medical Tests</h1>
        <p className="text-gray-500 text-sm mt-1">
          All medical tests with their normal reference ranges, unit, and
          category.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="px-5 py-3 text-left font-semibold w-16">ID</th>
              <th className="px-5 py-3 text-left font-semibold">Test Name</th>
              <th className="px-5 py-3 text-left font-semibold">Category</th>
              <th className="px-5 py-3 text-left font-semibold">Unit</th>
              <th className="px-5 py-3 text-right font-semibold">Min</th>
              <th className="px-5 py-3 text-right font-semibold">Max</th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-gray-400 italic"
                >
                  No records found. Make sure the database is seeded.
                </td>
              </tr>
            ) : (
              tests.map((test, i) => (
                <tr
                  key={test.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-5 py-3 text-gray-500">{test.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {test.name}
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {test.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{test.unit}</td>
                  <td className="px-5 py-3 text-right text-gray-700">
                    {test.normalmin ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-right text-gray-700">
                    {test.normalmax ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          {tests.length} record{tests.length !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}
