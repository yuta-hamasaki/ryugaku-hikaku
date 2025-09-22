// components/SearchForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { Country, StudyType, getCountries, getStudyTypes } from '@/libs/microcms';

interface SearchFormProps {
  onSearch: (params: { selectedCountry: string; selectedType: string; visaSupport: boolean }) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [studyTypes, setStudyTypes] = useState<StudyType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [visaSupport, setVisaSupport] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedCountries = await getCountries();
      const fetchedStudyTypes = await getStudyTypes();
      setCountries(fetchedCountries);
      setStudyTypes(fetchedStudyTypes);
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ selectedCountry, selectedType, visaSupport });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-6 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Country dropdown */}
      <div className="flex-1">
        <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
          国
        </label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">国を選択</option>
          {countries.map((country) => (
            <option key={country.slug} value={country.slug}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Study Type dropdown */}
      <div className="flex-1">
        <label htmlFor="type-select" className="block text-sm font-medium text-gray-700 mb-1">
          タイプ
        </label>
        <select
          id="type-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">タイプを選択</option>
          {studyTypes.map((type) => (
            <option key={type.slug} value={type.slug}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Visa Support checkbox */}
      <div className="flex items-center gap-2 mt-auto pb-1">
        <input
          id="visa-checkbox"
          type="checkbox"
          checked={visaSupport}
          onChange={(e) => setVisaSupport(e.target.checked)}
          className="form-checkbox h-4 w-4 text-blue-600 rounded"
        />
        <label htmlFor="visa-checkbox" className="text-sm font-medium text-gray-700">
          ビザ申請代行あり
        </label>
      </div>

      {/* Search button */}
      <button
        type="submit"
        className="w-full md:w-auto mt-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        検索
      </button>
    </form>
  );
}