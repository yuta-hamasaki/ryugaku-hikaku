// components/PlanList.tsx
import { Plan } from '@/libs/microcms';
import Link from 'next/link';

export function PlanList({ plans }: { plans: Plan[] }) {
  if (plans.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 text-lg">
          該当するプランが見つかりませんでした。
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {plans.map((plan) => (
        <Link href={`/plan-detail/${plan.id}`} passHref key={plan.id}>
        <div
          key={plan.planName}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.planName}</h3>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <span className="font-semibold">国:</span>
                {plan.country?.name}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">エージェント:</span>
                {plan.agent?.name}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">料金:</span>
                <span className="text-lg font-bold text-blue-600">¥{plan.price.toLocaleString()}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">ビザ代行:</span>
                {plan.visaSupport ? (
                  <span className="text-green-500 font-bold">✅ あり</span>
                ) : (
                  <span className="text-red-500 font-bold">❌ なし</span>
                )}
              </p>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
}