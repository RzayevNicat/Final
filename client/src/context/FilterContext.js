import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const FilterProvider = ({ children }) => {
	const [ all, setAll ] = useState(true);
	const [ acsesories, setAcsesories ] = useState(false);
	const [ electronics, setElectronics ] = useState(false);
	const [ men, setMen ] = useState(false);
	const [ women, setWomen ] = useState(false);
	const [ shoes, setShoes ] = useState(false);

	const data = {
		all,
		setAll,
		acsesories,
		setAcsesories,
		electronics,
		setElectronics,
		men,
		setMen,
		women,
		setWomen,
		shoes,
		setShoes
	};
	return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useFilter = () => useContext(Context);
