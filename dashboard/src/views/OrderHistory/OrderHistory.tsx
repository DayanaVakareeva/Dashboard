import OrderList from "../../components/OrderList/OrderList"
import { AppContext } from "../../context/AppContext"
import { useContext } from 'react';

export default function OrderHistory() {
    const appState = useContext(AppContext);
    const userId = appState.user?.uid;

    return (
        <div className="p-10 ">
        {userId && <OrderList userId={userId} />}
        </div>
    )
}