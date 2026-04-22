import "./global.css";
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Text as SvgText } from 'react-native-svg';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Inter_900Black_Italic } from '@expo-google-fonts/inter';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withRepeat, 
  withTiming, 
  Easing,
  interpolate
} from 'react-native-reanimated';

const AnimatedStop = Animated.createAnimatedComponent(Stop);
const AnimatedLinearGradient = Animated.createAnimatedComponent(SvgGradient);

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

const FadeView = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[{ flex: 1, opacity: fadeAnim }, style]}>
      {children}
    </Animated.View>
  );
};

const OnboardingScreen = ({ onJoin }) => (
  <View className="flex-1 px-6 justify-between pb-10 pt-4">
    {/* Top Logo Section */}
    <View className="items-center mt-2">
      <Image
        source={require('./assets/Vector.svg')}
        style={{ width: 60, height: 40 }}
        contentFit="contain"
      />
    </View>

    {/* Middle space is now empty */}
    <View className="flex-1" />

    {/* Bottom Content Group */}
    <View>
      {/* Text Section */}
      <View className="items-center mb-8">
        <Text className="text-[28px] font-bold text-center leading-[38px] text-[#111]">
          Others ask you to call,{"\n"}We let you <Text className="text-[#FF0080]">BOOK</Text>
        </Text>



        <Text className="text-[#666] text-base mt-4 font-medium">
          Stop calling. Start booking.
        </Text>
      </View>

      {/* Bottom Button */}
      <View className="items-center w-full mb-2">
        <TouchableOpacity
          onPress={onJoin}
          activeOpacity={0.9}
          className="bg-[#FF0080] h-[54px] rounded-[18px] items-center justify-center w-full shadow-lg"
          style={{ shadowColor: '#FF0080', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 }}
        >
          <Text className="text-white font-bold text-lg">Join with us</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const LoginScreen = ({ onContinue }) => {
  const [phone, setPhone] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View className="flex-1 px-6 pt-10">
          <Text className="text-[26px] font-bold text-[#111] leading-[36px] mb-2">
            This is where your Special <Text className="text-[#FF0080]">Moments</Text> begin
          </Text>

          <Text className="text-[#999] text-base mb-10 leading-[22px]">
            We're excited to be part of your special moments.
          </Text>

          <View>
            <Text className="text-[#111] text-base font-bold mb-3">Mobile Number</Text>

            <View className="flex-row items-center h-[46px]">
              {/* Country Code */}
              <View
                style={{
                  width: 60,
                  height: 46,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                  borderRadius: 12,
                  marginRight: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#111' }}>+91</Text>
              </View>

              {/* Number Input */}
              <View
                style={{
                  flex: 1,
                  height: 46,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#FF0080',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16
                }}
              >
                <TextInput
                  placeholder="Enter"
                  placeholderTextColor="#BBB"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                  keyboardType="number-pad"
                  autoFocus={true}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#111',
                    padding: 0,
                    margin: 0,
                    height: '100%'
                  }}
                />
              </View>
            </View>
          </View>

          <View className="flex-1 justify-end pb-16">
            <Text className="text-center text-[#BBB] text-[11px] mb-4 leading-[16px] px-6">
              By clicking continue, you agree to our{" "}
              <Text className="text-[#007AFF] font-medium">T&C</Text> and{" "}
              <Text className="text-[#007AFF] font-medium">Privacy Policy</Text>
            </Text>

            <View className="items-center w-full mb-4">
              <TouchableOpacity
                onPress={() => onContinue(phone)}
                activeOpacity={0.8}
                disabled={phone.length !== 10}
                className={`${phone.length === 10 ? 'bg-[#FF0080]' : 'bg-[#EAEAEA]'} h-[46px] rounded-[14px] items-center justify-center w-full`}
              >
                <Text className={`${phone.length === 10 ? 'text-white' : 'text-[#A1A1A1]'} font-bold text-base`}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const OTPScreen = ({ phone, onBack, onContinue }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Go back to previous input on backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit.length === 1);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View className="flex-1 px-6 pt-4">
          {/* Back Button */}
          <TouchableOpacity onPress={onBack} className="flex-row items-center mb-10">
            <View style={{ transform: [{ rotate: '45deg' }], borderLeftWidth: 3, borderBottomWidth: 3, borderColor: '#FF0080', width: 12, height: 12, marginRight: 12 }} />
            <Text className="text-[#666] text-lg font-medium">Back</Text>
          </TouchableOpacity>

          <Text className="text-[26px] font-bold text-[#111] leading-[36px] mb-2">
            OTP Sent Successfully
          </Text>

          <Text className="text-[#999] text-base mb-10 leading-[22px]">
            We've sent your OTP to <Text className="text-[#007AFF] font-bold">+91 {phone}</Text>
          </Text>

          <Text className="text-[#111] text-base font-bold mb-4">OTP</Text>

          {/* OTP Input Row */}
          <View className="flex-row justify-between mb-8">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <View
                key={index}
                style={{
                  width: 46,
                  height: 46,
                  borderWidth: 1.5,
                  borderColor: otp[index] ? '#FF0080' : '#E5E5E5',
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white'
                }}
              >
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  maxLength={1}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  autoComplete="one-time-code"
                  autoFocus={index === 0}
                  value={otp[index]}
                  onChangeText={(val) => handleOtpChange(val, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#FF0080',
                    textAlign: 'center',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </View>
            ))}
          </View>

          <View className="flex-row items-center mb-10">
            <Text className="text-[#999] text-[15px]">Didn't receive? </Text>
            {timer > 0 ? (
              <Text className="text-[#999] text-[15px] font-bold">0:{timer < 10 ? `0${timer}` : timer}</Text>
            ) : (
              <TouchableOpacity onPress={() => setTimer(59)}>
                <Text className="text-[#007AFF] font-bold text-[15px]">Send Again</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-1 justify-end pb-16">
            <TouchableOpacity
              onPress={onContinue}
              activeOpacity={0.8}
              disabled={!isOtpComplete}
              className={`${isOtpComplete ? 'bg-[#FF0080]' : 'bg-[#EAEAEA]'} h-[54px] rounded-[18px] items-center justify-center w-full`}
            >
              <Text className={`${isOtpComplete ? 'text-white' : 'text-[#A1A1A1]'} font-bold text-lg`}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const AnimatedSearchBar = () => {
  const placeholders = [
    "Search for birthday cakes",
    "Find photographers near you",
    "Book decorators for events",
    "Plan your perfect wedding"
  ];

  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      // Slide up: 0 -> -30
      Animated.timing(scrollAnim, {
        toValue: -30,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Reset to bottom: 30
        setIndex((prev) => (prev + 1) % placeholders.length);
        scrollAnim.setValue(30);
        // Slide into center: 30 -> 0
        Animated.timing(scrollAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 2500); // 2000ms delay + 500ms animation

    return () => clearInterval(timer);
  }, [index]);

  return (
    <View
      className={`bg-white h-14 rounded-2xl flex-row items-center px-4 border ${isFocused ? 'border-[#FF0080]' : 'border-[#F0F0F0]'}`}
      style={isFocused ? { shadowColor: '#FF0080', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 } : {}}
    >
      <View className="mr-3">
        <Svg width="20" height="20" viewBox="0 0 24 24">
          <Path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            fill={isFocused ? "#FF0080" : "#AAA"}
          />
        </Svg>
      </View>

      <View className="flex-1 justify-center overflow-hidden h-full">
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="text-base text-[#111] h-full z-10"
          placeholder=""
        />
        {!isFocused && (
          <Animated.View
            pointerEvents="none"
            className="absolute left-0 right-0"
            style={{
              opacity: scrollAnim.interpolate({
                inputRange: [-30, 0, 30],
                outputRange: [0, 1, 0]
              }),
              transform: [{ translateY: scrollAnim }]
            }}
          >
            <Text className="text-[#AAA] text-base">{placeholders[index]}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const BottomNav = ({ activeTab, onTabChange }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row bg-white pt-3 px-6"
      style={{
        paddingBottom: Math.max(insets.bottom, 8),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => onTabChange('home')}
        className="flex-1 items-center justify-center"
        activeOpacity={0.7}
      >
        <Image
          source={require('./assets/Vector.svg')}
          style={{ width: 22, height: 14, tintColor: activeTab === 'home' ? '#FF0080' : '#888' }}
          contentFit="contain"
        />
        <Text className={`text-[10px] font-bold mt-1 ${activeTab === 'home' ? 'text-[#FF0080]' : 'text-[#888]'}`}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabChange('bookings')}
        className="flex-1 items-center justify-center"
        activeOpacity={0.7}
      >
        <View className="mb-0.5">
          <Svg width="20" height="20" viewBox="0 0 24 24">
            <Path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
              fill={activeTab === 'bookings' ? '#FF0080' : '#888'}
            />
            <Path
              d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"
              fill={activeTab === 'bookings' ? '#FF0080' : '#888'}
            />
          </Svg>
        </View>
        <Text className={`text-[10px] font-bold ${activeTab === 'bookings' ? 'text-[#FF0080]' : 'text-[#888]'}`}>
          Bookings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ShiningText = ({ text }) => {
  const translateX = useSharedValue(-1);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(2, { duration: 2500, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      x1: `${translateX.value * 100}%`,
      x2: `${(translateX.value + 1) * 100}%`,
    };
  });

  return (
    <Svg height="30" width="280">
      <Defs>
        <AnimatedLinearGradient id="shine" y1="0" y2="0" animatedProps={animatedProps}>
          <Stop offset="0" stopColor="#DDD" stopOpacity="1" />
          <Stop offset="0.5" stopColor="#FFF" stopOpacity="1" />
          <Stop offset="1" stopColor="#DDD" stopOpacity="1" />
        </AnimatedLinearGradient>
      </Defs>
      <SvgText
        fill="url(#shine)"
        fontSize="18"
        fontFamily="Inter_900Black_Italic"
        fontStyle="italic"
        fontWeight="bold"
        x="50%"
        y="22"
        textAnchor="middle"
        letterSpacing="4"
      >
        {text}
      </SvgText>
    </Svg>
  );
};

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View className="flex-1 bg-white">
      {activeTab === 'home' ? (
        <View className="flex-1">
          {/* Header Section */}
          <View
            className="bg-[#F5F5F5] px-6 pt-2 rounded-b-[0px]"
            style={{ height: Dimensions.get('window').height * 0.34 }}
          >
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <View className="flex-row items-center mb-2">
                  <View className="mr-2">
                    <Svg width="20" height="20" viewBox="0 0 24 24">
                      <Path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
                        fill="#FF0080"
                      />
                    </Svg>
                  </View>
                  <Text className="text-xl font-bold text-[#111]">Home</Text>
                </View>
                <View className="flex-row items-center">
                  <Text
                    className="text-[#888] text-[13px] mr-1"
                    numberOfLines={1}
                    style={{ maxWidth: width * 0.6 }}
                  >
                    12/34-AB, South India SH, Diamond Hills, Lumbini Aven
                  </Text>
                  <View style={{ transform: [{ rotate: '45deg' }], borderRightWidth: 1.5, borderBottomWidth: 1.5, borderColor: '#888', width: 6, height: 6, marginTop: -2 }} />
                </View>
              </View>

              {/* Profile Circle */}
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center border border-[#EEE]">
                <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                  <Svg width="24" height="24" viewBox="0 0 24 24">
                    <Path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      fill="#FF0080"
                    />
                  </Svg>
                </View>
              </View>
            </View>

            {/* Search Bar */}
            <AnimatedSearchBar />
          </View>

          <View className="items-center py-4">
            <Svg height="50" width="100%">
              <Defs>
                <SvgGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
                  <Stop offset="0" stopColor="#4983F6" stopOpacity="1" />
                  <Stop offset="0.5" stopColor="#C175F5" stopOpacity="1" />
                  <Stop offset="1" stopColor="#FC2E6C" stopOpacity="1" />
                </SvgGradient>
              </Defs>
              <SvgText
                fill="url(#grad)"
                fontSize="22"
                fontFamily="Markova"
                fontWeight="900"
                x="50%"
                y="35"
                textAnchor="middle"
                letterSpacing="-1"
              >
                EVERYTHING AT 1 PLACE
              </SvgText>
            </Svg>
          </View>

          {/* Cards Section Row 1 */}
          <View className="px-4 flex-row justify-between mb-4" style={{ gap: 10 }}>
            {[
              { id: 1, name: 'Carter', img: require('./assets/Carters.png'), comingSoon: false },
              { id: 2, name: 'Makeup', img: require('./assets/Makeup.png'), comingSoon: true },
              { id: 3, name: 'Mehendi', img: require('./assets/Mehendi.png'), comingSoon: true }
            ].map((item) => (
              <View
                key={item.id}
                className="flex-1 aspect-[0.75] bg-white rounded-3xl border border-[#F0F0F0] overflow-hidden"
              >
                <View className="flex-1">
                  <Image
                    source={item.img}
                    style={{ width: '100%', height: '100%', opacity: item.comingSoon ? 0.6 : 1 }}
                    contentFit="cover"
                  />
                  {item.comingSoon && (
                    <View
                      className="absolute top-0 right-0 bg-[#F0F0F0] px-3 py-1.5 rounded-bl-[18px] z-10"
                    >
                      <Text className="text-[8px] font-bold text-[#666]">More Coming Soon</Text>
                    </View>
                  )}
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', justifyContent: 'flex-end', padding: 12, zIndex: 2 }}
                  >
                    <Text className="text-white font-bold text-[13px]">
                      {item.name}
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            ))}
          </View>

          {/* Cards Section Row 2 */}
          <View className="px-4 flex-row justify-between mb-9" style={{ gap: 10 }}>
            {[
              { id: 4, name: 'Decor', img: require('./assets/Decore.png'), comingSoon: true },
              { id: 5, name: 'private Theater', img: require('./assets/Private Theatre.png'), comingSoon: true }
            ].map((item) => (
              <View
                key={item.id}
                className="flex-1 aspect-[0.75] bg-white rounded-3xl border border-[#F0F0F0] overflow-hidden"
              >
                <View className="flex-1">
                  <Image
                    source={item.img}
                    style={{ width: '100%', height: '100%', opacity: item.comingSoon ? 0.6 : 1 }}
                    contentFit="cover"
                  />
                  {item.comingSoon && (
                    <View
                      className="absolute top-0 right-0 bg-[#F0F0F0] px-3 py-1.5 rounded-bl-[18px] z-10"
                    >
                      <Text className="text-[8px] font-bold text-[#666]">Coming Soon</Text>
                    </View>
                  )}
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', justifyContent: 'flex-end', padding: 12, zIndex: 2 }}
                  >
                    <Text className="text-white font-bold text-[13px]">
                      {item.name}
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            ))}
            {/* Empty spacer to keep cards same size as 3-column row above */}
            <View className="flex-1" />
          </View>

          {/* Coming Soon Text Below Cards */}
          <View className="items-center mb-10">
            <ShiningText text="MORE COMING SOON" />
            <View className="w-12 h-1 bg-[#F0F0F0] rounded-full mt-3" />
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-[#111] text-xl font-bold">Bookings Screen</Text>
          <Text className="text-[#888] mt-2">Manage your events here</Text>
        </View>
      )}

    </View>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Markova': require('./assets/markova-font/markova.ttf'),
    Inter_900Black_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [phone, setPhone] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const handleLoginContinue = (number) => {
    setPhone(number);
    setCurrentScreen('otp');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: currentScreen === 'home' ? '#F5F5F5' : 'white' }}
        edges={['top', 'left', 'right']}
      >
        <StatusBar barStyle="dark-content" />
        {currentScreen === 'onboarding' ? (
          <FadeView key="onboarding">
            <OnboardingScreen onJoin={() => setCurrentScreen('login')} />
          </FadeView>
        ) : currentScreen === 'login' ? (
          <FadeView key="login">
            <LoginScreen onContinue={handleLoginContinue} />
          </FadeView>
        ) : currentScreen === 'otp' ? (
          <FadeView key="otp">
            <OTPScreen
              phone={phone}
              onBack={() => setCurrentScreen('login')}
              onContinue={() => setCurrentScreen('home')}
            />
          </FadeView>
        ) : (
          <FadeView key="home">
            <HomeScreen />
          </FadeView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

