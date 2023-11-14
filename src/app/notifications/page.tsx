import Header from "../[Comps]/Header"
import { getServerSession } from "next-auth/next"
import NotificationFeed from "../[Comps]/NotificationFeed"
export async function getProps() {
    const session = await getServerSession()
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    return {
        props: {
            session
        }
    }
}
const Notifications = async () => {
    const props = getProps()
    return (
        <div>
            <Header label="Notifications" showBackArrow />
            <NotificationFeed />
        </div>
    )
}

export default Notifications