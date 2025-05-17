import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { IoArrowBack, IoSearch } from "react-icons/io5";

import useSearchUsers from '../../hooks/Users/useSearchUsers';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Error from "../Error";

import Loading from '../Loading';
import List from './List.jsx';
import Pagination from './Pagination.jsx';

import '../../Styles/table.css';

function UsersList() {
    const { users, setUpdateList, loading, errors, search, setSearch } = useSearchUsers();
    const loggedInUser = getLoggedInUser();
    const navigate = useNavigate();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // ERRO LOGIN INATIVO
    if (!loggedInUser) { return ( <Error/> ); }

    // TELA DE LOADING
    if (loading) { return <Loading/>; }

    return (
        <div className='container'>
            <Header/>
            <div className='content content-list'>

                <main>
                    
                    <div className='btn-bar'>
                        <button className='return-btn' title="Voltar" onClick={() => navigate(-1)}> 
                            <IoArrowBack className='return-icon' /> 
                        </button>
                        
                        <label className='search-input'>
                            <button className='icon' onClick={() => setUpdateList(prevState => !prevState)}>
                                <IoSearch/>
                            </button>
                            <input 
                                type="text" 
                                placeholder="Pesquisar..." 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                                disabled={loading}
                            />
                        </label>
                    </div>

                    <List users={users} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />

                    {errors && <h3 className={'error'}>{errors}</h3>}
                    
                    <Pagination users={users} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />
                    
                </main>

            </div>
            <Footer/>
        </div>
    );
}

export default UsersList;