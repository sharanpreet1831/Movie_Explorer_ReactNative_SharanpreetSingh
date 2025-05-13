import React from 'react'
// import BottomTabNavigation from './src/navigation/BottomTabNavigation'
// import SignUp from './src/Screen/SignUp'
// import Login_SignUp from './src/Screen/Login_SignUp'
import StackNavigation from './src/navigation/StackNavigation'
// import AddMovie from './src/Screen/AddMovie'
// import MovieEdit from './src/Component/MovieEdit'
import { StripeProvider } from '@stripe/stripe-react-native'

const App = () => {
  return (
   <StackNavigation  />
    
  );
};

export default App;

