import { React } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Styles.css';

function Home() {
    return (
        <div className='container'>
            <Header/>

            <div className='content'>
                <main className='home'>
                    <h1>Crie uma conta gratuitamente</h1>
                    <h2>Faça login e veja as informações registradas.</h2>
                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Home;