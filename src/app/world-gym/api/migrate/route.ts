import { NextResponse } from "next/server";
import pool from "@/lib/gym-db";

export async function GET() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS gym_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL UNIQUE,
        alternate_phone VARCHAR(20),
        village VARCHAR(255),
        tehsil VARCHAR(255),
        district VARCHAR(255),
        state VARCHAR(100) DEFAULT 'Bihar',
        pincode VARCHAR(10),
        aadhar VARCHAR(20),
        fee INTEGER DEFAULT 500,
        join_date DATE DEFAULT CURRENT_DATE,
        reference VARCHAR(255),
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS gym_fees (
        id SERIAL PRIMARY KEY,
        member_id INTEGER REFERENCES gym_members(id),
        amount INTEGER NOT NULL,
        month VARCHAR(20) NOT NULL,
        year INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        paid_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return NextResponse.json({ success: true, message: "Gym tables created!" });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}
