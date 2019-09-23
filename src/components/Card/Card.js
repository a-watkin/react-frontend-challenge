import React from 'react';

const Card = (props) => {
  return (
    <div className="card">
      <div className={props.style}>

        <div className="row text-left no-gutters">

          <div className="col-2 text-left my-auto product-image-container">
            <img className="img-fluid product-image" src={props.img} alt={props.productName} />
          </div>

          <div className="col-3 text-left my-auto font-weight-bold">
            <p className="product-name">{props.productName}</p>
          </div>

          <div className="col text-left my-auto">
            Category:
                  <p>{props.category}</p>
          </div>

          <div className="col text-left my-auto">
            Size:
                  <p>UK {props.size}</p>
          </div>

          <div className="col text-left my-auto">
            Color:
                  <p>{props.colour}</p>
          </div>

          <div className="col-1 my-auto customer-initials-col">
            <p className="text-center customer-initials">{props.customerInitials}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
