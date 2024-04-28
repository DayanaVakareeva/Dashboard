import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div className="bg-red-500 w-[8%]">
                <div>
                    <ul className='sidebar-categories'>
                        <li className='category-item'>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li className='category-item'>
                            <Link to='/dashboard'>Dashboard</Link>
                        </li>
                        <li className='category-item'>
                            <Link to='/order-history'>Order History</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

