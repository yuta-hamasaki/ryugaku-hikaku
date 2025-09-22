import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
});

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface StudyType {
  id: string;
  name: string;
  slug: string;
}

export interface Agent {
  id: string;
  name: string;
  logo: {
    url: string;
    width: number;
    height: number;
  } | null;
  detail: string;
  website: string;
}

export interface Plan {
  id: string;
  planName: string;
  agent: Agent;
  country: Country;
  city: string;
  type: StudyType;
  duration: string;
  price: number;
  visaSupport: boolean;
  detail: string;
}


export const getPlans = async (
  queries?: {
    countryId?: string;
    typeId?: string;
    visaSupport?: boolean;
    limit?: number;
  }
): Promise<Plan[]> => {
  try {
    const filters = [];
    if (queries?.countryId) {
      filters.push(`country[equals]${queries.countryId}`);
    }
    if (queries?.typeId) {
      filters.push(`type[equals]${queries.typeId}`);
    }
    if (queries?.visaSupport) {
      filters.push(`visaSupport[equals]true`);
    }

    const response = await client.get({
      endpoint: "plans",
      queries: {
        limit: queries?.limit || 100,
        orders: "-createdAt",
        filters: filters.join('[and]'),
      },
    });
    return response.contents;
  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
};


export const getPlanById = async (id: string):Promise<Plan | null> => {
  try {
    const response = await client.get({
      endpoint: "plans",
      contentId: id,
    })
    return response
  } catch (error) {
    console.error("Error fetching project by ID:", error)
    return null
  }
}

export const getAgents = async ():Promise<Agent[]> => {
  try {
    const response = await client.get({
      endpoint: "agents",
      queries: {
        limit: 100,
        orders: "-createdAt",
      },
    })
    return response.contents
  } catch (error) {
    console.error("Error fetching agents:", error)
    return []
  }
}

export const getAgentById = async (id: string):Promise<Agent | null> => {
  try {
    const response = await client.get({
      endpoint: "agents",
      contentId: id,
    })
    return response
  } catch (error) {
    console.error("Error fetching agent by ID:", error)
    return null
  }
}

export const getCountries = async ():Promise<Country[]> => {
  try {
    const response = await client.get({
      endpoint: "countries",
      queries: {
        limit: 100,
        orders: "-createdAt",
      },
    })
    return response.contents
  } catch (error) {
    console.error("Error fetching countries:", error)
    return []
  }
}

export const getStudyTypes = async ():Promise<StudyType[]> => {
  try {
    const response = await client.get({
      endpoint: "studytype",
      queries: {
        limit: 100,
        orders: "-createdAt",
      },
    })
    return response.contents
  } catch (error) {
    console.error("Error fetching study types:", error)
    return []
  }
}


export const getCountryBySlug = async (slug: string): Promise<Country | null> => {
  try {
    const response = await client.get({
      endpoint: "countries",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1, // 該当するコンテンツは1件のみなのでlimitを1に
      },
    });
    return response.contents[0] || null;
  } catch (error) {
    console.error("Error fetching country by slug:", error);
    return null;
  }
};

export const getStudyTypeBySlug = async (slug: string): Promise<StudyType | null> => {
  try {
    const response = await client.get({
      endpoint: "studytype",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1, // 該当するコンテンツは1件のみなのでlimitを1に
      },
    });

    // 結果の配列が空でなければ最初の要素を返す
    return response.contents.length > 0 ? response.contents[0] : null;
  } catch (error) {
    console.error(`Error fetching study type by slug '${slug}':`, error);
    return null;
  }
};