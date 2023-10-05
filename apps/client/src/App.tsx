import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';

const baseUrl = 'http://localhost:8080'

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
  const [botId, setBotId] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [botMessage, setBotMessage] = useState('')
  const [error, setError] = useState<null | string>(null)

  const sendBusinessData = async () => {
    try {

      if (businessForm.businessName === '' || businessForm.context === '' || businessForm.limitations === '' || businessForm.observations === '' || businessForm.service === '') {
        return
      }
      const body = {
        name: businessForm.businessName,
        content: businessForm.context,
        observation: businessForm.observations,
        service: businessForm.service,
        limitations: businessForm.limitations
      }
      const response = await fetch(`${baseUrl}/bots`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setBotId(data.id)
      } else {
        setError('Failed to fetch bot data')
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error fetching bot data: ${error.message}`)
      }
    }
  };


  const sendUserQuestion = async () => {
    try {

      const body = {
        message: userMessage,
      }
      const response = await fetch(`${baseUrl}/bots/${botId}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        const data = await response.json()
        setBotMessage(data.content)
      } else {
        setError('Failed to fetch message data')
        console.log(error)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error fetching message data: ${error.message}`);
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

  const handleSubmitUserMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userMessage === '' || botId === '') {
      return
    }

    sendUserQuestion()
  }

  return (
    <div className="border rounded-md border-gray-400 p-15">
      {/* Title */}
      <h1 className="flex items-center justify-center mb-4" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
        <img src="./src/images/TailorTalk_Logo.png" alt="Logo Alt Text" />
      </h1>
      <div className="flex w-full ">
        {/* Left Part */}
        <div className="w-1/2 p-4 bg-gray-100 rounded-md border border-gray-300">
          <form onSubmit={handleSubmitBusiness}>
            <h1 className='text-xl font-bold'>Business Panel</h1>
            <div className='text-left mb-4'>
              <label className='pl-15 text-gray-500 text-sm' htmlFor="businessName">Business Name</label>
              <Input
                id="businessName"
                value={businessForm.businessName}
                onChange={(e) => setBusinessForm({ ...businessForm, businessName: e.target.value })}
              />
            </div>
            <div className='text-left mb-4'>
              <label className='pl-15 text-gray-500 text-sm' htmlFor="context">Context</label>
              <Textarea
                id="context"
                value={businessForm.context}
                onChange={(e) => setBusinessForm({ ...businessForm, context: e.target.value })}
              />
            </div>
            <div className='text-left mb-4'>
              <label className='pl-15 text-gray-500 text-sm' htmlFor="service">Services offered</label>
              <Textarea
                id="service"
                value={businessForm.service}
                onChange={(e) => setBusinessForm({ ...businessForm, service: e.target.value })}
              />
            </div>
            <div className='text-left mb-4'>
              <label className='pl-15 text-gray-500 text-sm' htmlFor="limitations">Limitations</label>
              <Textarea
                id="limitations"
                value={businessForm.limitations}
                onChange={(e) => setBusinessForm({ ...businessForm, limitations: e.target.value })}
              />
            </div>
            <div className='text-left mb-4'>
              <label className='pl-15 text-gray-500 text-sm' htmlFor="observations">Observations</label>
              <Textarea
                id="observations"
                value={businessForm.observations}
                onChange={(e) => setBusinessForm({ ...businessForm, observations: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-900 text-white">Submit</Button>
            </div>
          </form>
        </div>
        {/* Right Part */}
        <div className="w-1/2 p-4 bg-blue-100 rounded-md border border-grey-300">
          <h2 className='text-xl font-bold'>User Panel</h2>
          <form onSubmit={handleSubmitUserMessage}>
            <div className='text-left mb-4'>
              <label className='pl-15 text-gray-500 text-sm' htmlFor="userMessage">User Message</label>
              <Textarea
                id="userMessage"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-900 text-white">Submit</Button>
            </div>

          </form>
          <div className='text-left mb-4'>
            <label className='pl-15 text-gray-500 text-sm' htmlFor="botMessage">Bot Message</label>
            <div className="border rounded-md border-gray-300 p-4">
              <Textarea
                rows='8' // Increase the number of rows to make it taller
                value={botMessage}
                readOnly // Assuming it's read-only
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
