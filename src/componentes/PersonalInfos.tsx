// This component can be called many times at the view "HomeProfile.tsx".

import "../css/PersonalInfos.css";

type Props = {
    personalUserData: string | boolean;
    userAttribute: string;
}


const personalInfo = (props: Props) => {

    return (
        <>
            <div className="dataDescription">
                Your <span>{props.userAttribute}</span>
            </div>

            <div className="personalData">
                {props.personalUserData}
            </div>
        </>

    )
}


export default personalInfo;