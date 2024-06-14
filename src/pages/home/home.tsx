import React from 'react';
// import styles from './home.module.css'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Home</h1>
      <Footer />
    </div>
  )
}

export default Home;