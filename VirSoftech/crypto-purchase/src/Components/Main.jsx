import React, { useState } from 'react';
import '../Styling/Main.css';
import { useEffect } from 'react';

const initialCryptoData = [
  { name: 'Bitcoin', price: 40000, image: 'bitcoin.png' },
  { name: 'Ethereum', price: 2800, image: 'ethereum.png' },
  { name: 'Litecoin', price: 150, image: 'litecoin.png' },
];

const Main = () => {
  const [cart, setCart] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [prices, setPrices] = useState([0, 0, 0]);
  const [cryptoData, setCryptoData] = useState(initialCryptoData)

  useEffect(() => {
    const updatePrices = () => {
      const updatedData = cryptoData.map((crypto) => ({
        ...crypto,
        price: crypto.price + Math.random() * 100 - 50, // Generate a random price change for each cryptocurrency
      }));
      setCryptoData(updatedData);
    };

    // Update prices every 3 seconds
    const intervalId = setInterval(updatePrices, 3000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [cryptoData]);


  const handleBuy = (crypto, quantity) => {
    if (quantity <= 0 || !quantity) {
      alert('Please enter a valid quantity');
      return;
    }
    let picture = ""
    if (crypto.name == "Bitcoin") {
      picture = "bitcoin.png"
    } else if (crypto.name == "Ethereum") {
      picture = "ethereum.png"
    } else {
      picture = "litecoin.png"
    }

    const item = {
      name: crypto.name,
      quantity,
      total: crypto.price * quantity,
      picture
    };

    setCart([...cart, item]);
    setSelectedCrypto('');
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  }

  const renderCryptoCards = () => {
    return cryptoData.map((crypto, index) => (
      <div key={index} className="crypto-card">
        <div class="container">
          <div class="wrapper">
            <img src={crypto.image} alt="" className='banner-image' />
            <h1>{crypto.name}</h1>
            <p>Price: ${crypto.price.toFixed(2)}</p>
          </div>
          <div class="button-wrapper">
            <input
              type="number"
              placeholder="Quantity"
              className='btn outline'
              onChange={(e) => setSelectedCrypto({ ...selectedCrypto, [crypto.name]: e.target.value })}
              value={selectedCrypto[crypto.name] || ''}
            />
            <button onClick={() => handleBuy(crypto, selectedCrypto[crypto.name])} class="btn fill">BUY</button>
          </div>
        </div>
      </div>
    ));
  };

  const renderCart = () => {
    if (cart.length === 0) {
      return <p className='err-msg'>Your cart is empty!</p>;
    }
    return (
      <div>
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img className='cart-image-coin' src={item.picture} alt="" />
            <p>{item.name}</p>
            <div style={{ display: 'flex', gap: "30px" }}>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.total.toFixed(2)}</p>
            </div>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="Container">
      <h1>Crypto Storefront</h1>
      <div className="crypto-container">{renderCryptoCards()}</div>
      <h1>Your Cart</h1>
      <div className="cart-container">{renderCart()}</div>
    </div>
  );
}

export default Main
