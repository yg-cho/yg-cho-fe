import styled from 'styled-components';

import { Product } from '@/types/product';
import ProductItem from './ProductItem';
import Link from 'next/link';

type ProductListProps = {
  products: Product[];
};

const ProductList = (props: any) => {
  const list = props?.data?.data;
  console.log("?? :",list)
  return (
    <Container>
      {list?.products.length > 0 ?
        list?.products.map((item: any) => (
            <Link href={`/products/${item.id}`} key={item.id}>
              <ProductItem key={item.id} product={item}/>
            </Link>
        )): null
      }
    </Container>
  )
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
