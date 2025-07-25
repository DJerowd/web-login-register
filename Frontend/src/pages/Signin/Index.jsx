import useLogin from '../../hooks/Auth/useLogin';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';

import '../../Styles/sign.css';

export default function Login() {
    const { login, errors } = useLogin();

    return (
        <div className='container'>
            <Header/>
            <div className='content'>

                <main className='sign'>
                    <h2 className='title'>Acesse sua conta</h2>
                    <Form login={login} errors={errors} />
                </main>

            </div>
            <Footer/>
        </div>
    );
};