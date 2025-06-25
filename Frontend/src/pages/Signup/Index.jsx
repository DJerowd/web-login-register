import useRegister from '../../hooks/Auth/useRegister';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';

import '../../Styles/sign.css';

function Signup() {
    const { register, errors } = useRegister();

    return (
        <div className='container'>
            <Header/>
            <div className='content'>

                <main className='sign'>
                    <h2 className='title'>Registre-se agora mesmo</h2>
                    <Form register={register} errors={errors} />
                </main>

            </div>
            <Footer/>
        </div>
    );
}

export default Signup;