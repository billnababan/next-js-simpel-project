import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
