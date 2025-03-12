import { React } from 'react';

import './Styles.css';

function Loading() {
    return (
        <div className='container'>

            <div className='content'>
                <main className='loader'>
                    <div class="justify-content-center jimu-primary-loading"/>
                </main>
            </div>

        </div>
    );
}

export default Loading;