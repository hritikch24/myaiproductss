import { NextResponse } from 'next/server';
import pool from '@/lib/padhai-db';

export async function GET() {
  try {
    // Clear existing chapters
    await pool.query(`DELETE FROM padhai_chapters`);

    // Add unique constraint if not exists
    await pool.query(`
      ALTER TABLE padhai_chapters
      ADD CONSTRAINT unique_chapter_subject_class UNIQUE (subject_id, name, class)
    `).catch(() => {});

    // Seed subjects first
    const subjects = [
      { name: 'Physics', exam_type: 'BOTH' },
      { name: 'Chemistry', exam_type: 'BOTH' },
      { name: 'Mathematics', exam_type: 'JEE' },
      { name: 'Biology', exam_type: 'NEET' },
    ];

    for (const subject of subjects) {
      await pool.query(
        `INSERT INTO padhai_subjects (name, exam_type) VALUES ($1, $2) ON CONFLICT (name, exam_type) DO NOTHING`,
        [subject.name, subject.exam_type]
      );
    }

    // Get subject IDs
    const physicsResult = await pool.query(`SELECT id FROM padhai_subjects WHERE name = 'Physics' AND exam_type = 'BOTH'`);
    const chemistryResult = await pool.query(`SELECT id FROM padhai_subjects WHERE name = 'Chemistry' AND exam_type = 'BOTH'`);
    const mathResult = await pool.query(`SELECT id FROM padhai_subjects WHERE name = 'Mathematics' AND exam_type = 'JEE'`);
    const biologyResult = await pool.query(`SELECT id FROM padhai_subjects WHERE name = 'Biology' AND exam_type = 'NEET'`);

    const physicsId = physicsResult.rows[0]?.id;
    const chemistryId = chemistryResult.rows[0]?.id;
    const mathId = mathResult.rows[0]?.id;
    const biologyId = biologyResult.rows[0]?.id;

    // ═══════════════════════════════════════════════════
    // NCERT Revised Syllabus 2025-26
    // Source: https://ncert.nic.in/syllabus.php
    // ═══════════════════════════════════════════════════

    const allChapters = [
      // ── Physics Class 11 (14 chapters) ──
      ...[{ physics: physicsId, class: '11', chapters: [
        { name: 'Units and Measurements', order: 1, hours: 8 },
        { name: 'Motion in a Straight Line', order: 2, hours: 10 },
        { name: 'Motion in a Plane', order: 3, hours: 10 },
        { name: 'Laws of Motion', order: 4, hours: 10 },
        { name: 'Work, Energy and Power', order: 5, hours: 10 },
        { name: 'System of Particles and Rotational Motion', order: 6, hours: 12 },
        { name: 'Gravitation', order: 7, hours: 8 },
        { name: 'Mechanical Properties of Solids', order: 8, hours: 6 },
        { name: 'Mechanical Properties of Fluids', order: 9, hours: 8 },
        { name: 'Thermal Properties of Matter', order: 10, hours: 8 },
        { name: 'Thermodynamics', order: 11, hours: 10 },
        { name: 'Kinetic Theory', order: 12, hours: 6 },
        { name: 'Oscillations', order: 13, hours: 8 },
        { name: 'Waves', order: 14, hours: 10 },
      ]}],

      // ── Physics Class 12 (14 chapters) ──
      ...[{ physics: physicsId, class: '12', chapters: [
        { name: 'Electric Charges and Fields', order: 1, hours: 10 },
        { name: 'Electrostatic Potential and Capacitance', order: 2, hours: 10 },
        { name: 'Current Electricity', order: 3, hours: 12 },
        { name: 'Moving Charges and Magnetism', order: 4, hours: 10 },
        { name: 'Magnetism and Matter', order: 5, hours: 8 },
        { name: 'Electromagnetic Induction', order: 6, hours: 10 },
        { name: 'Alternating Current', order: 7, hours: 10 },
        { name: 'Electromagnetic Waves', order: 8, hours: 6 },
        { name: 'Ray Optics and Optical Instruments', order: 9, hours: 12 },
        { name: 'Wave Optics', order: 10, hours: 10 },
        { name: 'Dual Nature of Radiation and Matter', order: 11, hours: 10 },
        { name: 'Atoms', order: 12, hours: 8 },
        { name: 'Nuclei', order: 13, hours: 8 },
        { name: 'Semiconductor Electronics', order: 14, hours: 12 },
      ]}],

      // ── Chemistry Class 11 (9 chapters — NCERT Revised) ──
      ...[{ chemistry: chemistryId, class: '11', chapters: [
        { name: 'Some Basic Concepts of Chemistry', order: 1, hours: 8 },
        { name: 'Structure of Atom', order: 2, hours: 10 },
        { name: 'Classification of Elements and Periodicity in Properties', order: 3, hours: 8 },
        { name: 'Chemical Bonding and Molecular Structure', order: 4, hours: 10 },
        { name: 'Chemical Thermodynamics', order: 5, hours: 10 },
        { name: 'Equilibrium', order: 6, hours: 10 },
        { name: 'Redox Reactions', order: 7, hours: 6 },
        { name: 'Organic Chemistry - Some Basic Principles and Techniques', order: 8, hours: 10 },
        { name: 'Hydrocarbons', order: 9, hours: 10 },
      ]}],

      // ── Chemistry Class 12 (10 chapters — NCERT Revised) ──
      ...[{ chemistry: chemistryId, class: '12', chapters: [
        { name: 'Solutions', order: 1, hours: 10 },
        { name: 'Electrochemistry', order: 2, hours: 10 },
        { name: 'Chemical Kinetics', order: 3, hours: 8 },
        { name: 'd and f Block Elements', order: 4, hours: 10 },
        { name: 'Coordination Compounds', order: 5, hours: 12 },
        { name: 'Haloalkanes and Haloarenes', order: 6, hours: 10 },
        { name: 'Alcohols, Phenols and Ethers', order: 7, hours: 10 },
        { name: 'Aldehydes, Ketones and Carboxylic Acids', order: 8, hours: 12 },
        { name: 'Amines', order: 9, hours: 8 },
        { name: 'Biomolecules', order: 10, hours: 10 },
      ]}],

      // ── Mathematics Class 11 (14 chapters) ──
      ...[{ math: mathId, class: '11', chapters: [
        { name: 'Sets', order: 1, hours: 8 },
        { name: 'Relations and Functions', order: 2, hours: 8 },
        { name: 'Trigonometric Functions', order: 3, hours: 12 },
        { name: 'Complex Numbers and Quadratic Equations', order: 4, hours: 10 },
        { name: 'Linear Inequalities', order: 5, hours: 8 },
        { name: 'Permutations and Combinations', order: 6, hours: 10 },
        { name: 'Binomial Theorem', order: 7, hours: 8 },
        { name: 'Sequences and Series', order: 8, hours: 10 },
        { name: 'Straight Lines', order: 9, hours: 8 },
        { name: 'Conic Sections', order: 10, hours: 12 },
        { name: 'Introduction to Three Dimensional Geometry', order: 11, hours: 8 },
        { name: 'Limits and Derivatives', order: 12, hours: 12 },
        { name: 'Statistics', order: 13, hours: 8 },
        { name: 'Probability', order: 14, hours: 10 },
      ]}],

      // ── Mathematics Class 12 (13 chapters) ──
      ...[{ math: mathId, class: '12', chapters: [
        { name: 'Relations and Functions', order: 1, hours: 8 },
        { name: 'Inverse Trigonometric Functions', order: 2, hours: 10 },
        { name: 'Matrices', order: 3, hours: 12 },
        { name: 'Determinants', order: 4, hours: 10 },
        { name: 'Continuity and Differentiability', order: 5, hours: 12 },
        { name: 'Applications of Derivatives', order: 6, hours: 14 },
        { name: 'Integrals', order: 7, hours: 16 },
        { name: 'Applications of the Integrals', order: 8, hours: 10 },
        { name: 'Differential Equations', order: 9, hours: 12 },
        { name: 'Vectors', order: 10, hours: 12 },
        { name: 'Three Dimensional Geometry', order: 11, hours: 12 },
        { name: 'Linear Programming', order: 12, hours: 8 },
        { name: 'Probability', order: 13, hours: 12 },
      ]}],

      // ── Biology Class 11 (19 chapters — NCERT Revised) ──
      ...[{ biology: biologyId, class: '11', chapters: [
        { name: 'The Living World', order: 1, hours: 6 },
        { name: 'Biological Classification', order: 2, hours: 8 },
        { name: 'Plant Kingdom', order: 3, hours: 8 },
        { name: 'Animal Kingdom', order: 4, hours: 12 },
        { name: 'Morphology of Flowering Plants', order: 5, hours: 10 },
        { name: 'Anatomy of Flowering Plants', order: 6, hours: 8 },
        { name: 'Structural Organisation in Animals', order: 7, hours: 8 },
        { name: 'Cell - The Unit of Life', order: 8, hours: 10 },
        { name: 'Biomolecules', order: 9, hours: 10 },
        { name: 'Cell Cycle and Cell Division', order: 10, hours: 8 },
        { name: 'Photosynthesis in Higher Plants', order: 11, hours: 10 },
        { name: 'Respiration in Plants', order: 12, hours: 8 },
        { name: 'Plant Growth and Development', order: 13, hours: 8 },
        { name: 'Breathing and Exchange of Gases', order: 14, hours: 8 },
        { name: 'Body Fluids and Circulation', order: 15, hours: 10 },
        { name: 'Excretory Products and their Elimination', order: 16, hours: 8 },
        { name: 'Locomotion and Movement', order: 17, hours: 8 },
        { name: 'Neural Control and Coordination', order: 18, hours: 10 },
        { name: 'Chemical Coordination and Integration', order: 19, hours: 8 },
      ]}],

      // ── Biology Class 12 (13 chapters — NCERT Revised) ──
      ...[{ biology: biologyId, class: '12', chapters: [
        { name: 'Sexual Reproduction in Flowering Plants', order: 1, hours: 12 },
        { name: 'Human Reproduction', order: 2, hours: 12 },
        { name: 'Reproductive Health', order: 3, hours: 8 },
        { name: 'Principles of Inheritance and Variation', order: 4, hours: 14 },
        { name: 'Molecular Basis of Inheritance', order: 5, hours: 16 },
        { name: 'Evolution', order: 6, hours: 12 },
        { name: 'Human Health and Diseases', order: 7, hours: 12 },
        { name: 'Microbes in Human Welfare', order: 8, hours: 10 },
        { name: 'Biotechnology - Principles and Processes', order: 9, hours: 12 },
        { name: 'Biotechnology and its Application', order: 10, hours: 12 },
        { name: 'Organisms and Populations', order: 11, hours: 10 },
        { name: 'Ecosystem', order: 12, hours: 10 },
        { name: 'Biodiversity and its Conservation', order: 13, hours: 8 },
      ]}],
    ];

    for (const group of allChapters) {
      const subjectId = group.physics || group.chemistry || group.math || group.biology;
      const examType = group.physics ? 'BOTH' : group.chemistry ? 'BOTH' : group.math ? 'JEE' : 'NEET';

      for (const chapter of group.chapters) {
        await pool.query(
          `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type)
           VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (subject_id, name, class) DO NOTHING`,
          [subjectId, chapter.name, group.class, chapter.order, chapter.hours, examType]
        );
      }
    }

    const count = await pool.query(`SELECT COUNT(*) as count FROM padhai_chapters`);
    return NextResponse.json({ success: true, message: `Seeded ${count.rows[0].count} chapters` });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
