import AppContainer from '@/containers/AppContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppContainer />} />
			</Routes>
		</BrowserRouter>
	</>
);

export default App;
