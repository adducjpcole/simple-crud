"use client";

import { useState, useTransition } from "react";
import Modal from "@/components/Modal";
import { Field, TextAreaField, SelectField, FormActions } from "@/components/FormFields";
import {
  createMedicalTest,
  updateMedicalTest,
  deleteMedicalTest,
} from "@/lib/actions";

interface MedicalTest {
  id: number;
  name: string;
  description: string | null;
  category: string;
  unit: string;
  iduom: number;
  idcategory: number;
  normalmin: number | null;
  normalmax: number | null;
}

interface Uom {
  id: number;
  name: string;
}

interface TestCategory {
  id: number;
  name: string;
}

export default function MedicalTestsClient({
  tests,
  uoms,
  categories,
}: {
  tests: MedicalTest[];
  uoms: Uom[];
  categories: TestCategory[];
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<MedicalTest | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const uomOptions = uoms.map((u) => ({ value: u.id, label: u.name }));
  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  function handleCreate(formData: FormData) {
    startTransition(async () => {
      await createMedicalTest(formData);
      setShowCreate(false);
    });
  }

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateMedicalTest(formData);
      setEditing(null);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteMedicalTest(id);
      setDeletingId(null);
    });
  }

  const TestForm = ({
    test,
    action,
    onClose,
    submitLabel,
  }: {
    test?: MedicalTest;
    action: (f: FormData) => void;
    onClose: () => void;
    submitLabel: string;
  }) => (
    <form action={action}>
      {test && <input type="hidden" name="id" value={test.id} />}
      <Field
        label="Test Name"
        name="name"
        required
        defaultValue={test?.name}
        placeholder="e.g. Fasting Blood Glucose"
      />
      <TextAreaField
        label="Description"
        name="description"
        defaultValue={test?.description ?? ""}
        placeholder="Optional description"
      />
      <SelectField
        label="Unit of Measure"
        name="iduom"
        required
        defaultValue={test?.iduom}
        options={uomOptions}
      />
      <SelectField
        label="Category"
        name="idcategory"
        required
        defaultValue={test?.idcategory}
        options={categoryOptions}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Normal Min"
          name="normalmin"
          type="number"
          step="0.01"
          defaultValue={test?.normalmin?.toString() ?? ""}
          placeholder="e.g. 70"
        />
        <Field
          label="Normal Max"
          name="normalmax"
          type="number"
          step="0.01"
          defaultValue={test?.normalmax?.toString() ?? ""}
          placeholder="e.g. 99"
        />
      </div>
      <FormActions
        onClose={onClose}
        submitLabel={isPending ? "Saving…" : submitLabel}
        submitColor="purple"
      />
    </form>
  );

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Medical Tests</h1>
          <p className="text-gray-500 text-sm mt-1">
            Medical tests with normal reference ranges, unit, and category.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Add Test
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="px-5 py-3 text-left font-semibold w-12">ID</th>
              <th className="px-5 py-3 text-left font-semibold">Test Name</th>
              <th className="px-5 py-3 text-left font-semibold">Category</th>
              <th className="px-5 py-3 text-left font-semibold">Unit</th>
              <th className="px-5 py-3 text-right font-semibold">Min</th>
              <th className="px-5 py-3 text-right font-semibold">Max</th>
              <th className="px-5 py-3 text-center font-semibold w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-8 text-center text-gray-400 italic"
                >
                  No records found.
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
                  <td className="px-5 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditing(test)}
                        className="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 font-medium px-3 py-1 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(test.id)}
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
          {tests.length} record{tests.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <Modal title="Add Medical Test" onClose={() => setShowCreate(false)}>
          <TestForm
            action={handleCreate}
            onClose={() => setShowCreate(false)}
            submitLabel="Save"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editing && (
        <Modal title="Edit Medical Test" onClose={() => setEditing(null)}>
          <TestForm
            test={editing}
            action={handleUpdate}
            onClose={() => setEditing(null)}
            submitLabel="Update"
          />
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {deletingId !== null && (
        <Modal title="Confirm Delete" onClose={() => setDeletingId(null)}>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to delete this medical test? This action
            cannot be undone.
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
