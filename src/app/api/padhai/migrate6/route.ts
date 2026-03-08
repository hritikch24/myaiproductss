import { NextResponse } from 'next/server';
import pool from '@/lib/padhai-db';

export async function GET() {
  try {
    // Add board column if not exists
    await pool.query(`
      ALTER TABLE padhai_students 
      ADD COLUMN IF NOT EXISTS board VARCHAR(20) DEFAULT 'CBSE';
    `);

    // Add board column to chapters if not exists
    await pool.query(`
      ALTER TABLE padhai_chapters 
      ADD COLUMN IF NOT EXISTS board VARCHAR(20) DEFAULT 'BOTH';
    `);

    // Update existing chapters to include board-specific content
    // Physics chapters for Class 11
    const physics11Chapters = [
      { name: "Units and Measurement", hours: 10, order: 1 },
      { name: "Motion in a Straight Line", hours: 12, order: 2 },
      { name: "Motion in a Plane", hours: 12, order: 3 },
      { name: "Laws of Motion", hours: 14, order: 4 },
      { name: "Work, Energy and Power", hours: 14, order: 5 },
      { name: "System of Particles and Rotational Motion", hours: 14, order: 6 },
      { name: "Gravitation", hours: 10, order: 7 },
      { name: "Mechanical Properties of Solids", hours: 10, order: 8 },
      { name: "Mechanical Properties of Fluids", hours: 10, order: 9 },
      { name: "Thermal Properties of Matter", hours: 12, order: 10 },
      { name: "Thermodynamics", hours: 12, order: 11 },
      { name: "Kinetic Theory", hours: 8, order: 12 },
      { name: "Oscillations", hours: 10, order: 13 },
      { name: "Waves", hours: 10, order: 14 },
    ];

    // Chemistry chapters for Class 11
    const chemistry11Chapters = [
      { name: "Some Basic Concepts of Chemistry", hours: 8, order: 1 },
      { name: "Structure of Atom", hours: 10, order: 2 },
      { name: "Classification of Elements", hours: 10, order: 3 },
      { name: "Chemical Bonding", hours: 12, order: 4 },
      { name: "States of Matter", hours: 10, order: 5 },
      { name: "Thermodynamics", hours: 12, order: 6 },
      { name: "Equilibrium", hours: 12, order: 7 },
      { name: "Redox Reactions", hours: 8, order: 8 },
      { name: "Hydrogen", hours: 6, order: 9 },
      { name: "s-Block Elements", hours: 8, order: 10 },
      { name: "p-Block Elements", hours: 10, order: 11 },
      { name: "Organic Chemistry", hours: 12, order: 12 },
      { name: "Hydrocarbons", hours: 10, order: 13 },
      { name: "Environmental Chemistry", hours: 6, order: 14 },
    ];

    // Math chapters for Class 11
    const math11Chapters = [
      { name: "Sets", hours: 8, order: 1 },
      { name: "Relations and Functions", hours: 10, order: 2 },
      { name: "Trigonometric Functions", hours: 14, order: 3 },
      { name: "Mathematical Induction", hours: 8, order: 4 },
      { name: "Complex Numbers", hours: 10, order: 5 },
      { name: "Linear Inequalities", hours: 10, order: 6 },
      { name: "Permutations and Combinations", hours: 12, order: 7 },
      { name: "Binomial Theorem", hours: 10, order: 8 },
      { name: "Sequences and Series", hours: 10, order: 9 },
      { name: "Straight Lines", hours: 8, order: 10 },
      { name: "Conic Sections", hours: 12, order: 11 },
      { name: "Introduction to 3D Geometry", hours: 8, order: 12 },
      { name: "Limits and Derivatives", hours: 14, order: 13 },
      { name: "Probability", hours: 12, order: 14 },
    ];

    // Physics chapters for Class 12
    const physics12Chapters = [
      { name: "Electric Charges and Fields", hours: 12, order: 1 },
      { name: "Electrostatic Potential and Capacitance", hours: 12, order: 2 },
      { name: "Current Electricity", hours: 14, order: 3 },
      { name: "Moving Charges and Magnetism", hours: 12, order: 4 },
      { name: "Magnetism and Matter", hours: 10, order: 5 },
      { name: "Electromagnetic Induction", hours: 10, order: 6 },
      { name: "Alternating Current", hours: 12, order: 7 },
      { name: "Electromagnetic Waves", hours: 8, order: 8 },
      { name: "Ray Optics and Optical Instruments", hours: 14, order: 9 },
      { name: "Wave Optics", hours: 12, order: 10 },
      { name: "Dual Nature of Radiation", hours: 10, order: 11 },
      { name: "Atoms", hours: 8, order: 12 },
      { name: "Nuclei", hours: 8, order: 13 },
      { name: "Semiconductor Electronics", hours: 12, order: 14 },
    ];

    // Chemistry chapters for Class 12
    const chemistry12Chapters = [
      { name: "Solid State", hours: 10, order: 1 },
      { name: "Solutions", hours: 10, order: 2 },
      { name: "Electrochemistry", hours: 10, order: 3 },
      { name: "Chemical Kinetics", hours: 10, order: 4 },
      { name: "Surface Chemistry", hours: 8, order: 5 },
      { name: "p-Block Elements", hours: 12, order: 6 },
      { name: "d-Block and f-Block Elements", hours: 10, order: 7 },
      { name: "Coordination Compounds", hours: 12, order: 8 },
      { name: "Haloalkanes and Haloarenes", hours: 10, order: 9 },
      { name: "Alcohols, Phenols and Ethers", hours: 10, order: 10 },
      { name: "Aldehydes, Ketones and Carboxylic Acids", hours: 12, order: 11 },
      { name: "Amines", hours: 8, order: 12 },
      { name: "Biomolecules", hours: 10, order: 13 },
      { name: "Polymers", hours: 8, order: 14 },
    ];

    // Math chapters for Class 12
    const math12Chapters = [
      { name: "Relations and Functions", hours: 10, order: 1 },
      { name: "Inverse Trigonometric Functions", hours: 10, order: 2 },
      { name: "Matrices", hours: 12, order: 3 },
      { name: "Determinants", hours: 10, order: 4 },
      { name: "Continuity and Differentiability", hours: 14, order: 5 },
      { name: "Application of Derivatives", hours: 14, order: 6 },
      { name: "Integrals", hours: 16, order: 7 },
      { name: "Application of Integrals", hours: 10, order: 8 },
      { name: "Differential Equations", hours: 12, order: 9 },
      { name: "Vector Algebra", hours: 12, order: 10 },
      { name: "Three Dimensional Geometry", hours: 12, order: 11 },
      { name: "Linear Programming", hours: 8, order: 12 },
      { name: "Probability", hours: 12, order: 13 },
    ];

    // Biology chapters for Class 11 (NEET)
    const bio11Chapters = [
      { name: "The Living World", hours: 8, order: 1 },
      { name: "Biological Classification", hours: 10, order: 2 },
      { name: "Plant Kingdom", hours: 10, order: 3 },
      { name: "Animal Kingdom", hours: 12, order: 4 },
      { name: "Structural Organisation in Animals", hours: 10, order: 5 },
      { name: "Cell: The Unit of Life", hours: 12, order: 6 },
      { name: "Cell Cycle and Cell Division", hours: 10, order: 7 },
      { name: "Transport in Plants", hours: 8, order: 8 },
      { name: "Mineral Nutrition", hours: 8, order: 9 },
      { name: "Photosynthesis in Higher Plants", hours: 10, order: 10 },
      { name: "Respiration in Plants", hours: 8, order: 11 },
      { name: "Plant Growth and Development", hours: 8, order: 12 },
      { name: "Digestion and Absorption", hours: 10, order: 13 },
      { name: "Breathing and Exchange of Gases", hours: 8, order: 14 },
      { name: "Body Fluids and Circulation", hours: 10, order: 15 },
      { name: "Excretory Products", hours: 8, order: 16 },
      { name: "Locomotion and Movement", hours: 8, order: 17 },
      { name: "Neural Control and Coordination", hours: 10, order: 18 },
      { name: "Chemical Coordination", hours: 10, order: 19 },
    ];

    // Biology chapters for Class 12 (NEET)
    const bio12Chapters = [
      { name: "Reproduction in Organisms", hours: 8, order: 1 },
      { name: "Sexual Reproduction in Flowering Plants", hours: 12, order: 2 },
      { name: "Human Reproduction", hours: 12, order: 3 },
      { name: "Reproductive Health", hours: 8, order: 4 },
      { name: "Principles of Inheritance", hours: 14, order: 5 },
      { name: "Molecular Basis of Inheritance", hours: 14, order: 6 },
      { name: "Evolution", hours: 12, order: 7 },
      { name: "Human Health and Disease", hours: 10, order: 8 },
      { name: "Strategies for Enhancement", hours: 8, order: 9 },
      { name: "Microbes in Human Welfare", hours: 8, order: 10 },
      { name: "Biotechnology: Principles", hours: 12, order: 11 },
      { name: "Biotechnology and its Applications", hours: 12, order: 12 },
      { name: "Organisms and Populations", hours: 10, order: 13 },
      { name: "Ecosystem", hours: 10, order: 14 },
      { name: "Biodiversity and Conservation", hours: 8, order: 15 },
      { name: "Environmental Issues", hours: 10, order: 16 },
    ];

    // Insert subjects
    const subjects = [
      { name: "Physics", exam: "JEE" },
      { name: "Chemistry", exam: "JEE" },
      { name: "Mathematics", exam: "JEE" },
      { name: "Physics", exam: "NEET" },
      { name: "Chemistry", exam: "NEET" },
      { name: "Biology", exam: "NEET" },
    ];

    for (const sub of subjects) {
      await pool.query(
        `INSERT INTO padhai_subjects (name, exam_type) VALUES ($1, $2) ON CONFLICT (name, exam_type) DO NOTHING`,
        [sub.name, sub.exam]
      );
    }

    // Insert chapters for each class and exam
    const chapterData = [
      { class: "11", exam: "JEE", chapters: [...physics11Chapters, ...chemistry11Chapters, ...math11Chapters], subject: "Physics,Chemistry,Mathematics" },
      { class: "12", exam: "JEE", chapters: [...physics12Chapters, ...chemistry12Chapters, ...math12Chapters], subject: "Physics,Chemistry,Mathematics" },
      { class: "11", exam: "NEET", chapters: [...physics11Chapters, ...chemistry11Chapters, ...bio11Chapters], subject: "Physics,Chemistry,Biology" },
      { class: "12", exam: "NEET", chapters: [...physics12Chapters, ...chemistry12Chapters, ...bio12Chapters], subject: "Physics,Chemistry,Biology" },
    ];

    let totalChapters = 0;

    for (const data of chapterData) {
      const subjectsList = data.subject.split(',');
      
      for (const subjectName of subjectsList) {
        const subjResult = await pool.query(
          "SELECT id FROM padhai_subjects WHERE name = $1 AND exam_type = $2",
          [subjectName, data.exam]
        );
        
        if (subjResult.rows.length > 0) {
          const subjectId = subjResult.rows[0].id;
          
          for (const chapter of data.chapters) {
            if (subjectName === "Physics" && chapter.name in physics11Chapters) {
              await pool.query(
                `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type, board)
                 VALUES ($1, $2, $3, $4, $5, $6, 'BOTH')
                 ON CONFLICT DO NOTHING`,
                [subjectId, chapter.name, data.class, chapter.order, chapter.hours, data.exam]
              );
              totalChapters++;
            }
            if (subjectName === "Chemistry" && chapter.name in chemistry11Chapters) {
              await pool.query(
                `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type, board)
                 VALUES ($1, $2, $3, $4, $5, $6, 'BOTH')
                 ON CONFLICT DO NOTHING`,
                [subjectId, chapter.name, data.class, chapter.order, chapter.hours, data.exam]
              );
              totalChapters++;
            }
            if (subjectName === "Mathematics" && chapter.name in math11Chapters) {
              await pool.query(
                `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type, board)
                 VALUES ($1, $2, $3, $4, $5, $6, 'BOTH')
                 ON CONFLICT DO NOTHING`,
                [subjectId, chapter.name, data.class, chapter.order, chapter.hours, data.exam]
              );
              totalChapters++;
            }
            if (subjectName === "Biology" && chapter.name in bio11Chapters) {
              await pool.query(
                `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type, board)
                 VALUES ($1, $2, $3, $4, $5, $6, 'BOTH')
                 ON CONFLICT DO NOTHING`,
                [subjectId, chapter.name, data.class, chapter.order, chapter.hours, data.exam]
              );
              totalChapters++;
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: `Board support added. ${totalChapters} chapters seeded.` });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
