import supabase from './supabase'

const getUser = async () => {
	const {
		data: { user }
	} = await supabase.auth.getUser()
	return user
}

export default getUser
