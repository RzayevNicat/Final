import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const QuickProvider = ({ children }) => {
	const [ details, setDetails ] = useState({});
	const [ saleProduct, setSaleProduct ] = useState({});
	const data = {
		details,
		setDetails,
		saleProduct,
		setSaleProduct
	};
	return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useQuick = () => useContext(Context);
