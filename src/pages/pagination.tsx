import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductList from '@/components/Product/ProductList';
import Pagination from '@/components/Pagination';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const maxPage = 10;

async function fetchProducts(pageNum: number) {
  const response = await fetch(
    `/products?page=${pageNum}&size=10`
  );
  return response.json();
}

const PaginationPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  useEffect(() => {
    if(currentPage < maxPage) {
      const nextPage = currentPage+1;
      queryClient.prefetchQuery(["products",nextPage],
        () => fetchProducts(nextPage))
    }

  },[currentPage,queryClient])
  const [products, setProducts] = useState<Object>();
  const router = useRouter();
  const { page } = router.query;

  const { data, isError, error, isLoading } = useQuery(
    ["products", currentPage],
    () => fetchProducts(currentPage),
    {
      staleTime: 6000,
      keepPreviousData: true,
    }
    );
  // console.log("pagination: ",data?.data)



  return (
    <>
      <Container>
        <ProductList data={data} />
        <Pagination data={data} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </Container>
    </>
  );
};

export default PaginationPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
