import { getAgents, Agent } from '@/libs/microcms';
import Link from 'next/link';
import Image from 'next/image';

function AgentList({ agents }: { agents: Agent[] }) {
  if (agents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">エージェントが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {agents.map((agent) => (
        <Link href={`/agents/${agent.id}`} key={agent.id}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
            <div className="p-6 text-center">
              {agent.logo?.url ? (
                <Image
                  src={agent.logo.url}
                  alt={`${agent.name}ロゴ`}
                  width={100}
                  height={100}
                  className="mx-auto rounded-full mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500">
                  ロゴなし
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{agent.name}</h3>
              <p className="text-gray-600 line-clamp-2">{agent.detail}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}


export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          エージェント一覧
        </h1>
        <AgentList agents={agents} />
      </div>
    </div>
  );
}