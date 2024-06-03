
import Link from "next/link";

const RestaurantHeader = () => {
    return (
        <div className="header-wrapper">
            <div>
                <img style={{width: '100px'}} src="/delivery-scooter.jpg" alt="profile" />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/login">Login/Signup</Link>
                </li>
                <li>
                    <Link href="/profile">Profile</Link>
                </li>
            </ul>
        </div>
    );
}

export default RestaurantHeader;
