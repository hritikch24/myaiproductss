import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Seed subjects
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

    // Class 11 Physics chapters
    const physics11Chapters = [
      { name: 'Units and Measurement', order: 1, hours: 8 },
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
    ];

    // Class 11 Chemistry chapters
    const chemistry11Chapters = [
      { name: 'Some Basic Concepts of Chemistry', order: 1, hours: 8 },
      { name: 'Structure of Atom', order: 2, hours: 10 },
      { name: 'Classification of Elements and Periodicity', order: 3, hours: 6 },
      { name: 'Chemical Bonding and Molecular Structure', order: 4, hours: 10 },
      { name: 'States of Matter', order: 5, hours: 8 },
      { name: 'Thermodynamics', order: 6, hours: 10 },
      { name: 'Equilibrium', order: 7, hours: 10 },
      { name: 'Redox Reactions', order: 8, hours: 6 },
      { name: 'Hydrogen', order: 9, hours: 6 },
      { name: 'The s-Block Elements', order: 10, hours: 8 },
      { name: 'The p-Block Elements', order: 11, hours: 10 },
      { name: 'Organic Chemistry - Basic Principles', order: 12, hours: 10 },
      { name: 'Hydrocarbons', order: 13, hours: 10 },
      { name: 'Environmental Chemistry', order: 14, hours: 6 },
    ];

    // Class 11 Math chapters
    const math11Chapters = [
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
    ];

    // Class 11 Biology chapters
    const biology11Chapters = [
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
      { name: 'Transport in Plants', order: 11, hours: 8 },
      { name: 'Mineral Nutrition', order: 12, hours: 6 },
      { name: 'Photosynthesis in Higher Plants', order: 13, hours: 10 },
      { name: 'Respiration in Plants', order: 14, hours: 8 },
      { name: 'Plant Growth and Development', order: 15, hours: 8 },
      { name: 'Digestion and Absorption', order: 16, hours: 10 },
      { name: 'Breathing and Exchange of Gases', order: 17, hours: 8 },
      { name: 'Body Fluids and Circulation', order: 18, hours: 10 },
      { name: 'Excretory Products and their Elimination', order: 19, hours: 8 },
      { name: 'Locomotion and Movement', order: 20, hours: 8 },
      { name: 'Neural Control and Coordination', order: 21, hours: 10 },
      { name: 'Chemical Coordination and Integration', order: 22, hours: 10 },
    ];

    // Insert chapters for Physics
    for (const chapter of physics11Chapters) {
      await pool.query(
        `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type) 
         VALUES ($1, $2, '11', $3, $4, 'BOTH') ON CONFLICT DO NOTHING`,
        [physicsId, chapter.name, chapter.order, chapter.hours]
      );
    }

    // Insert chapters for Chemistry
    for (const chapter of chemistry11Chapters) {
      await pool.query(
        `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type) 
         VALUES ($1, $2, '11', $3, $4, 'BOTH') ON CONFLICT DO NOTHING`,
        [chemistryId, chapter.name, chapter.order, chapter.hours]
      );
    }

    // Insert chapters for Math
    for (const chapter of math11Chapters) {
      await pool.query(
        `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type) 
         VALUES ($1, $2, '11', $3, $4, 'JEE') ON CONFLICT DO NOTHING`,
        [mathId, chapter.name, chapter.order, chapter.hours]
      );
    }

    // Insert chapters for Biology
    for (const chapter of biology11Chapters) {
      await pool.query(
        `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type) 
         VALUES ($1, $2, '11', $3, $4, 'NEET') ON CONFLICT DO NOTHING`,
        [biologyId, chapter.name, chapter.order, chapter.hours]
      );
    }

    // Add Class 12 chapters (simplified for now - can add more later)
    const physics12Chapters = [
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
    ];

    const chemistry12Chapters = [
      { name: 'Solid State', order: 1, hours: 8 },
      { name: 'Solutions', order: 2, hours: 10 },
      { name: 'Electrochemistry', order: 3, hours: 10 },
      { name: 'Chemical Kinetics', order: 4, hours: 8 },
      { name: 'Surface Chemistry', order: 5, hours: 8 },
      { name: 'General Principles and Processes of Isolation of Elements', order: 6, hours: 8 },
      { name: 'The p-Block Elements', order: 7, hours: 12 },
      { name: 'The d and f Block Elements', order: 8, hours: 10 },
      { name: 'Coordination Compounds', order: 9, hours: 12 },
      { name: 'Haloalkanes and Haloarenes', order: 10, hours: 10 },
      { name: 'Alcohols, Phenols and Ethers', order: 11, hours: 10 },
      { name: 'Aldehydes, Ketones and Carboxylic Acids', order: 12, hours: 12 },
      { name: 'Amines', order: 13, hours: 8 },
      { name: 'Biomolecules', order: 14, hours: 10 },
      { name: 'Polymers', order: 15, hours: 8 },
      { name: 'Chemistry in Everyday Life', order: 16, hours: 6 },
    ];

    // Insert Class 12 chapters
    for (const chapter of physics12Chapters) {
      await pool.query(
        `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type) 
         VALUES ($1, $2, '12', $3, $4, 'BOTH') ON CONFLICT DO NOTHING`,
        [physicsId, chapter.name, chapter.order, chapter.hours]
      );
    }

    for (const chapter of chemistry12Chapters) {
      await pool.query(
        `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type) 
         VALUES ($1, $2, '12', $3, $4, 'BOTH') ON CONFLICT DO NOTHING`,
        [chemistryId, chapter.name, chapter.order, chapter.hours]
      );
    }

    // Add Class 12 Math chapters
    const math12Chapters = [
      { name: 'Relations and Functions', order: 1, hours: 8 },
      { name: 'Inverse Trigonometric Functions', order: 2, hours: 10 },
      { name: 'Matrices', order: 3, hours: 12 },
      { name: 'Determinants', order: 4, hours: 10 },
      { name: 'Continuity and Differentiability', order: 5, hours: 12 },
      { name: 'Application of Derivatives', order: 6, hours: 14 },
      { name: 'Integrals', order: 7, hours: 16 },
      { name: 'Application of Integrals', order: 8, hours: 10 },
      { name: 'Differential Equations', order: 9, hours: 12 },
      { name: 'Vector Algebra', order: 10, hours: 12 },
      { name: 'Three Dimensional Geometry', order: 11, hours: 12 },
      { name: 'Linear Programming', order: 12, hours: 8 },
      { name: 'Probability', order: 13, hours: 12 },
    ];

    for (const chapter of math12Chapters) {
      await pool.query(
        `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type) 
         VALUES ($1, $2, '12', $3, $4, 'JEE') ON CONFLICT DO NOTHING`,
        [mathId, chapter.name, chapter.order, chapter.hours]
      );
    }

    // Add Class 12 Biology chapters
    const biology12Chapters = [
      { name: 'Reproduction in Organisms', order: 1, hours: 8 },
      { name: 'Sexual Reproduction in Flowering Plants', order: 2, hours: 12 },
      { name: 'Human Reproduction', order: 3, hours: 12 },
      { name: 'Reproductive Health', order: 4, hours: 8 },
      { name: 'Principles of Inheritance and Variation', order: 5, hours: 14 },
      { name: 'Molecular Basis of Inheritance', order: 6, hours: 16 },
      { name: 'Evolution', order: 7, hours: 12 },
      { name: 'Human Health and Disease', order: 8, hours: 12 },
      { name: 'Strategies for Enhancement in Food Production', order: 9, hours: 10 },
      { name: 'Microbes in Human Welfare', order: 10, hours: 10 },
      { name: 'Biotechnology - Principles and Processes', order: 11, hours: 12 },
      { name: 'Biotechnology and its Applications', order: 12, hours: 12 },
      { name: 'Organisms and Populations', order: 13, hours: 10 },
      { name: 'Ecosystem', order: 14, hours: 10 },
      { name: 'Biodiversity and Conservation', order: 15, hours: 8 },
      { name: 'Environmental Issues', order: 16, hours: 10 },
    ];

    for (const chapter of biology12Chapters) {
      await pool.query(
        `INSERT INTO padhai_chapters (subject_id, name, class, chapter_order, estimated_hours, exam_type) 
         VALUES ($1, $2, '12', $3, $4, 'NEET') ON CONFLICT DO NOTHING`,
        [biologyId, chapter.name, chapter.order, chapter.hours]
      );
    }

    return NextResponse.json({ success: true, message: 'Padhai syllabus seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
