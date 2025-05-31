'use client'

// components/RecipeCard.js
import Image from 'next/image';
import { FiHeart, FiClock, FiFile, FiStar } from 'react-icons/fi';

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48">
        {recipe.image ? (
          <Image 
            src={recipe.image} 
            alt={recipe.label}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        
        <button 
          onClick={() => onToggleFavorite(recipe)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite ? 'bg-red-500' : 'bg-white/80'
          } shadow-md`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart className={`w-5 h-5 ${isFavorite ? 'text-white' : 'text-red-500'}`} />
        </button>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{recipe.label}</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.dietLabels?.slice(0, 3).map(label => (
            <span 
              key={label} 
              className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
            >
              {label}
            </span>
          ))}
          {recipe.cuisineType?.slice(0, 2).map(cuisine => (
            <span 
              key={cuisine} 
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {cuisine}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4 gap-4">
          <div className="flex items-center">
            <FiClock className="mr-1" />
            <span>{recipe.totalTime || 'N/A'} min</span>
          </div>
          <div className="flex items-center">
            <FiFile className="mr-1" />
            <span>{Math.round(recipe.calories || 0)} cal</span>
          </div>
          <div className="flex items-center">
            <FiStar className="mr-1" />
            <span>{Math.round(recipe.yield || 1)} servings</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <a 
            href={recipe.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
}