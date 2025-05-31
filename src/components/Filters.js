'use client'

// components/Filters.js
import { FiX, FiClock, FiFile } from 'react-icons/fi';

export default function Filters({ filters, onFilterChange, onClose }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };
  
  const clearFilters = () => {
    onFilterChange({
      diet: '',
      mealType: '',
      cuisineType: '',
      time: '',
      calories: '',
      sort: 'relevance'
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Filter Recipes</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Diet Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Diet</label>
          <select
            name="diet"
            value={filters.diet}
            onChange={handleChange}
            className="text-black w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 rounded-lg px-3 py-2"
          >
            <option value="">Any Diet</option>
            <option value="balanced">Balanced</option>
            <option value="high-protein">High-Protein</option>
            <option value="low-carb">Low-Carb</option>
            <option value="low-fat">Low-Fat</option>
            <option value="low-sodium">Low-Sodium</option>
          </select>
        </div>
        
        {/* Meal Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
          <select
            name="mealType"
            value={filters.mealType}
            onChange={handleChange}
            className="text-black w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 rounded-lg px-3 py-2"
          >
            <option value="">Any Meal</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
        
        {/* Cuisine */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
          <select
            name="cuisineType"
            value={filters.cuisineType}
            onChange={handleChange}
            className="text-black w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 rounded-lg px-3 py-2"
          >
            <option value="">Any Cuisine</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="British">British</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Chinese">Chinese</option>
            <option value="French">French</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Mexican">Mexican</option>
          </select>
        </div>
        
        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FiClock className="mr-2" /> Max Time (minutes)
          </label>
          <select
            name="time"
            value={filters.time}
            onChange={handleChange}
            className="text-black w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 rounded-lg px-3 py-2"
          >
            <option value="">Any Time</option>
            <option value="30">30 min</option>
            <option value="60">60 min</option>
            <option value="90">90 min</option>
            <option value="120">2 hours</option>
            <option value="180">3+ hours</option>
          </select>
        </div>
        
        {/* Calories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FiFile className="mr-2" /> Max Calories
          </label>
          <select
            name="calories"
            value={filters.calories}
            onChange={handleChange}
            className="text-black w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 rounded-lg px-3 py-2"
          >
            <option value="">Any Calories</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="1500">1500</option>
            <option value="2000">2000</option>
          </select>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end space-x-3">
        <button
          onClick={clearFilters}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Clear All
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}