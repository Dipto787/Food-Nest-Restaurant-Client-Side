import UseAuth from "../../Components/hooks/UseAuth";


const UserHome = () => {
    let { user } = UseAuth();
    return (
        <div>
            <h1 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                    user.displayName ? user.displayName : 'back'
                }
            </h1>
        </div>
    );
};

export default UserHome;