import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Socials from '../../components/Socials';

import '../../Styles/home.css';

function Home() {
    return (
        <div className='container'>
            <Header/>
            <div className='content content-home'>
                
                <main className='home'>
                    <h1>Crie uma conta gratuitamente</h1>
                    <h2>Faça login e veja as informações registradas.</h2>

                    <section className='socials'>
                        <Socials/>
                    </section>
                </main>

            </div>
            <Footer/>
        </div>
    );
}

export default Home;