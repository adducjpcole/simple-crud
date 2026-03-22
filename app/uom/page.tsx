import pool from "@/lib/db";

interface Uom {
  id: number;
  name: string;
  description: string | null;
}

async function getUoms(): Promise<Uom[]> {
  const result = await pool.query<Uom>(
    "SELECT id, name, description FROM uom ORDER BY id"
  );
  return result.rows;
}

export default async function UomPage() {
  const uoms = await getUoms();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Units of Measure</h1>
        <p className="text-gray-500 text-sm mt-1">
          All measurement units used in medical tests.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-5 py-3 text-left font-semibold w-16">ID</th>
              <th className="px-5 py-3 text-left font-semibold w-32">Name</th>
              <th className="px-5 py-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {uoms.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-8 text-center text-gray-400 italic"
                >
                  No records found. Make sure the database is seeded.
                </td>
              </tr>
            ) : (
              uoms.map((uom, i) => (
                <tr
                  key={uom.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-5 py-3 text-gray-500">{uom.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {uom.name}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {uom.description ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          {uoms.length} record{uoms.length !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}
