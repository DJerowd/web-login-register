import useRegister from '../../hooks/Auth/useRegister';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';

import '../../Styles/sign.css';

export default function Signup() {
    const { register, errors } = useRegister();

    return (
        <div className='container'>
            <Header/>
            <div className='content'>

                <main className='sign'>
                    <h2 className='title'>Criar uma conta</h2>
                    <Form register={register} errors={errors} />
                </main>

            </div>
            <Footer/>
        </div>
    );
};