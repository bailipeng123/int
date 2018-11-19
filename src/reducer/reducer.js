function reducer(state={},action){
	switch(action.type){
		case'changelist':
		 return{
		 	...state,
		 	list:action.list
		 }
		case'changehash':
			return{
				...state,
				hash:action.hash
			}
		default:
			return state;
	}
}
export default reducer;
