import { getPlanById, getAgentById } from '@/libs/microcms';
import Image from 'next/image';

export default async function PlanDetail({ params }: { params: { id: string } }) {
  const plan = await getPlanById(params.id);

  if (!plan) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">プランが見つかりませんでした。</div>;
  }

  // getAgentById is used to fetch the full agent data, which includes the logo details.
  const agent = plan.agent ? await getAgentById(plan.agent.id) : null;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Main Plan Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{plan.planName}</h1>
          <div className="flex items-center text-gray-500 mb-6">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full mr-2">
              {plan.country?.name}
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded-full mr-2">
              {plan.type?.name}
            </span>
            <span className="text-lg font-medium">
              {plan.city}
            </span>
          </div>

          <p className="text-3xl font-bold text-blue-600 mb-4">
            ¥{plan.price.toLocaleString()}
          </p>
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: plan.detail ?? '' }} />

          <div className="flex items-center space-x-4 text-gray-600">
            <p className="flex items-center">
              <span className="font-semibold mr-1">期間:</span>
              {plan.duration}
            </p>
            <p className="flex items-center">
              <span className="font-semibold mr-1">ビザサポート:</span>
              {plan.visaSupport ? (
                <span className="text-green-500 font-bold">✅ あり</span>
              ) : (
                <span className="text-red-500 font-bold">❌ なし</span>
              )}
            </p>
          </div>
        </div>

        {/* Agent Information Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">エージェント情報</h2>

          {agent ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="shrink-0">
                {agent.logo?.url
                  ? <Image 
                      src={agent.logo.url} 
                      alt={`${agent.name} ロゴ`} 
                      width={120} 
                      height={120} 
                      className="rounded-lg shadow-md"
                    />
                  : <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">ロゴなし</div>
                }
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-700 mb-2">{agent.name}</h3>
                <div className="prose max-w-none text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: agent.detail ?? '' }} />
                <a 
                  href={agent.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                >
                  公式サイトを見る
                </a>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">エージェント情報がありません。</p>
          )}
        </div>
      </div>
    </div>
  );
}