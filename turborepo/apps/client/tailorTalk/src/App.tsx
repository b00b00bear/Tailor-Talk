import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
const baseUrl = ''

type BusinessForm = {
  businessName: string,
  context: string,
  service: string,
  limitations: string,
  observations: string
}

function App() {
  const [businessForm, setBusinessForm] = useState<BusinessForm>({
    businessName: '',
    context: '',
    service: '',
    limitations: '',
    observations: ''
  })

  const [userMessage, setUserMessage] = useState('')
  const [botMessage, setBotMessage] = useState('')

  const [error, setError] = useState<null | string>(null);

  const sendBusinessData = async () => {
    try {

      const body = {
        name: businessForm.businessName,
        content: businessForm.context,
        observation: businessForm.observations,
        service: businessForm.service,
        limitations: businessForm.limitations
      }
      const response = await fetch('/bots'); // Replace with your server API endpoint
      if (response.ok) {
        const data = await response.json();

      } else {
        setError('Failed to fetch bot data');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error fetching bot data: ${error.message}`);
      }
    }
  };


  const handleSubmitBusiness = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (businessForm.businessName === '' || businessForm.context === '' || businessForm.limitations === '' || businessForm.observations === '' || businessForm.service === '') {
      return
    }

    sendBusinessData()
  }

  const handleSubmitUserMessage = () => {
    // Handle submission for user message - implement logic here
  }

  return (
    <div>
      <form onSubmit={handleSubmitBusiness}>

        <h1 className='text-2xl'>Business Information</h1>
        <div>
          <label htmlFor="businessName">Business Name:</label>
          <Input
            id="businessName"
            value={businessForm.businessName}
            onChange={(e) => setBusinessForm({ ...businessForm, businessName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="context">Context:</label>
          <Textarea
            id="context"
            value={businessForm.context}
            onChange={(e) => setBusinessForm({ ...businessForm, context: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="service">Service:</label>
          <Textarea
            id="service"
            value={businessForm.service}
            onChange={(e) => setBusinessForm({ ...businessForm, service: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="limitations">Limitations:</label>
          <Textarea
            id="limitations"
            value={businessForm.limitations}
            onChange={(e) => setBusinessForm({ ...businessForm, limitations: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="observations">Observations:</label>
          <Textarea
            id="observations"
            value={businessForm.observations}
            onChange={(e) => setBusinessForm({ ...businessForm, observations: e.target.value })}
          />
        </div>
        <Button >Submit</Button>
      </form>

      <h1 >User and Bot Messages</h1>
      <div>
        <label htmlFor="userMessage">User Message:</label>
        <Textarea
          id="userMessage"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <Button onClick={handleSubmitUserMessage}>Submit</Button>
      </div>
      <div>
        <label htmlFor="botMessage">Bot Message:</label>
        <p>{botMessage}</p>
      </div>
    </div>
  );
}

export default App
