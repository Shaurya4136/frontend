import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompilerPopup from './CompilerPopup';
import data from './CommunityData.json';

const QuestionFilters = ({ filters, handleFilterChange }) => (
  <div className="p-4 flex flex-wrap gap-4">
    <input
      type="date"
      value={filters.date}
      onChange={(e) => handleFilterChange('date', e.target.value)}
      className="bg-gray-800 p-2 rounded-lg text-white"
      placeholder="Filter by Date"
    />
    <input
      type="text"
      value={filters.profile}
      onChange={(e) => handleFilterChange('profile', e.target.value)}
      className="bg-gray-800 p-2 rounded-lg text-white"
      placeholder="Filter by Profile"
    />
    <input
      type="text"
      value={filters.tags}
      onChange={(e) => handleFilterChange('tags', e.target.value)}
      className="bg-gray-800 p-2 rounded-lg text-white"
      placeholder="Filter by Tags"
    />
  </div>
);

const ItemList = ({ items, handleAnswerClick }) => (
  <div className="p-4">
    {items.length > 0 ? (
      items.map((item) => (
        <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
          {item.type === 'question' ? (
            <>
              <div className="flex items-center mb-2">
                <img src={item.avatar} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <span className="font-bold">{item.user}</span>
                  <div className="text-gray-400 text-sm">
                    {new Date(`${item.datePosted}T${item.timePosted}`).toLocaleString()}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{item.question}</p>
              <div className="text-sm text-cyan-400 mb-2">
                Tags: {item.tags ? item.tags.join(', ') : 'No tags available'}
              </div>
              <button
                onClick={() => handleAnswerClick(item)}
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Answer
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
              <p className="text-gray-400 text-sm mt-2">Date: {new Date(item.date).toLocaleDateString()}</p>
              {item.poster && (
                <img
                  src={item.poster}
                  alt="event poster"
                  className="mt-4 w-full h-64 object-cover rounded-lg shadow-md"
                />
              )}
            </>
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-400">No items found...</p>
    )}
  </div>
);

const Community = ({ Navbar }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    profile: '',
    tags: '',
  });
  const [showCompilerPopup, setShowCompilerPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      const mergedData = data.items.map((item) => ({
        ...item,
        date: item.type === 'question'
          ? new Date(`${item.datePosted}T${item.timePosted}`) // Combine date and time for questions
          : new Date(item.date) // Only date for events
      }));

      // Sort by date (most recent first)
      const sortedData = mergedData.sort((a, b) => b.date - a.date);
      setItems(sortedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    let filtered = items;

    if (filters.date) {
      filtered = filtered.filter((item) => {
        const itemDate = item.type === 'question'
          ? new Date(`${item.datePosted}T${item.timePosted}`)
          : new Date(item.date);
        return itemDate.toLocaleDateString() === new Date(filters.date).toLocaleDateString();
      });
    }

    if (filters.profile) {
      filtered = filtered.filter((item) =>
        item.type === 'question' && item.user.toLowerCase().includes(filters.profile.toLowerCase())
      );
    }

    if (filters.tags) {
      filtered = filtered.filter((item) =>
        item.type === 'question' && item.tags?.some((tag) => tag.toLowerCase().includes(filters.tags.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  }, [filters, items]);

  const handleAnswerClick = (item) => {
    setSelectedItem(item);
    setShowCompilerPopup(true);
  };

  const handleCompilerClose = () => {
    setShowCompilerPopup(false);
    setSelectedItem(null);
  };

  const onRun = async (code, language) => {
    try {
      switch (language) {
        case 'python3':
          if (code.includes('print')) {
            return { output: 'Python code executed successfully.' };
          } else {
            throw new Error('Python code did not include expected content.');
          }
        case 'java':
          if (code.includes('System.out.println')) {
            return { output: 'Java code executed successfully.' };
          } else {
            throw new Error('Java code did not include expected content.');
          }
        case 'javascript':
          if (code.includes('console.log')) {
            return { output: 'JavaScript code executed successfully.' };
          } else {
            throw new Error('JavaScript code did not include expected content.');
          }
        default:
          throw new Error('Unsupported language.');
      }
    } catch (error) {
      console.error('Error:', error);
      return { output: `Error: ${error.message}` };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {Navbar && <Navbar />}
      <div className="container mx-auto p-6">
        <QuestionFilters filters={filters} handleFilterChange={handleFilterChange} />
        <ItemList items={filteredItems} handleAnswerClick={handleAnswerClick} />
        {showCompilerPopup && (
          <CompilerPopup
            show={showCompilerPopup}
            onClose={handleCompilerClose}
            onRun={onRun}
            language={selectedItem?.language || 'javascript'} // Use the selected language
          />
        )}
      </div>
    </div>
  );
};

export default Community;
