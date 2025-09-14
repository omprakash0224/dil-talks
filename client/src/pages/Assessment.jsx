import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import apiClient from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLightbulb, FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const questions = {
  phq9: [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself?",
    "Trouble concentrating on things?",
    "Moving or speaking slowly or being restless?",
    "Thoughts of self-harm?"
  ],
  gad7: [
    "Feeling nervous, anxious, or on edge?",
    "Not being able to stop worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it's hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid as if something awful might happen?"
  ],
  ghq12: [
    "Been able to concentrate?",
    "Lost much sleep over worry?",
    "Felt you are playing a useful part in things?",
    "Felt capable of making decisions?",
    "Felt constantly under strain?",
    "Felt you couldn't overcome difficulties?",
    "Been able to enjoy activities?",
    "Been able to face problems?",
    "Been feeling unhappy and depressed?",
    "Been losing confidence?",
    "Been thinking of yourself as worthless?",
    "Been feeling reasonably happy?"
  ]
};

const options = [
  { label: "Yes, often", value: 3 },
  { label: "Sometimes", value: 2 },
  { label: "Not really", value: 1 },
  { label: "Not at all", value: 0 }
];

const Assessment = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('phq9');
  const [responses, setResponses] = useState({
    phq9: [],
    gad7: [],
    ghq12: []
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (questionIndex, answer) => {
    setResponses(prev => ({
      ...prev,
      [currentSection]: [
        ...prev[currentSection].slice(0, questionIndex),
        {
          question: questions[currentSection][questionIndex],
          answer
        },
        ...prev[currentSection].slice(questionIndex + 1)
      ]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const sections = ['phq9', 'gad7', 'ghq12'];
      const isComplete = sections.every(section => 
        responses[section].length === questions[section].length
      );

      if (!isComplete) {
        setLoading(false); // Stop loading
        toast.error('Please answer all questions before submitting');
        return;
      }

      console.log('Submitting responses:', responses);

      // Use the authenticated apiClient instead of axios
      const response = await apiClient.post('/api/assessments', {
        userId: user.id,
        responses
      });

      console.log('Server response:', response.data);
      
      setResult(response.data);
      toast.success('Assessment completed!');
    } catch (error) {
      console.error('Assessment submission failed:', error);
      const errorMessage = error.response?.data?.details || error.response?.data?.error || 'Failed to submit assessment';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return { text: 'text-green-700', bg: 'bg-green-100', border: 'border-green-400', iconBg: 'bg-green-200' };
      case 'moderate':
        return { text: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-400', iconBg: 'bg-yellow-200' };
      case 'high':
        return { text: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-400', iconBg: 'bg-orange-200' };
      case 'severe':
        return { text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-400', iconBg: 'bg-red-200' };
      default:
        return { text: 'text-gray-700', bg: 'bg-gray-100', border: 'border-gray-400', iconBg: 'bg-gray-200' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {!result ? (
          <>
            {/* --- QUESTIONNAIRE UI (Unchanged) --- */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Mental Health Assessment</h2>
            {questions[currentSection].map((question, index) => (
              <div key={index} className="mb-6">
                <p className="mb-3 text-gray-700">{question}</p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {options.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(index, option)}
                      className={`p-2 rounded transition-colors duration-200 ${
                        responses[currentSection][index]?.answer.value === option.value
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-6">
              {currentSection !== 'ghq12' ? (
                <button
                  onClick={() => setCurrentSection(currentSection === 'phq9' ? 'gad7' : 'ghq12')}
                  className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-purple-600 text-white px-6 py-2 rounded disabled:bg-purple-400 transition-colors"
                >
                  {loading ? 'Analyzing...' : 'View Results'}
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* --- NEW BEAUTIFUL RESULTS UI --- */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-800">Your Assessment Results</h2>
                <p className="mt-2 text-gray-500">A summary of your mental well-being based on your responses.</p>
              </div>

              {/* Risk Level Card */}
              <div className={`p-6 rounded-lg border-l-4 ${getRiskColor(result.aiAnalysis.riskLevel).border} ${getRiskColor(result.aiAnalysis.riskLevel).bg}`}>
                <div className="flex items-center">
                  <div className={`mr-4 p-3 rounded-full ${getRiskColor(result.aiAnalysis.riskLevel).iconBg}`}>
                    <FaShieldAlt className={`w-6 h-6 ${getRiskColor(result.aiAnalysis.riskLevel).text}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Risk Level</p>
                    <p className={`text-2xl font-bold capitalize ${getRiskColor(result.aiAnalysis.riskLevel).text}`}>{result.aiAnalysis.riskLevel}</p>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Summary</h3>
                <p className="text-gray-600 leading-relaxed">{result.aiAnalysis.summary}</p>
              </div>

              {/* Recommendations Card */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h3>
                <ul className="space-y-4">
                  {result.aiAnalysis.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <FaLightbulb className="w-5 h-5 text-yellow-500" />
                      </div>
                      <p className="text-gray-600">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Help Alert */}
              {result.aiAnalysis.requiresImmediate && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                  <div className="flex">
                    <div className="py-1"><FaExclamationTriangle className="h-6 w-6 text-red-500 mr-4" /></div>
                    <div>
                      <p className="font-bold">Important</p>
                      <p className="text-sm">Based on your responses, we strongly recommend seeking immediate professional support. Your well-being is the top priority.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <FaHome /> Back to Home
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Assessment;

