import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/gym-db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM gym_members 
      ORDER BY created_at DESC
    `);
    return NextResponse.json({ members: result.rows });
  } catch (error) {
    console.error("Get members error:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const result = await pool.query(
      `INSERT INTO gym_members (name, phone, alternate_phone, village, tehsil, district, state, pincode, aadhar, fee, join_date, reference, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        data.name,
        data.phone,
        data.alternatePhone || null,
        data.village || null,
        data.tehsil || null,
        data.district || null,
        data.state || 'Bihar',
        data.pincode || null,
        data.aadhar || null,
        data.fee || 500,
        data.joinDate || new Date().toISOString().split('T')[0],
        data.reference || null,
        'active'
      ]
    );

    return NextResponse.json({ member: result.rows[0] });
  } catch (error: any) {
    console.error("Add member error:", error);
    if (error.code === '23505') {
      return NextResponse.json({ error: "Phone number already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to add member" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    
    const result = await pool.query(
      `UPDATE gym_members 
       SET name = $1, phone = $2, alternate_phone = $3, village = $4, tehsil = $5, district = $6, state = $7, pincode = $8, aadhar = $9, fee = $10, reference = $11, status = $12, updated_at = CURRENT_TIMESTAMP
       WHERE id = $13
       RETURNING *`,
      [
        data.name,
        data.phone,
        data.alternatePhone,
        data.village,
        data.tehsil,
        data.district,
        data.state,
        data.pincode,
        data.aadhar,
        data.fee,
        data.reference,
        data.status,
        data.id
      ]
    );

    return NextResponse.json({ member: result.rows[0] });
  } catch (error) {
    console.error("Update member error:", error);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "Member ID required" }, { status: 400 });
    }

    await pool.query('DELETE FROM gym_members WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete member error:", error);
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
