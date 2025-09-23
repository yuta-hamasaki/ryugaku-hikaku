import { getAgentById } from '@/libs/microcms';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>
}


export default async function AgentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const agent = await getAgentById(id);

  if (!agent) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">エージェントが見つかりませんでした。</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <div className="flex flex-col items-center mb-6">
            {agent.logo?.url ? (
              <Image
                src={agent.logo.url}
                alt={`${agent.name} ロゴ`}
                width={200}
                height={200}
                className="shadow-md mb-4"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200  flex items-center justify-center text-gray-500 mb-4">
                ロゴなし
              </div>
            )}
            <h1 className="text-4xl font-extrabold text-gray-800">{agent.name}</h1>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed mx-auto mb-6" dangerouslySetInnerHTML={{ __html: agent.detail ?? '' }} />

          <Link
            href={agent.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            公式サイトを見る
          </Link>
        </div>
      </div>
    </div>
  );
}