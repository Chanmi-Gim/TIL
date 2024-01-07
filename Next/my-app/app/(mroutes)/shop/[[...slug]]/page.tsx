'use client';

import { useRouter } from 'next/navigation';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
// export async function generateStaticParams() {
//   const res = await fetch(
//     'https://jsonplaceholder.typicode.com/posts?userId=1'
//   );
//   const posts = await res.json();
//   return posts.map((post: Post) => ({
//     slug: [`${post.id}`, '123'],
//   }));
// }
export default function ShopPage({ params }: { params: { slug: string[] } }) {
  const router = useRouter();
  const { slug } = params;
  if (!slug?.length) {
    router.push('/shop/000');
    console.log('router', router);
    return;
    // return notFound();
  }

  return <h2>ShopPage : {slug.join(' ')}</h2>;
}
