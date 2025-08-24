import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
import Box from '@mui/material/Box';

const regex = /www\.(.*?)\.ro/;

const getUrls = searchTerm => [
	`https://www.skroutz.ro/search?keyphrase=${searchTerm}`,
	`https://www.ozone.ro/instantsearchplus/result/?q=${searchTerm}`,
	`https://www.dragongames.ro/produse?c=${searchTerm}`,
	`https://www.redgoblin.ro/search?q=${searchTerm}`,
	`https://www.barlogulcujocuri.ro/produse?c=${searchTerm}`,
	`https://www.shop.guildhall.ro/produse?c=${searchTerm}`,
	`https://www.jocozaur.ro/search?options%5Bprefix%5D=last&type=product%2Carticle%2Cpage&q=${searchTerm}`,
	`https://www.pionul.ro/index.php?route=product/search&search=${searchTerm}&description=true`,
	`https://www.lexshop.ro/produse?c=${searchTerm}`,
	`https://www.regatuljocurilor.ro/ro/cautare?controller=search&orderby=position&orderway=desc&search_query=${searchTerm}&submit_search=`,
	`https://www.dragongames.ro/produse?c=${searchTerm}`
];

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [urls, setUrls] = useState<string[]>([]);

	const handleSearch = () => setUrls(getUrls(searchTerm));

	const handleReset = () => {
		setSearchTerm('');
		setUrls([]);
	};

	const handleOpenAll = () => urls.forEach(url => window.open(url, '_blank'));

	return (
		<>
			<Box sx={{display: 'flex', alignItems: 'center', gap: 2, padding: 2}}>
				<TextField
					variant="outlined"
					value={searchTerm}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
				/>
				<Button variant="contained" onClick={handleSearch}>
					Search
				</Button>
				<Button variant="contained" onClick={handleReset}>
					Reset
				</Button>
				{urls.length > 0 && (
					<Button variant="contained" onClick={handleOpenAll}>
						Open All
					</Button>
				)}
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2}}>
				{urls.map(url => {
					const site = url.match(regex)?.[1] as string;
					return (
						<Button key={url} variant="contained" onClick={() => window.open(url, '_blank')}>
							{site}
						</Button>
					);
				})}
			</Box>
		</>
	);
}

export default App;
