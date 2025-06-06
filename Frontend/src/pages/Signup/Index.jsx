import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';

import '../../Styles/sign.css';

function Signup() {

    return (
        <div className='container'>
            <Header/>
            <div className='content'>

                <main className='sign'>
                    <h2 className='title'>Registre-se agora mesmo</h2>
                    <Form/>
                </main>

            </div>
            <Footer/>
        </div>
    );
}

export default Signup;