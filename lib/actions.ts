"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";

// ─── UOM ────────────────────────────────────────────────────────────────────

export async function createUom(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim() || null;
  await pool.query("INSERT INTO uom (name, description) VALUES ($1, $2)", [
    name,
    description,
  ]);
  revalidatePath("/uom");
}

export async function updateUom(formData: FormData) {
  const id = formData.get("id") as string;
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim() || null;
  await pool.query(
    "UPDATE uom SET name=$1, description=$2 WHERE id=$3",
    [name, description, id]
  );
  revalidatePath("/uom");
}

export async function deleteUom(id: number) {
  await pool.query("DELETE FROM uom WHERE id=$1", [id]);
  revalidatePath("/uom");
}

// ─── TEST CATEGORIES ─────────────────────────────────────────────────────────

export async function createTestCategory(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim() || null;
  await pool.query(
    "INSERT INTO testcategories (name, description) VALUES ($1, $2)",
    [name, description]
  );
  revalidatePath("/testcategories");
}

export async function updateTestCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim() || null;
  await pool.query(
    "UPDATE testcategories SET name=$1, description=$2 WHERE id=$3",
    [name, description, id]
  );
  revalidatePath("/testcategories");
}

export async function deleteTestCategory(id: number) {
  await pool.query("DELETE FROM testcategories WHERE id=$1", [id]);
  revalidatePath("/testcategories");
}

// ─── MEDICAL TESTS ───────────────────────────────────────────────────────────

export async function createMedicalTest(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim() || null;
  const iduom = formData.get("iduom") as string;
  const idcategory = formData.get("idcategory") as string;
  const normalmin = formData.get("normalmin") as string;
  const normalmax = formData.get("normalmax") as string;
  await pool.query(
    `INSERT INTO medicaltests (name, description, iduom, idcategory, normalmin, normalmax)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      name,
      description,
      iduom,
      idcategory,
      normalmin ? parseFloat(normalmin) : null,
      normalmax ? parseFloat(normalmax) : null,
    ]
  );
  revalidatePath("/medicaltests");
}

export async function updateMedicalTest(formData: FormData) {
  const id = formData.get("id") as string;
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim() || null;
  const iduom = formData.get("iduom") as string;
  const idcategory = formData.get("idcategory") as string;
  const normalmin = formData.get("normalmin") as string;
  const normalmax = formData.get("normalmax") as string;
  await pool.query(
    `UPDATE medicaltests
     SET name=$1, description=$2, iduom=$3, idcategory=$4, normalmin=$5, normalmax=$6
     WHERE id=$7`,
    [
      name,
      description,
      iduom,
      idcategory,
      normalmin ? parseFloat(normalmin) : null,
      normalmax ? parseFloat(normalmax) : null,
      id,
    ]
  );
  revalidatePath("/medicaltests");
}

export async function deleteMedicalTest(id: number) {
  await pool.query("DELETE FROM medicaltests WHERE id=$1", [id]);
  revalidatePath("/medicaltests");
}
