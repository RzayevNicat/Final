import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const UserProvider = ({ children }) => {
	const [ info, setInfo ] = useState(true);
	const [ wishList, setWishlist ] = useState(false);
	const [ card, setCard ] = useState(false);
	const data = {
		info,
		setInfo,
		wishList,
		setWishlist,
		card,
		setCard
	};
	return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useQuick = () => useContext(Context);
