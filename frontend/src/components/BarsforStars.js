import React from 'react';

export default function BarsforStars(props) {
  return (
      <React.Fragment>
    <div className=" row top bars-grey"><div className="bar-yellow five-stars">5 stelle</div></div>
    <div className=" row top bars-grey"><div className="bar-yellow four-stars">4 stelle</div></div>
    <div className=" row top bars-grey"><div className="bar-yellow three-stars">3 stelle</div></div>
    <div className=" row top bars-grey"><div className="bar-yellow two-stars">2 stelle</div></div>
    <div className=" row top bars-grey"><div className="bar-yellow one-star">1 stelle</div></div>
    <div className=" row top bars-grey"><div className="bar-yellow zero-star">0 stelle</div></div>
    </React.Fragment>
  )
}