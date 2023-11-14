import Header from "../[Comps]/Header"
import NotificationFeed from "../[Comps]/NotificationFeed"
const Notifications = async () => {
    return (
        <div>
            <Header label="Notifications" showBackArrow />
            <NotificationFeed />
        </div>
    )
}

export default Notifications