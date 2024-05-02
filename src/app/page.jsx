import getQueryToken from "@/utils/query_token";

export default async function HomePage() {
  const token = await getQueryToken()
  console.log(token)
  return (
    <div>
      HOME PAGE
    </div>
  );
}

