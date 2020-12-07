import List from './List';

function App() {

	const sampleData = [];
	for (let i = 0; i < 1000; i++) {
		sampleData.push({
			name: i,
			height: 100 + Math.round(Math.random() * 100)
		});	
	}

	const style = {
		display: 'grid',
		gridTemplateColumns: '300px auto',
		height: '100vh'
	}
	
	return (
		<div style={style}>
			<List data={sampleData} />
			<div />
		</div>
	);
}

export default App;
