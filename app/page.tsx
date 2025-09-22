"use client";
import { useState, useEffect } from 'react'; 
import { Plan, getPlans, getCountryBySlug, getStudyTypeBySlug } from '../libs/microcms';
import { SearchForm } from '../components/SearchForm';
import { PlanList } from '../components/PlanList';

export default function Home() {
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  type SearchFormData = {
    selectedCountry: string;
    selectedType: string;
    visaSupport: boolean;
  };

  useEffect(() => {
    const fetchAllPlans = async () => {
      setLoading(true);
      // 修正: フィルタリングなしで全てのプランを取得する際に、クエリ引数を空オブジェクトで渡す
      const plans = await getPlans({});
      setFilteredPlans(plans);
      setLoading(false);
    };
    fetchAllPlans();
  }, []);

  const handleSearch = async (formData: SearchFormData) => {
    setLoading(true);

    const countryContent = formData.selectedCountry ? await getCountryBySlug(formData.selectedCountry) : null;
    const typeContent = formData.selectedType ? await getStudyTypeBySlug(formData.selectedType) : null;

    // 修正: getPlansにスラッグではなく、取得したコンテンツのIDを渡す
    const plans = await getPlans({
      countryId: countryContent?.id,
      typeId: typeContent?.id,
      visaSupport: formData.visaSupport,
    });

    setFilteredPlans(plans);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          留学エージェント検索
        </h1>
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl mb-10">
          <SearchForm onSearch={handleSearch} />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-xl animate-pulse">
              検索中...
            </p>
          </div>
        ) : (
          <PlanList plans={filteredPlans} />
        )}
      </div>
    </div>
  );
}