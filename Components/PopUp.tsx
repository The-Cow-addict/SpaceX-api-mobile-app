import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

interface OnboardingScreenProps {
    setShowOnboarding: (show: boolean) => void;
  }
  
  const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ setShowOnboarding }) => {
    const handleOnboardingComplete = () => {
      setShowOnboarding(false);
    };

  return (
    <View>
      <Text>Welcome to the App!</Text>
      <TouchableOpacity onPress={handleOnboardingComplete}>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const checkOnboardingCompleted = async () => {
      try {
        // Retrieve the onboarding completion status from persistent storage
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted'
        );

        if (onboardingCompleted) {
          setShowOnboarding(false);
        }
      } catch (error) {
        console.log('AsyncStorage error:', error);
      }
    };

    checkOnboardingCompleted();
  }, []);

  return (
    <View>
      {/* Your main app content */}
      <Text>Main App Content</Text>
      {/* Conditionally render the onboarding screen */}
      {showOnboarding && (
        <OnboardingScreen setShowOnboarding={setShowOnboarding} />
      )}
    </View>
  );
};

export default App;
