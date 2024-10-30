import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import studentQuestionsData from './StudentsAnswers.json'// Import your StudentQuestions.json
import StudentNavbar from '../../components/StudentNavbar';

const StudentQuestions = () => {
  const [userQuestions, setUserQuestions] = useState([]);
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [filters, setFilters] = useState({ date: '' });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulating fetching user's own questions
    setLoading(true);
    const userSpecificQuestions = studentQuestionsData.filter(
      (q) => q.user === 'John Doe' // Replace with dynamic user data
    );
    setUserQuestions(userSpecificQuestions);
    setLoading(false);
  }, []);

  const handleFilterChange = (e) => {
    const date = e.target.value;
    setFilters({ date });
    const filtered = studentQuestionsData.filter(
      (q) => q.user === 'John Doe' && q.datePosted === date // Replace with dynamic user data
    );
    setUserQuestions(filtered);
  };

  const toggleNewQuestion = () => {
    setShowNewQuestion(!showNewQuestion);
  };

  const handleNewQuestionSubmit = () => {
    if (newQuestion.trim()) {
      const newEntry = {
        id: userQuestions.length + 1,
        user: 'John Doe', // Replace with dynamic user data
        question: newQuestion,
        datePosted: new Date().toLocaleDateString(),
        timePosted: new Date().toLocaleTimeString(),
        tags: [],
        answers: [] // Ensure this is an array
      };
      setUserQuestions([newEntry, ...userQuestions]);
      setNewQuestion('');
      setShowNewQuestion(false);
    } else {
      alert('Please enter a valid question.');
    }
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = userQuestions.filter((q) => q.id !== id);
    setUserQuestions(updatedQuestions);
  };

  const handleEditQuestion = (id) => {
    const updatedQuestion = prompt(
      'Edit your question:',
      userQuestions.find((q) => q.id === id)?.question
    );
    if (updatedQuestion?.trim()) {
      const updatedQuestions = userQuestions.map((q) =>
        q.id === id ? { ...q, question: updatedQuestion } : q
      );
      setUserQuestions(updatedQuestions);
    } else {
      alert('Please enter a valid question.');
    }
  };

  const toggleAnswers = (question) => {
    setSelectedQuestion(selectedQuestion === question ? null : question);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div>
        <StudentNavbar />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Questions</h1>
        <button
          className="flex items-center bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          onClick={toggleNewQuestion}
        >
          <FaPlus className="mr-2" /> {showNewQuestion ? 'Close' : 'New Question'}
        </button>
      </div>

      {showNewQuestion && (
        <div className="mb-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <textarea
            className="w-full bg-gray-700 p-2 rounded-lg mb-4"
            rows="3"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question..."
          />
          <button
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500 transition"
            onClick={handleNewQuestionSubmit}
          >
            Submit Question
          </button>
        </div>
      )}

      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="bg-gray-800 p-2 rounded-lg text-white"
          placeholder="Filter by Date"
        />
      </div>

      {loading ? (
        <p>Loading questions...</p>
      ) : userQuestions.length > 0 ? (
        userQuestions.map((q) => (
          <div key={q.id} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{q.question}</h2>
                <p className="text-sm text-gray-500">
                  Posted on: {q.datePosted} at {q.timePosted}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 p-2 rounded-lg hover:bg-yellow-400 transition"
                  onClick={() => handleEditQuestion(q.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-600 p-2 rounded-lg hover:bg-red-500 transition"
                  onClick={() => handleDeleteQuestion(q.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <button
              className="mt-4 flex items-center text-cyan-400 hover:underline"
              onClick={() => toggleAnswers(q)}
            >
              <FaEye className="mr-2" /> View Answers ({q.answers ? q.answers.length : 0})
            </button>

            {selectedQuestion === q && (
              <div className="mt-2 bg-gray-700 p-4 rounded-lg">
                {q.answers.length > 0 ? (
                  q.answers.map((answer, idx) => (
                    <p key={idx} className="text-gray-300">
                      {answer}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No answers yet.</p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400">No questions found...</p>
      )}
    </div>
  );
};

export default StudentQuestions;
