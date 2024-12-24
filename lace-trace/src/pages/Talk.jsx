import { useState,React} from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, CreditCardIcon, XIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import GooglePayButton from '@google-pay/button-react'


const timeSlots = [
  '10:00 AM - 12:00 PM',
  '2:00 PM - 3:00 PM',
  '4:00 PM - 5:00 PM'
]

const profiles = [
  {
    name: "Ishan",
    intro: "Hi, I'm Ishan! I'm passionate about technology and innovation. Let's connect and I can help you with your shoes problems!",
    imageUrl: "/ishan.jpeg"
  },
  {
    name: "Shiya",
    intro: "Hello! I'm Shiya, a creative problem-solver with a keen eye for design. Let's connect and I can help you with your shoes problems",
    imageUrl: "/shiya.jpeg"
  }
]

export default function Component() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showCalendar, setShowCalendar] = useState(Array(profiles.length).fill(false))
  const [selectedDate, setSelectedDate] = useState(Array(profiles.length).fill(null))
  const [selectedTime, setSelectedTime] = useState(Array(profiles.length).fill(null))

  const handleDateSelect = (date, index) => {
    const newSelectedDate = [...selectedDate]
    newSelectedDate[index] = date
    setSelectedDate(newSelectedDate)
  }

  const handleTimeSelect = (time, index) => {
    const newSelectedTime = [...selectedTime]
    newSelectedTime[index] = time
    setSelectedTime(newSelectedTime)
    const newShowCalendar = [...showCalendar]
    newShowCalendar[index] = false
    setShowCalendar(newShowCalendar)
  }

  const handleScheduleClick = (index) => {
    const newShowCalendar = [...showCalendar]
    newShowCalendar[index] = true
    setShowCalendar(newShowCalendar)
  }

  return (
    <div className="min-h-screen w-full bg-purple-700 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24 3xl:p-32 4xl:p-40 5xl:p-48 [&>*]:w-full [&>*]:max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full max-w-7xl">
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-full"
          >
            <Card 
              className="overflow-hidden backdrop-blur-lg bg-white/10 border-white/20 text-white w-full"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-4 sm:p-6">
                <motion.div
                  className="mb-4 overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                      src={profile.imageUrl}
                      alt={`${profile.name}'s photo`}
                      className="w-full h-full  object-contain"
                      
                    />
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{profile.name}</h2>
                <p className="text-sm">{profile.intro}</p>
              </CardContent>
              <CardFooter className="flex justify-end items-center space-x-2 p-4 sm:p-6">
                {!selectedDate[index] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0, y: hoveredCard === index ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                      variant="secondary" 
                      className="bg-purple-500 text-white hover:bg-purple-600"
                      onClick={() => handleScheduleClick(index)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Schedule Call
                    </Button>
                  </motion.div>
                )}
                {selectedDate[index] && selectedTime[index] && (
                  <div className="text-sm mr-auto">
                    Scheduled: {format(selectedDate[index], 'PP')} at {selectedTime[index]}
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: hoveredCard === index ? 1 : 0, y: hoveredCard === index ? 0 : 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '20',
      currencyCode: 'INR',
      countryCode: 'IN',
    },
    callbackIntents:["PAYMENT_AUTHORIZATION"]
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
  onPaymentAuthorized={paymentData =>
  {
    console.log(paymentData);
    return { transactionState: 'SUCCESS'}
  }
  }

  existingPaymentMethodRequired='false'
  buttonColor='green'
  buttonType="plain"

/>
                </motion.div>
              </CardFooter>
            </Card>
            {showCalendar[index] && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Schedule a Call</h3>
                    <Button variant="ghost" onClick={() => {
                      const newShowCalendar = [...showCalendar]
                      newShowCalendar[index] = false
                      setShowCalendar(newShowCalendar)
                    }}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <DayPicker
                    mode="single"
                    selected={selectedDate[index]}
                    onSelect={(date) => handleDateSelect(date, index)}
                    className="border-b pb-4 mb-4"
                  />
                  {selectedDate[index] && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800">Select a time:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant="outline"
                            className="justify-start text-left"
                            onClick={() => handleTimeSelect(slot, index)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}