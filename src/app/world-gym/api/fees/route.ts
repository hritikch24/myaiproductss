import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/gym-db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT gf.*, gm.name, gm.phone, gm.fee as member_fee
      FROM gym_fees gf
      JOIN gym_members gm ON gf.member_id = gm.id
      ORDER BY gf.created_at DESC
    `);
    return NextResponse.json({ fees: result.rows });
  } catch (error) {
    console.error("Get fees error:", error);
    return NextResponse.json({ error: "Failed to fetch fees" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const result = await pool.query(
      `INSERT INTO gym_fees (member_id, amount, month, year, status, paid_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.memberId,
        data.amount,
        data.month,
        data.year,
        data.status || 'pending',
        data.status === 'paid' ? new Date() : null
      ]
    );

    return NextResponse.json({ fee: result.rows[0] });
  } catch (error) {
    console.error("Add fee error:", error);
    return NextResponse.json({ error: "Failed to add fee" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    
    const result = await pool.query(
      `UPDATE gym_fees 
       SET status = $1, paid_date = $2
       WHERE id = $3
       RETURNING *`,
      [
        data.status,
        data.status === 'paid' ? new Date() : null,
        data.id
      ]
    );

    return NextResponse.json({ fee: result.rows[0] });
  } catch (error) {
    console.error("Update fee error:", error);
    return NextResponse.json({ error: "Failed to update fee" }, { status: 500 });
  }
}
