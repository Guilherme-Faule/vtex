import React, { useState, useEffect } from 'react';
import Cart from '../../assets/cart.png';
import { Container } from './style';

import api from '../../service/api';

interface IProduct {
  id: number;
  photo: string;
  name: string;
  description: string;
  price: number;
}

const Home: React.FC = () => { 
  const[ data, setData ] = useState<IProduct[]>([]);
  const[ cart, setCart ] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('').then(
      response => {
        setData(response.data)
      }
    )
  }, []);

  const handleCart = (index: number) => {
    let push: any = [ ...cart, cart.push(data[index])]
    setCart(push)
    const productStore =JSON.stringify(cart);
    localStorage.setItem('@cart',productStore)
   }

  return(
      <Container>
        <div className="nav">
            <div>
              <img src="https://th.bing.com/th/id/R.50dfe2f9c9d9b088e264f86022430610?rik=wudeDtsdZ%2f8AJA&riu=http%3a%2f%2fwww.fitforcommerce.com%2fwp-content%2fuploads%2f2016%2f05%2fvtex-logo-300x212.png&ehk=Q6f%2byWeCd6VRJC9IKNEpcG36cTqdZada2InD8%2fRWxvs%3d&risl=&pid=ImgRaw" alt="vtex" width="200px" height="auto" />
            </div>
            <div className="cart">
              <img src={Cart} alt="shopcart" width="50px" height="auto"/>
              <span>( {cart.length} ) - Itens</span>
            </div>
        </div>
          <section>
          { data.map( (prod, index) => (
            <div className="product-content" key={prod.id}>
              <img src={prod.photo} alt="iphone" width="200" height="auto" />
              <h4>{prod.name}</h4>
              <span>{prod.description}</span>
              <h6>{prod.price}</h6>
              <button onClick={ () => handleCart(index)}>Adicionar ao carrinho!</button>
        </div> 
          ))}
        </section>
      </Container>
  );
}

export default Home;