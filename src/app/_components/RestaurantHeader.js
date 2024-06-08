'use client'
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const RestaurantHeader = () => {
    const [details, setDetails] = useState();
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        let data = localStorage.getItem('restaurantUser');
        if (!data && pathname == '/restaurant/dashboard') {
            router.push('/restaurant');
            return;
        } else if (data && pathname == '/restaurant') {
            router.push('/restaurant/dashboard');
        } else {
            setDetails(JSON.parse(data));
        }
    }, []);
    const logout = () => {
        localStorage.removeItem('restaurantUser');
        router.push('/restaurant');
    }
    return (
        <div className="header-wrapper">
            <div>
                <img style={{ width: '100px' }} src="/delivery-scooter.jpg" alt="profile" />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {
                    details && details.email ? (
                        <>
                            <li>
                                <button onClick={logout}> Logout</button>
                            </li><li>
                                <Link href="/restaurant/dashboard">Profile</Link>
                            </li></>
                    ) : (
                        <li>
                            <Link href="/restaurant">Login/Signup</Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default RestaurantHeader;
