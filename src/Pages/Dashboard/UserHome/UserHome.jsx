import useAuth from "../../../Hooks/UseAuth";


const UserHome = () => {
    const {user}= useAuth()

    return (
        <div>
            <h3 className="text-3xl">
                <span>Welcome Dear: </span>
                {
                user?.displayName? user.displayName: 'Annonymous'
            }
            </h3>
        </div>
    );
};

export default UserHome;