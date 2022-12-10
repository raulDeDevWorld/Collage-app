import React, { useState, useMemo, useContext} from 'react'

const UserContext = React.createContext()

export function UserProvider ({ children }) {

	// Data de un usuario proveido por FIREBASE AUTHENTICATION
	const [user, setUser] = useState(undefined)
	// Data de un usuario proveido por FIREBASE DATABASE
	const [userDB, setUserDB] = useState('loading')
	const [success, setSuccess] = useState(null)
	const [image, setImage] = useState({})

	function setUserProfile (userProfile) {
		setUser(userProfile)
	}
	function setUserData (userDatabase) {
		setUserDB(userDatabase)
	}
	function setAlbunImage (data) {
		setImage(data)
	}

	function setUserSuccess (mode) {
		setSuccess(mode)
		setTimeout(()=>{ setSuccess(null)}, 6000)
	}


	const value = useMemo(()=>{
		return ({
			user,
			userDB,
			success,
			image,
			setUserProfile,
			setUserData,
			setUserSuccess,
			setAlbunImage,
		})
	}, [ user, userDB,  success, image])

	return (
		<UserContext.Provider value={value} >
			{ children }
		</UserContext.Provider>
	)
} 

export function useUser () {
	const context = useContext(UserContext)
	if(!context){
		throw new Error('error')
	}
	return context
}