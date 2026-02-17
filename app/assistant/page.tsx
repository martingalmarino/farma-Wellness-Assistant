'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Stepper from '@/components/Stepper';
import RecommendationPanel from '@/components/RecommendationPanel';
import {
  generateRecommendations,
  getQuestionsForGoal,
  type WellnessGoal,
  type AssistantAnswers,
  type Recommendation,
} from '@/lib/agentEngine';
import { eventLogger } from '@/lib/eventLog';

const GOALS: { value: WellnessGoal; label: string; emoji: string; description: string }[] = [
  {
    value: 'sleep',
    label: 'Descanso',
    emoji: '😴',
    description: 'Mejora la calidad de tu sueño',
  },
  {
    value: 'energy',
    label: 'Energía',
    emoji: '⚡',
    description: 'Aumenta tu vitalidad diaria',
  },
  {
    value: 'gut',
    label: 'Digestión',
    emoji: '🦠',
    description: 'Optimiza tu salud intestinal',
  },
  {
    value: 'skin',
    label: 'Piel',
    emoji: '✨',
    description: 'Nutrición desde adentro',
  },
];

export default function AssistantPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<AssistantAnswers>({} as AssistantAnswers);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const questions = answers.goal ? getQuestionsForGoal(answers.goal) : [];

  const handleGoalSelect = (goal: WellnessGoal) => {
    setAnswers({ goal });
    setCurrentStep(2);
    eventLogger.log('assistant_goal_selected', { goal });
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    const updatedAnswers = { ...answers };

    if (questionId === 'sleep_q1' || questionId === 'energy_q1' || questionId === 'gut_q1' || questionId === 'skin_q1') {
      updatedAnswers.question1 = answer;
    } else if (questionId === 'sleep_q2' || questionId === 'energy_q2' || questionId === 'gut_q2' || questionId === 'skin_q2') {
      updatedAnswers.question2 = answer;
    } else if (questionId === 'sleep_q3' || questionId === 'energy_q3' || questionId === 'gut_q3' || questionId === 'skin_q3') {
      updatedAnswers.question3 = answer;
    }

    setAnswers(updatedAnswers);

    // Move to next step or generate recommendations
    const currentQuestionIndex = questions.findIndex((q) => q.id === questionId);
    if (currentQuestionIndex === questions.length - 1) {
      // Last question - generate recommendations
      const recs = generateRecommendations(updatedAnswers);
      setRecommendation(recs);
      setCurrentStep(3);
      eventLogger.log('assistant_recommendations_generated', {
        goal: updatedAnswers.goal,
        productCount: recs.recommendedProducts.length,
        hasKit: !!recs.recommendedKit,
      });
    } else {
      eventLogger.log('assistant_question_answered', { questionId, answer });
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setAnswers({} as AssistantAnswers);
    setRecommendation(null);
    eventLogger.log('assistant_start_over');
  };

  const handleGoToCart = () => {
    eventLogger.log('assistant_go_to_cart');
    router.push('/cart');
  };

  const steps = ['Objetivo', 'Preguntas', 'Recomendaciones'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Asistente de Bienestar</h1>
          <p className="text-gray-600">
            Responde unas preguntas para recibir recomendaciones personalizadas
          </p>
        </div>

        {/* Stepper */}
        <Stepper currentStep={currentStep} totalSteps={3} steps={steps} />

        {/* Step 1: Goal Selection */}
        {currentStep === 1 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              ¿Cuál es tu objetivo de bienestar?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GOALS.map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => handleGoalSelect(goal.value)}
                  className="bg-white border-2 border-gray-200 hover:border-primary-500 rounded-lg p-6 text-left transition-all hover:shadow-md"
                >
                  <div className="text-4xl mb-3">{goal.emoji}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{goal.label}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Questions */}
        {currentStep === 2 && (
          <div className="mt-8 space-y-8">
            {questions.map((question, index) => {
              const questionNumber = index + 1;
              const answerKey = `question${questionNumber}` as keyof AssistantAnswers;
              const isAnswered = !!answers[answerKey];
              const canAnswer = index === 0 || !!answers[`question${index}` as keyof AssistantAnswers];

              return (
                <div
                  key={question.id}
                  className={`${canAnswer ? '' : 'opacity-50 pointer-events-none'}`}
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    {questionNumber}. {question.question}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option) => {
                      const isSelected = answers[answerKey] === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswerSelect(question.id, option.value)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300 bg-white'
                          } ${option.isSensitive ? 'border-amber-300' : ''}`}
                        >
                          <span className="font-medium text-gray-900">{option.label}</span>
                          {option.isSensitive && (
                            <span className="ml-2 text-xs text-amber-600">⚠️</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between pt-6">
              <button
                onClick={handleStartOver}
                className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Volver
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Recommendations */}
        {currentStep === 3 && recommendation && (
          <div className="mt-8">
            <RecommendationPanel
              products={recommendation.recommendedProducts}
              kit={recommendation.recommendedKit}
              rationale={recommendation.rationale}
              warnings={recommendation.warnings}
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleStartOver}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Empezar de Nuevo
              </button>
              <button
                onClick={handleGoToCart}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Ver Carrito →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          <strong>Disclaimer:</strong> Esta es información general de bienestar. No reemplaza el
          consejo médico profesional. Consulta con un profesional de la salud antes de comenzar
          cualquier régimen de suplementos.
        </p>
      </div>
    </div>
  );
}
