"use client";

import { useState, useTransition } from "react";
import Modal from "@/components/Modal";
import { Field, TextAreaField, FormActions } from "@/components/FormFields";
import { createUom, updateUom, deleteUom } from "@/lib/actions";

interface Uom {
  id: number;
  name: string;
  description: string | null;
}

export default function UomClient({ uoms }: { uoms: Uom[] }) {
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Uom | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleCreate(formData: FormData) {
    startTransition(async () => {
      await createUom(formData);
      setShowCreate(false);
    });
  }

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateUom(formData);
      setEditing(null);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteUom(id);
      setDeletingId(null);
    });
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Units of Measure</h1>
          <p className="text-gray-500 text-sm mt-1">
            All measurement units used in medical tests.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Add Unit
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-5 py-3 text-left font-semibold w-16">ID</th>
              <th className="px-5 py-3 text-left font-semibold w-32">Name</th>
              <th className="px-5 py-3 text-left font-semibold">Description</th>
              <th className="px-5 py-3 text-center font-semibold w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {uoms.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-gray-400 italic"
                >
                  No records found.
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
                  <td className="px-5 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditing(uom)}
                        className="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 font-medium px-3 py-1 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(uom.id)}
                        className="text-xs bg-red-100 text-red-600 hover:bg-red-200 font-medium px-3 py-1 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
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

      {/* Create Modal */}
      {showCreate && (
        <Modal title="Add Unit of Measure" onClose={() => setShowCreate(false)}>
          <form action={handleCreate}>
            <Field label="Name" name="name" required placeholder="e.g. mg/dL" />
            <TextAreaField
              label="Description"
              name="description"
              placeholder="Optional description"
            />
            <FormActions
              onClose={() => setShowCreate(false)}
              submitLabel={isPending ? "Saving…" : "Save"}
              submitColor="blue"
            />
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {editing && (
        <Modal
          title="Edit Unit of Measure"
          onClose={() => setEditing(null)}
        >
          <form action={handleUpdate}>
            <input type="hidden" name="id" value={editing.id} />
            <Field
              label="Name"
              name="name"
              required
              defaultValue={editing.name}
            />
            <TextAreaField
              label="Description"
              name="description"
              defaultValue={editing.description ?? ""}
            />
            <FormActions
              onClose={() => setEditing(null)}
              submitLabel={isPending ? "Saving…" : "Update"}
              submitColor="blue"
            />
          </form>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {deletingId !== null && (
        <Modal title="Confirm Delete" onClose={() => setDeletingId(null)}>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to delete this unit of measure? This cannot be
            undone and will fail if it is referenced by a medical test.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeletingId(null)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deletingId)}
              disabled={isPending}
              className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-50"
            >
              {isPending ? "Deleting…" : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
