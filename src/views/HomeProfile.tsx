// This view shows authenticated user data. I added two more informations: the user's role and their status when calling the component "PersonalInfos.tsx".

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalInfo from '../componentes/PersonalInfos';
import "../css/HomeProfile.css";

type Avatar = {
    id: number;
    high: string;
    medium: string;
    low: string
};

type UserData = {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    avatar: Avatar | null;
    type: string;
    created: string;
    modified: string;
    role: string;
};

// I took this image link 'cause I'm not an editor at Figma so I couldn't download the image that's in the prototype.
//If the value of "avatar" is null the image below will be displayed.

const imgProfile = 'https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHJvc3RvfGVufDB8MHwwfHx8Mg%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';


const HomeProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const tokenReceived = location.state.object;
    const url = 'https://api.homologation.cliqdrive.com.br/auth/profile/';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        loadData();
    }, [url, tokenReceived]);

    const loadData = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenReceived}`,
                    'Accept': 'application/json;version=v1_web',
                    'Content-Type': 'application/json'
                }
            });

            const body = await response.json();
            setData(body);
            setIsLoading(false);
        }

        catch (error) {
            console.error('ERROR GETTING DATA FROM API', error);
        }
        finally {
            setIsLoading(false);
        };
    };


    return (
        <div className="homeProfile-container">

            {isLoading ? (
                <div className="wait">
                    <h1>Please wait...</h1>
                </div>
            ) :
                (
                    data &&
                    <>
                        <header className="header">
                            <button onClick={handleLogout}>LOGOUT</button>
                        </header>

                        <main>
                            <div className="profile-box">

                                <div className="picture-area">
                                    <p>Profile picture</p>

                                    {data.avatar ?
                                        <img src={data.avatar.medium} alt={data.name} /> :
                                        <img src={imgProfile} alt={data.name} />
                                    }

                                </div>

                                <div className="personalUserData">

                                    <PersonalInfo userAttribute='Name' personalUserData={data.name} />

                                    <PersonalInfo userAttribute='E-mail' personalUserData={data.email} />

                                    <PersonalInfo userAttribute='Role' personalUserData={data.role} />

                                    <PersonalInfo userAttribute='Status' personalUserData={data.is_active ? "Active" : "Inactive"} />

                                </div>

                            </div>
                        </main>
                    </>

                )};
        </div>
    );
};


export default HomeProfile;