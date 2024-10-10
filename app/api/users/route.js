import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();
    const [result] = await pool.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    return NextResponse.json({ id: result.insertId, name, email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
