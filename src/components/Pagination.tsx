import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const MAX_BUTTON = 5;
const MAX_CONTENT = 10;

const Pagination = (props: any) => {
  let minimumPage = 1;
  let maximumPage = 5;
  const {currentPage, setCurrentPage, data} = props;
  const {products, totalCount } = data?.data || '';


  const [minItemSize, setMinItemSize] = useState(() => minimumPage);
  const [maxItemSize, setMaxItemSize] = useState(() => maximumPage);

  const maxPages = Math.ceil(totalCount/MAX_CONTENT)

  useEffect(() => {
    console.log("minimumPage :",minimumPage)
    console.log("maximumPage :",maximumPage)
  },[])
//
  let pages = [];
  for(let i=minItemSize;i<=maxItemSize;i++){
    pages.push(i);
  }


  const prevListButton = () => {

    minimumPage = minimumPage-5;
    maximumPage = maximumPage-5;
    if(minimumPage <= 0){
      minimumPage = 1;
      maximumPage = 5;
    }
    if(maximumPage !== minimumPage+4){
      maximumPage = minimumPage+4;
    }
    console.log("왜:", minimumPage)
    setMinItemSize(() => minimumPage);
    setMaxItemSize(() => maximumPage)
    setCurrentPage(() => minimumPage)
    console.log("뭐지 :", minItemSize,maxItemSize)
    // setCurrentPage(maximumPage);
  }

  const nextListButton = () => {
    minimumPage = minimumPage+5;
    maximumPage = maximumPage+5;
    if(maximumPage > maxPages ){
      maximumPage = maxPages;
    }
    if(minimumPage > maximumPage){
      minimumPage = maximumPage;
    }
    // setCurrentPage(minimumPage);
    setMinItemSize(() => minimumPage);
    setMaxItemSize(() => maximumPage)
    setCurrentPage(() => maximumPage)
    console.log(minimumPage,maximumPage)
  }


  return (
    <Container>
      <Button
        disabled={currentPage <= 5}
        onClick={() => prevListButton()}
      >
        <VscChevronLeft />
      </Button>
        <PageWrapper>
          {pages.map((v)=> (
            <Page key={v} onClick={() => {setCurrentPage(v)}}>{v}</Page>
          ))}

        </PageWrapper>
      <Button
        disabled={currentPage === maxPages}
        onClick={() =>nextListButton()}
      >
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
