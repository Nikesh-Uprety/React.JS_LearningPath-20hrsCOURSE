import cardstyles from './Card.module.css';

const Card = (props) => (
    <div className={cardstyles.card}>
      <div className={cardstyles.front}>
        <img src="/juice.jpg" alt="Avatar" className={cardstyles.cardImage} />
        <div className={cardstyles.container}>
          <h3>Vitamin Juice <span className={cardstyles.price}>$24.99</span></h3> 
          <p>Need a jump on your vitamins while drinking? Tired of popping the pills? 
            Drink our vitamin enhanced juice, available in several flavours.</p>
        </div>
      </div>
    </div>
  );

export default Card;
