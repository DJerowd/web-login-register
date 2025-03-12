import { React } from 'react';
import { Link } from 'react-router-dom';

import './Styles.css';

function Error() {

    return (
        <div className='container'>

            <div className='error-content'>

                <main className='error-panel'>
                    <h2>Página não encontrada</h2>
                    <h3>A página que você está procurando não foi encontrada. Volte para a página anterior ou visite nossa Central de Ajuda para mais informações</h3>
                    <div>
                        <Link to="/">Voltar para a home</Link>
                    </div>
                </main>

            </div>

        </div>
    );
}

export default Error;