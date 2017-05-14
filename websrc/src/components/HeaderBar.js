// @flow
import React from "react";
import { Link } from "../routing/Router";

type Card = {
  content: string,
  onClick: ?Function
};

type Props = {
  cards: Array<Card>
};

function HeaderCard(card: Card) {
  // click events
  let clicked = (e: Event) => {
    if (typeof card.onClick === 'function') {
      card.onClick(e);
    }
  }

  let icon = null;
  if (card.icon) icon = <card.icon width={32} />;
  return (
    <div key={card.content} className="card" onClick={clicked}>
      <span className="icon">
        {icon}
      </span>
      <span>{card.content}</span>
      <style jsx>
        {`
          .card {
            display: inline-flex;
            align-items: center;
            margin: 0 10px 0 10px;
            padding-left: 7px;
            width: 150px;
            height: 56px;
            box-shadow: 1px 1px 1px 1px rgba(200, 200, 200, .4);
            cursor: pointer;
            transition: background-color 1s;
          }
          .card:hover {
            background-color: #EEEEEE;
          }
          .icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin-right: 10px;
          }
          .card :global(svg) {
            margin-left: 5px;
            margin-right: 7px;
          }
        `}
      </style>
    </div>
  );
}

export default class HeaderBar extends React.Component {
  render() {
    let props: Props = this.props;
    let cards = this.props.cards || [];
    return (
      <div className="header-bar">
        <div className="cards">{cards.map(c => HeaderCard(c))}</div>
        <style jsx>
          {`
        .header-bar {
          display: flex;
          align-items: center;
          width: 100vw;
          max-width: 100vw;
          min-height: 67px;
          padding-left: 20px;
        }
        
      `}
        </style>
      </div>
    );
  }
}
