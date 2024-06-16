import { useFetchProducts } from '@/apis/product';
import { useFetchShop } from '@/apis/shop';
import { Slider, TabBar } from '@/components';
import Layout from '@/components/layout';
import { totalCountState, totalPriceState } from '@/libs/recoilState';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

const Shop = () => {
  const router = useRouter();
  const shopId = Number(router.query.id);
  const { shopData } = useFetchShop({ shopId });
  const { productsData } = useFetchProducts({ shopId });

  const totalPrice = useRecoilValue(totalPriceState);
  const totalCount = useRecoilValue(totalCountState);

  return (
    <Layout>
      <div className="pb-20">
        <div className="relative flex items-center justify-center w-full h-64 text-2xl font-bold bg-gray-200">
          <button
            className="absolute z-10 top-4 left-4"
            onClick={() => router.push('/reservation')}>
            <svg
              className="fixed z-10 w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          {[
            '/images/buda.PNG',
            '/images/darkdory.PNG',
            '/images/jungoal.PNG', // @TODO: shopData.images로 변경
          ] ? (
            <Slider
              images={[
                '/images/buda.PNG',
                '/images/darkdory.PNG',
                '/images/jungoal.PNG',
              ]}
            />
          ) : (
            <div>상품 이미지가 없습니다.</div>
          )}
        </div>
        <div className="px-6 py-4 bg-white border-b-2 border-gray-300 shadow-lg ">
          <div className="mb-4 text-2xl font-extrabold">{shopData?.title}</div>
          <div className="flex items-center justify-center h-48 border-2 rounded-xl">{`${shopData?.title}입니다.`}</div>
        </div>
        <div className="px-6 mt-2 bg-white border-t-2 shadow-md">
          <div className="mt-4 mb-2 text-lg font-bold ">인기 메뉴</div>
          <List className="flex flex-col divide-y">
            {productsData?.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}?shopId=${shopId}`}>
                <ListItemButton className="py-4">
                  <div className="flex">
                    {product.image ? (
                      <div className="relative w-16 h-16 mr-4 overflow-hidden border border-gray-300 rounded-lg">
                        <Image
                          src={product.image}
                          alt="메뉴 이미지"
                          layout="fill"
                        />
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center w-16 h-16 mr-4 overflow-hidden bg-gray-300 border border-gray-300 rounded-lg">
                        <span className="text-xs text-white">이미지 없음</span>
                      </div>
                    )}
                    <div className="flex flex-col justify-between">
                      <div className="text-sm font-bold">{product.name}</div>
                      <div className="text-xs text-gray-500">
                        {product.description}
                      </div>
                      <div className="text-sm">
                        {product.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </div>
        {totalCount !== 0 ? (
          <TabBar
            contain={true}
            count={totalCount}
            price={totalPrice}
            text={'장바구니 보기'}
            onClick={() => router.push(`/basket?shopId=${shopId}`)}
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default Shop;
