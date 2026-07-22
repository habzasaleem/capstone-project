import SettingsFormV2 from './components/SettingsFormV2'

function App() {
  const handleSubmit = (data) => {
    console.log('Validated data:', data);
  };

  return <SettingsFormV2 onSubmit={handleSubmit} />
}

export default App