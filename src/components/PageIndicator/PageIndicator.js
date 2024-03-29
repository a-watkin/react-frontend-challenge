import React from 'react';

const PageIndicator = (props) => {

  return (
    <span>
      <span className="page-number page-number-left">
        {
          props.currentPage < 10 ? `${0}${props.currentPage}`
            : props.currentPage
        }
      </span>

      <span className="vertical-line"></span>

      <span className="page-number page-number-right">
        {
          props.endPage < 10 ? `${0}${props.endPage}`
            : props.endPage
        }
      </span>
    </span>

  )
}

export default PageIndicator
