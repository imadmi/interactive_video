import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
} from 'react';


export type AppContextProps = {
	UpdatedCurrentTime: number;
	setUpdatedCurrentTime: (UpdatedCurrentTime: number) => void;
	videoDuration: number;
	setVideoDuration: (videoDuration: number) => void;

};

const AppContext = createContext<AppContextProps | undefined>(undefined);

type AppProviderProps = {
	children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [UpdatedCurrentTime, setUpdatedCurrentTime] = useState(0);
	const [videoDuration, setVideoDuration] = useState<number>(0);




	const contextValue: AppContextProps = {

		UpdatedCurrentTime,
		setUpdatedCurrentTime,
		videoDuration,
		setVideoDuration,

	};

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};
