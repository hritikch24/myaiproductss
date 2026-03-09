import { NextResponse } from 'next/server';
import pool from '@/lib/padhai-db';

export async function GET() {
  try {
    // Chapters for Class 6-10 (Foundation)
    const class6Chapters = [
      // Physics
      { name: "Motion and Measurement", hours: 8 },
      { name: "Light", hours: 10 },
      { name: "Force and Pressure", hours: 8 },
      { name: "Work and Energy", hours: 8 },
      // Chemistry
      { name: "Matter and Its Composition", hours: 8 },
      { name: "Physical and Chemical Changes", hours: 8 },
      { name: "Elements and Compounds", hours: 8 },
      { name: "Air and Water", hours: 6 },
      // Mathematics
      { name: "Number System", hours: 10 },
      { name: "Algebra Basics", hours: 12 },
      { name: "Geometry Basics", hours: 12 },
      { name: "Mensuration", hours: 10 },
      { name: "Decimals and Fractions", hours: 8 },
    ];

    const class7Chapters = [
      // Physics
      { name: "Motion and Time", hours: 8 },
      { name: "Heat and Temperature", hours: 10 },
      { name: "Light", hours: 10 },
      { name: "Electric Current", hours: 8 },
      // Chemistry
      { name: "Matter and Its Properties", hours: 8 },
      { name: "Acids and Bases", hours: 8 },
      { name: "Physical and Chemical Changes", hours: 8 },
      { name: "Air and Weather", hours: 8 },
      // Mathematics
      { name: "Integers", hours: 8 },
      { name: "Fractions and Decimals", hours: 10 },
      { name: "Algebraic Expressions", hours: 10 },
      { name: "Lines and Angles", hours: 10 },
      { name: "Triangle and Properties", hours: 10 },
      { name: "Data Handling", hours: 8 },
    ];

    const class8Chapters = [
      // Physics
      { name: "Force and Pressure", hours: 10 },
      { name: "Friction", hours: 8 },
      { name: "Sound", hours: 8 },
      { name: "Light", hours: 10 },
      { name: "Electricity and Magnetism", hours: 10 },
      // Chemistry
      { name: "Matter and Its Properties", hours: 8 },
      { name: "Combustion and Flame", hours: 8 },
      { name: "Metals and Non-metals", hours: 10 },
      { name: "Water and Air", hours: 8 },
      { name: "Soil and Pollution", hours: 8 },
      // Mathematics
      { name: "Rational Numbers", hours: 10 },
      { name: "Linear Equations", hours: 10 },
      { name: "Quadrilaterals", hours: 10 },
      { name: "Data Handling", hours: 8 },
      { name: "Probability", hours: 8 },
      { name: "Factorization", hours: 10 },
    ];

    const class9Chapters = [
      // Physics
      { name: "Motion", hours: 12 },
      { name: "Force and Laws of Motion", hours: 12 },
      { name: "Work and Energy", hours: 10 },
      { name: "Sound", hours: 10 },
      { name: "Gravitation", hours: 10 },
      // Chemistry
      { name: "Matter and Its Properties", hours: 10 },
      { name: "Structure of Atom", hours: 10 },
      { name: "Elements and Compounds", hours: 10 },
      { name: "Chemical Reactions", hours: 10 },
      { name: "Mole Concept", hours: 8 },
      // Mathematics
      { name: "Number Systems", hours: 10 },
      { name: "Polynomials", hours: 12 },
      { name: "Coordinate Geometry", hours: 10 },
      { name: "Linear Equations", hours: 10 },
      { name: "Triangles", hours: 12 },
      { name: "Quadrilaterals", hours: 10 },
      { name: "Area of Triangles", hours: 8 },
      { name: "Circles", hours: 10 },
      { name: "Heron's Formula", hours: 8 },
      { name: "Surface Areas", hours: 10 },
      { name: "Statistics", hours: 10 },
    ];

    const class10Chapters = [
      // Physics
      { name: "Light Reflection", hours: 12 },
      { name: "Light Refraction", hours: 12 },
      { name: "Human Eye", hours: 8 },
      { name: "Electricity", hours: 14 },
      { name: "Magnetic Effects", hours: 12 },
      { name: "Sources of Energy", hours: 8 },
      // Chemistry
      { name: "Chemical Reactions", hours: 10 },
      { name: "Acids and Bases", hours: 10 },
      { name: "Metals and Non-metals", hours: 12 },
      { name: "Carbon Compounds", hours: 12 },
      { name: "Periodic Classification", hours: 8 },
      // Mathematics
      { name: "Real Numbers", hours: 10 },
      { name: "Polynomials", hours: 10 },
      { name: "Linear Equations", hours: 8 },
      { name: "Quadratic Equations", hours: 12 },
      { name: "Arithmetic Progression", hours: 10 },
      { name: "Triangles", hours: 12 },
      { name: "Coordinate Geometry", hours: 10 },
      { name: "Trigonometry", hours: 14 },
      { name: "Statistics", hours: 10 },
      { name: "Probability", hours: 8 },
    ];

    const chapterData = [
      { class: "6", chapters: class6Chapters },
      { class: "7", chapters: class7Chapters },
      { class: "8", chapters: class8Chapters },
      { class: "9", chapters: class9Chapters },
      { class: "10", chapters: class10Chapters },
    ];

    // Ensure subjects exist for foundation
    const subjects = [
      { name: "Physics", exam: "FOUNDATION" },
      { name: "Chemistry", exam: "FOUNDATION" },
      { name: "Mathematics", exam: "FOUNDATION" },
    ];

    for (const sub of subjects) {
      await pool.query(
        `INSERT INTO padhai_subjects (name, exam_type) VALUES ($1, $2) ON CONFLICT (name, exam_type) DO NOTHING`,
        [sub.name, sub.exam]
      );
    }

    let totalChapters = 0;

    for (const data of chapterData) {
      const subjectsList = ["Physics", "Chemistry", "Mathematics"];
      
      for (const subjectName of subjectsList) {
        const subjResult = await pool.query(
          "SELECT id FROM padhai_subjects WHERE name = $1 AND exam_type = $2",
          [subjectName, "FOUNDATION"]
        );
        
        if (subjResult.rows.length > 0) {
          const subjectId = subjResult.rows[0].id;
          
          // Get chapters for this subject
          const subjectChapters = data.chapters.filter((_, i) => {
            const subjectsInData = ["Physics", "Chemistry", "Mathematics"];
            return subjectsInData.indexOf(subjectName) === Math.floor(i / Math.ceil(data.chapters.length / 3));
          });
          
          for (let i = 0; i < data.chapters.length; i++) {
            const chapter = data.chapters[i];
            let isThisSubject = false;
            
            if (subjectName === "Physics" && i < Math.ceil(data.chapters.length / 3)) isThisSubject = true;
            if (subjectName === "Chemistry" && i >= Math.ceil(data.chapters.length / 3) && i < Math.ceil(data.chapters.length * 2 / 3)) isThisSubject = true;
            if (subjectName === "Mathematics" && i >= Math.ceil(data.chapters.length * 2 / 3)) isThisSubject = true;
            
            if (isThisSubject) {
              await pool.query(
                `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type, board)
                 VALUES ($1, $2, $3, $4, $5, 'FOUNDATION', 'BOTH')
                 ON CONFLICT DO NOTHING`,
                [subjectId, chapter.name, data.class, i + 1, chapter.hours]
              );
              totalChapters++;
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: `Added ${totalChapters} chapters for classes 6-10.` });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
