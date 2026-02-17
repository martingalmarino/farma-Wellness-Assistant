import { products, Product } from '@/data/products';
import { kits, Kit } from '@/data/kits';

export type WellnessGoal = 'sleep' | 'energy' | 'gut' | 'skin';

export interface AssistantAnswers {
  goal: WellnessGoal;
  question1?: string;
  question2?: string;
  question3?: string;
}

export interface Recommendation {
  recommendedProducts: Product[];
  recommendedKit: Kit | null;
  rationale: string[];
  warnings: string[];
}

interface QuestionOption {
  value: string;
  label: string;
  isSensitive?: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

// Define questions by goal
export const getQuestionsForGoal = (goal: WellnessGoal): Question[] => {
  const questionMap: Record<WellnessGoal, Question[]> = {
    sleep: [
      {
        id: 'sleep_q1',
        question: '¿Cuál es tu principal dificultad con el sueño?',
        options: [
          { value: 'onset', label: 'Me cuesta conciliar el sueño' },
          { value: 'quality', label: 'Me despierto durante la noche' },
          { value: 'both', label: 'Ambos problemas' },
        ],
      },
      {
        id: 'sleep_q2',
        question: '¿Experimentas estrés o ansiedad con frecuencia?',
        options: [
          { value: 'yes', label: 'Sí, a menudo' },
          { value: 'sometimes', label: 'A veces' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'sleep_q3',
        question: '¿Tienes alguna de estas condiciones?',
        options: [
          { value: 'none', label: 'Ninguna' },
          { value: 'pregnant', label: 'Embarazo o lactancia', isSensitive: true },
          { value: 'medication', label: 'Tomo medicamentos recetados', isSensitive: true },
        ],
      },
    ],
    energy: [
      {
        id: 'energy_q1',
        question: '¿Cuándo sientes más fatiga?',
        options: [
          { value: 'morning', label: 'Por la mañana' },
          { value: 'afternoon', label: 'Por la tarde' },
          { value: 'allday', label: 'Todo el día' },
        ],
      },
      {
        id: 'energy_q2',
        question: '¿Practicas actividad física regularmente?',
        options: [
          { value: 'yes', label: 'Sí, 3+ veces por semana' },
          { value: 'sometimes', label: 'Ocasionalmente' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'energy_q3',
        question: '¿Tienes alguna de estas condiciones?',
        options: [
          { value: 'none', label: 'Ninguna' },
          { value: 'pregnant', label: 'Embarazo o lactancia', isSensitive: true },
          { value: 'chronic', label: 'Condición crónica diagnosticada', isSensitive: true },
        ],
      },
    ],
    gut: [
      {
        id: 'gut_q1',
        question: '¿Cuál es tu principal molestia digestiva?',
        options: [
          { value: 'bloating', label: 'Hinchazón' },
          { value: 'irregularity', label: 'Irregularidad' },
          { value: 'discomfort', label: 'Malestar general' },
        ],
      },
      {
        id: 'gut_q2',
        question: '¿Con qué frecuencia experimentas estos síntomas?',
        options: [
          { value: 'daily', label: 'Diariamente' },
          { value: 'weekly', label: 'Varias veces por semana' },
          { value: 'occasional', label: 'Ocasionalmente' },
        ],
      },
      {
        id: 'gut_q3',
        question: '¿Has tomado antibióticos recientemente?',
        options: [
          { value: 'yes', label: 'Sí, en los últimos 3 meses' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'No estoy seguro/a' },
        ],
      },
    ],
    skin: [
      {
        id: 'skin_q1',
        question: '¿Cuál es tu principal preocupación de piel?',
        options: [
          { value: 'dryness', label: 'Sequedad' },
          { value: 'aging', label: 'Envejecimiento' },
          { value: 'dullness', label: 'Falta de luminosidad' },
        ],
      },
      {
        id: 'skin_q2',
        question: '¿Tu piel es sensible?',
        options: [
          { value: 'yes', label: 'Sí, muy sensible' },
          { value: 'somewhat', label: 'Un poco' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'skin_q3',
        question: '¿Tomas suplementos actualmente?',
        options: [
          { value: 'yes', label: 'Sí, regularmente' },
          { value: 'sometimes', label: 'A veces' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
  };

  return questionMap[goal] || [];
};

// Agent engine core logic
export const generateRecommendations = (answers: AssistantAnswers): Recommendation => {
  const { goal, question1, question2, question3 } = answers;

  // Filter products by category
  let candidates = products.filter((p) => p.category === goal && p.inStock);

  // Check for sensitive conditions
  const hasSensitiveCondition =
    question3 === 'pregnant' || question3 === 'medication' || question3 === 'chronic';

  const warnings: string[] = [
    'Esta es información general de bienestar. No constituye consejo médico.',
  ];

  if (hasSensitiveCondition) {
    warnings.push(
      '⚠️ Detectamos una condición que requiere atención profesional. Te recomendamos consultar con un farmacéutico o médico antes de tomar suplementos.'
    );
  }

  // Calculate match scores based on answers
  const scoredProducts = candidates.map((product) => {
    let matchScore = 50; // base score

    // Goal-specific scoring logic
    if (goal === 'sleep') {
      if (question1 === 'onset' && product.benefits.includes('sleep-onset')) matchScore += 30;
      if (question1 === 'quality' && product.benefits.includes('sleep-quality')) matchScore += 30;
      if (question1 === 'both') matchScore += 20;
      if (question2 === 'yes' && product.benefits.includes('stress-relief')) matchScore += 20;
      if (question2 === 'yes' && product.benefits.includes('relaxation')) matchScore += 15;
    }

    if (goal === 'energy') {
      if (question1 === 'morning' && product.subcategory === 'vitamins') matchScore += 25;
      if (question1 === 'allday' && product.benefits.includes('metabolism')) matchScore += 25;
      if (question2 === 'yes' && product.subcategory === 'performance') matchScore += 20;
      if (question2 === 'yes' && product.benefits.includes('endurance')) matchScore += 15;
    }

    if (goal === 'gut') {
      if (question1 === 'bloating' && product.subcategory === 'probiotic') matchScore += 30;
      if (question1 === 'irregularity' && product.subcategory === 'fiber') matchScore += 30;
      if (question1 === 'discomfort' && product.subcategory === 'enzymes') matchScore += 25;
      if (question2 === 'daily' && product.subcategory === 'probiotic') matchScore += 20;
      if (question3 === 'yes' && product.subcategory === 'probiotic') matchScore += 25;
    }

    if (goal === 'skin') {
      if (question1 === 'dryness' && product.benefits.includes('hydration')) matchScore += 30;
      if (question1 === 'aging' && product.benefits.includes('anti-aging')) matchScore += 30;
      if (question1 === 'dullness' && product.benefits.includes('skin-elasticity')) matchScore += 25;
    }

    // Calculate final score: 55% match, 25% popularity, 20% margin
    const finalScore =
      matchScore * 0.55 + product.popularityScore * 0.25 + product.marginScore * 0.2;

    return { product, score: finalScore };
  });

  // Sort and pick top 2
  scoredProducts.sort((a, b) => b.score - a.score);
  const recommendedProducts = scoredProducts.slice(0, 2).map((s) => s.product);

  // Select kit
  const recommendedKit = selectKit(goal, answers);

  // Generate rationale
  const rationale = generateRationale(goal, answers, recommendedProducts, recommendedKit);

  return {
    recommendedProducts,
    recommendedKit,
    rationale,
    warnings,
  };
};

const selectKit = (goal: WellnessGoal, answers: AssistantAnswers): Kit | null => {
  const categoryKits = kits.filter((k) => k.category === goal);

  if (goal === 'sleep') {
    // If stressed, recommend Deep Sleep Kit, else Sleep Starter Kit
    if (answers.question2 === 'yes') {
      return kits.find((k) => k.id === 'KIT002') || categoryKits[0];
    }
    return kits.find((k) => k.id === 'KIT001') || categoryKits[0];
  }

  if (goal === 'energy') {
    return kits.find((k) => k.id === 'KIT003') || null;
  }

  if (goal === 'gut') {
    return kits.find((k) => k.id === 'KIT004') || null;
  }

  if (goal === 'skin') {
    return kits.find((k) => k.id === 'KIT005') || null;
  }

  return null;
};

const generateRationale = (
  goal: WellnessGoal,
  answers: AssistantAnswers,
  recommendedProducts: Product[],
  recommendedKit: Kit | null
): string[] => {
  const rationale: string[] = [];

  // Goal-specific rationale
  if (goal === 'sleep') {
    rationale.push(
      'Basado en tus respuestas, priorizamos ingredientes que ayudan con la relajación y el inicio del sueño.'
    );
    if (answers.question2 === 'yes') {
      rationale.push(
        'Incluimos adaptógenos para manejar el estrés, un factor clave en tu dificultad para dormir.'
      );
    }
  }

  if (goal === 'energy') {
    rationale.push(
      'Seleccionamos nutrientes que apoyan la producción de energía celular de forma sostenida.'
    );
    if (answers.question2 === 'yes') {
      rationale.push(
        'Agregamos ingredientes que mejoran resistencia física para complementar tu entrenamiento.'
      );
    }
  }

  if (goal === 'gut') {
    rationale.push(
      'Priorizamos probióticos y prebióticos para equilibrar tu microbioma intestinal.'
    );
    if (answers.question3 === 'yes') {
      rationale.push(
        'Los antibióticos pueden alterar tu flora. Los probióticos ayudan a restaurar el balance.'
      );
    }
  }

  if (goal === 'skin') {
    rationale.push(
      'Seleccionamos nutrientes que nutren la piel desde adentro: colágeno, hidratación y antioxidantes.'
    );
  }

  // Mention product attributes
  if (recommendedProducts.length > 0) {
    const topProduct = recommendedProducts[0];
    rationale.push(
      `${topProduct.name} es nuestro top pick por su alta efectividad y popularidad.`
    );
  }

  // Mention kit
  if (recommendedKit) {
    rationale.push(
      `El ${recommendedKit.name} combina los productos clave con un descuento del ${recommendedKit.discountPercent}%.`
    );
  }

  return rationale;
};
