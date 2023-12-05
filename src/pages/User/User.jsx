import './user.css'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    setUserProfile,
    toggleOpen,
    editUserFirstame,
    setUserFirstnameEdit,
    editUserLastname,
    setUserLastnameEdit
} from '../../redux/actions/userSlice'
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
    const firstNameEdit = useSelector((state) => state.user.user.firstNameEdit);
    const lastNameEdit = useSelector((state) => state.user.user.lastNameEdit);
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
            body: JSON.stringify({
                firstName: firstNameEdit,
                lastName: lastNameEdit
            })
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
    function actionFirstnameChange(event) {
        dispatch(setUserFirstnameEdit(event.target.value))
    }
    function actionLastnameChange(event) {
        dispatch(setUserLastnameEdit(event.target.value))
    }
    // Soumission du formulaire
    function actionEditUsername() {
        dispatch(setUserFirstnameEdit(firstName))
        dispatch(setUserLastnameEdit(lastName))
        dispatch(toggleOpen(true));
    }
    // Close form
    function cancelSubmitUserName() {
        dispatch(toggleOpen(!Opened))
    }

    useEffect(() => {
        if (!Opened) {
            dispatch(editUserFirstame())
            dispatch(editUserLastname())
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
                                <label htmlFor="FirstNameEdit">First name</label>
                                <input
                                    type="text"
                                    id="FirstNameEdit"
                                    value={firstNameEdit}
                                    onChange={actionFirstnameChange}
                                />
                                <label htmlFor="LastNameEdit">Lastname</label>
                                <input
                                    type="text"
                                    id="LastNameEdit"
                                    value={lastNameEdit}
                                    onChange={actionLastnameChange}
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
                        <button onClick={actionEditUsername} className="edit-button">
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