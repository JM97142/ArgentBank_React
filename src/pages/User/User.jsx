import './user.css'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfile, toggleOpen, editUserName, setUserNameEdit } from '../../redux/actions/userSlice'
// Components
import AccountSection from '../../components/Account/Account'

const databaseUrl = 'http://localhost:3001/api/v1/'

const accountTransactions = [
    {
        id: 1,
        title: "Argent Bank Checking (x8349)",
        amount: "$2,082.79",
        description: "Available Balance"
    },
    {
        id: 2,
        title: "Argent Bank Savings (x6712)",
        amount: "$10,928.42",
        description: "Available Balance"
    },
    {
        id: 3,
        title: "Argent Bank Credit Card (x8349)",
        amount: "$184.30",
        description: "Current Balance"
    }
]

const User = () => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('token')
    // Redirection si token absent
    useEffect(() => {
        if (!accessToken) {
            navigate('/signin')
        }
    }, [accessToken, navigate]);

    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.login.token);
    const firstName = useSelector((state) => state.user.user.firstName);
    const lastName = useSelector((state) => state.user.user.lastName);
    const userName = useSelector((state) => state.user.user.userName);
    const userNameEdit = useSelector((state) => state.user.user.userNameEdit);
    const Opened = useSelector((state) => state.user.user.isOpen);

    // Edit user profil
    async function submitUserName(e) {
        e.preventDefault()

        const userRequest = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                accept: "application/json",
            },
            body: JSON.stringify({ userName: userNameEdit })
        }

        const response = await fetch(
            databaseUrl + 'user/profile',
            userRequest
        )

        if (!response.ok) {
            const errorMessage = `An error has occured: ${response.status}`
            throw new Error(errorMessage);
        }

        const data = await response.json()
        dispatch(setUserProfile(data.body))
        dispatch(toggleOpen(false))
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            const requestProfile = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            const response = await fetch(
                databaseUrl + 'user/profile',
                requestProfile
            )

            if (!response.ok) {
                const errorMessage = `An error has occurred: ${response.status}`
                throw new Error(errorMessage)
            }

            const data = await response.json()

            if (data.body) {
                dispatch(setUserProfile(data.body))
            }
        }

        fetchUserProfile()
    }, [dispatch, userName])

    // Entrées du formulaire
    function actionUserNameChange(event) {
        dispatch(setUserNameEdit(event.target.value))
    }
    function cancelSubmitUserName() {
        dispatch(toggleOpen(!Opened))
    }
    function actionEditClick() {
        dispatch(setUserNameEdit(userName))
        dispatch(toggleOpen(true));
    }

    useEffect(() => {
        if (!Opened) {
            dispatch(editUserName())
        }
    }, [Opened, dispatch])

    return (
        <main className="main bg-dark">
            <div className="header">
                {/* Gestion affichage formulaire */}
                {Opened && (
                    <form>
                        <h1>Edit user info</h1>
                        <div className="input-label-wrapper">
                            <div className="input-wrapper-edit">
                                <label htmlFor="usernameEdit">User name</label>
                                <label htmlFor="FirstNameEdit">First name</label>
                                <label htmlFor="LastNameEdit">Last name</label>
                            </div>
                            <div className="input-wrapper-edit">
                                <input
                                    type="text"
                                    id="usernameEdit"
                                    value={userNameEdit}
                                    onChange={actionUserNameChange}
                                />
                                <input
                                    type="text"
                                    id="FirstNameEdit"
                                    value={firstName}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    id="LastNameEdit"
                                    value={lastName}
                                    readOnly
                                />
                                <div className="edit-buttons-container">
                                    <button onClick={submitUserName} className="sign-in-button">
                                        Save
                                    </button>
                                    <button
                                        onClick={cancelSubmitUserName}
                                        className="sign-in-button"
                                    >
                                        cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
                {!Opened && (
                    <>
                        <h1>
                            Welcome back
                            <br />
                            {firstName + " " + lastName}
                        </h1>
                        <button onClick={actionEditClick} className="edit-button">
                            Edit Name
                        </button>
                    </>
                )}
            </div>
            {/* Affichage transactions account */}
            <h2 className="sr-only">Accounts</h2>
            {accountTransactions.map((account) => (
                <AccountSection
                    title={account.title}
                    amount={account.amount}
                    description={account.description}
                    key={account.id}
                />
            ))}
        </main>
    )
}

export default User