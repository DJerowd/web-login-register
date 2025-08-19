import { useState } from 'react';

import { getLoggedInUser } from '../../utils/auth.js';
import useUsers from '../../hooks/Users/useUsers';

import { ReturnButton } from '../../components/Buttons';
import { SearchInput } from '../../components/Inputs';
import Pagination from '../../components/Pagination/Index.jsx';
import LoadingPage from '../../components/LoadingPage';
import ErrorPage from '../../components/ErrorPage';
import React, { Suspense } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const List = React.lazy(() => import('./List'));

import '../../Styles/table.css';
import '../../Styles/components/select.css'

export default function UsersList() {
    const loggedInUser = getLoggedInUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ limitPerPage: 10, username: '' })
    const { users, setReload, loading, errors, totalPages } = useUsers(currentPage, filters);
    
    if (!loggedInUser) return <ErrorPage/>;
    
    return (
        <div className='container'>
            <Header/>
            { loading ? <LoadingPage/> :
                <div className='content content-list'>
                    <main>
                        <div className='btn-bar'>
                            <ReturnButton/>
                            <SearchInput
                                value={filters.username}
                                onChange={e => setFilters({ ...filters, username: e.target.value })}
                                onSearch={() => { setReload(prevState => !prevState); setCurrentPage(1); }}
                                placeholder="Pesquisar..."
                                disabled={loading}
                            />
                            <select 
                                className='items-quantity-select' 
                                name="itemsPerPage" 
                                value={filters.limitPerPage} 
                                onChange={(e) => { setFilters({ ...filters, limitPerPage: e.target.value }); setCurrentPage(1); }}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <Suspense fallback={<LoadingPage />}>
                            <List 
                                users={users} 
                                currentPage={currentPage} 
                                itemsPerPage={filters.limitPerPage} 
                            />
                        </Suspense>
                        {errors && <h2 className={'form-error'}>{errors}</h2>}
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </main>
                </div>
            }
            <Footer/>
        </div>
    );
};