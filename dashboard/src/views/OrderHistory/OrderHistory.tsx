import OrderList from "../../components/OrderList/OrderList"
import AppContext from "../../context/AppContext"
import { useContext } from 'react';

/**
 * OrderHistory component
 * @returns JSX.Element
 */
export default function OrderHistory() {
    // Get the app state from the context
    const appState = useContext(AppContext);
    // Get the user ID from the app state
    const userId = appState.user?.uid;

    return (
        <div className="p-10 ">
        {/* If the user ID exists, render the OrderList component with the user ID as a prop */}
        {userId && <OrderList userId={userId} />}
        </div>
    )
}