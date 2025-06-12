'use client'

// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { FiHeart, FiBookmark, FiFilter, FiStar, FiClock } from 'react-icons/fi';

export default function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('chicken');
  const [filters, setFilters] = useState({
    diet: '',
    mealType: '',
    cuisineType: '',
    time: '',
    calories: '',
    sort: 'relevance'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const APP_ID = "4e5095a1";
  const APP_KEY = "74b7c0554dd6533fd52bbc56917063f3";
  const itemsPerPage = 12;

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm, filters, currentPage]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const fetchRecipes = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage;

      let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`;

      // Apply filters
      if (filters.diet) apiUrl += `&diet=${filters.diet}`;
      if (filters.mealType) apiUrl += `&mealType=${filters.mealType}`;
      if (filters.cuisineType) apiUrl += `&cuisineType=${filters.cuisineType}`;
      if (filters.time) apiUrl += `&time=${filters.time}`;
      if (filters.calories) apiUrl += `&calories=${filters.calories}`;

      const response = await fetch(apiUrl, {
        headers: {
          'Edamam-Account-User': 'tkdod24'
        }
      });
      const data = await response.json();

      if (data.hits) {
        const sortedRecipes = sortRecipes(data.hits.map(hit => hit.recipe));
        setRecipes(sortedRecipes);
        setTotalPages(Math.ceil(data.count / itemsPerPage));
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortRecipes = (recipes) => {
    switch (filters.sort) {
      case 'calories-low':
        return [...recipes].sort((a, b) => a.calories - b.calories);
      case 'calories-high':
        return [...recipes].sort((a, b) => b.calories - a.calories);
      case 'time-low':
        return [...recipes].sort((a, b) => (a.totalTime || 0) - (b.totalTime || 0));
      case 'time-high':
        return [...recipes].sort((a, b) => (b.totalTime || 0) - (a.totalTime || 0));
      default:
        return recipes;
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    setCurrentPage(1);
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some(fav => fav.uri === recipe.uri);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.uri !== recipe.uri);
    } else {
      updatedFavorites = [...favorites, recipe];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('recipeFavorites', JSON.stringify(updatedFavorites));
  };

  const displayedRecipes = showFavorites ? favorites : recipes;

  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-white p-2 rounded-full mr-3">
              <FiBookmark className="text-amber-500 text-2xl" />
            </div>
            <h1 className="text-3xl font-bold">Recipe Finder</h1>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-2 rounded-full flex items-center ${showFavorites ? 'bg-white text-amber-600' : 'bg-amber-600 text-white'}`}
            >
              <FiHeart className="mr-2" />
              {showFavorites ? 'Show All' : `Favorites (${favorites.length})`}
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white text-amber-600 rounded-full flex items-center"
            >
              <FiFilter className="mr-2" /> Filters
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Delicious Recipes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Search from thousands of recipes, filter by your preferences, and save your favorites for later
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
          </div>
        </section>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}

        {/* Results Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {showFavorites
                ? `Your Favorite Recipes (${favorites.length})`
                : `Search Results for "${searchTerm}"`}
            </h3>

            {!showFavorites && (
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Sort by:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value })}
                  className="text-black bg-white border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="relevance">Relevance</option>
                  <option value="calories-low">Calories (Low to High)</option>
                  <option value="calories-high">Calories (High to Low)</option>
                  <option value="time-low">Time (Low to High)</option>
                  <option value="time-high">Time (High to Low)</option>
                </select>
              </div>
            )}
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Recipe Grid */}
          {!loading && !error && displayedRecipes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                {showFavorites
                  ? "You haven't saved any favorites yet."
                  : "No recipes found. Try a different search term or adjust your filters."}
              </div>
              {showFavorites ? (
                <button
                  onClick={() => setShowFavorites(false)}
                  className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Browse Recipes
                </button>
              ) : (
                <button
                  onClick={() => setShowFilters(true)}
                  className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Adjust Filters
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedRecipes.map((recipe, index) => (
              <RecipeCard
                key={`${recipe.uri}-${index}`}
                recipe={recipe}
                isFavorite={favorites.some(fav => fav.uri === recipe.uri)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* Pagination */}
          {!showFavorites && !loading && recipes.length > 0 && (
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Recipe Finder. All rights reserved.</p>
          <p className="mt-2 text-gray-400 text-sm">
            Powered by Edamam API | Built with Next.js and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}