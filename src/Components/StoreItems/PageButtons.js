import "./PageButtons.css";
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const PageButtons = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page');
  const navigate = useNavigate();

  console.log(page);

  const isPageQueryADigit = (pageQuery) => {
    const pageAsInteger = parseInt(pageQuery);
    const digitRegex = /^\d$/;
    return digitRegex.test(pageAsInteger);
  };

  useEffect(() => {
    const page = queryParams.get('page');
    if (!isPageQueryADigit(page)) {
      setPageNumber(1);
    } else {
      setPageNumber(parseInt(page));
    }
  }, [queryParams]);

  const navigateToPage = (pageNumber) => {
    // // Update the URL with the new page number
    // const newSearchParams = new URLSearchParams(location.search);
    // newSearchParams.set('page', pageNumber);
    navigate(`/products?page=${pageNumber}`);
  };

  return (
    <div className='page-button-container'>
      <button onClick={() => navigateToPage(pageNumber - 1)}>Left Button</button>
      <span>{pageNumber}</span>
      <button onClick={() => navigateToPage(pageNumber + 1)}>Right Button</button>
    </div>
  );
};

export default PageButtons;
