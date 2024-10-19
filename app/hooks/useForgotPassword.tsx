import React, { useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TouchableOpacity } from "react-native"
import { useStores } from "app/models"
import { HIT_SLOP_5, RouteName } from "app/constants"
import { Icon, TextFieldAccessoryProps } from "app/components"
import { colors } from "app/theme"
import { useNavigation } from "@react-navigation/native"

export function useForgotPassword() {
  const { userStore } = useStores()
  const { sendOtp, setEmail, email, validationEmail } = userStore
  const navigation = useNavigation<any>()
  const [error, setError] = useState({
    email: "",
  })

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const authPasswordInput = useRef<TextInput>(null)

  const focusPasswordInput = () => authPasswordInput.current?.focus()

  const togglePasswordVisibility = () => {
    setIsAuthPasswordHidden(!isAuthPasswordHidden)
  }

  const handleEmailChange = (text: string) => {
    setEmail(text)
    if (error.email) {
      setError((prevError) => ({ ...prevError, email: "" }))
    }
  }

  // const handlePasswordChange = (text: string) => {
  //   setPassword(text)
  //   if (error.password) {
  //     setError((prevError) => ({ ...prevError, password: "" }))
  //   }
  // }

  const validateEmailAddress = () => {
    const emailError = validationEmail
    const newErrors = { email: emailError }

    setError((prevError) => ({ ...prevError, ...newErrors }))

    return !Object.values(newErrors).some((error) => error)
  }

  const handleConfirmEmail = async () => {
    const isEmailAddress = validateEmailAddress()

    if (!isEmailAddress) return

    await sendOtp()
    navigation.navigate(RouteName.VerifyOtp)
  }

  const PasswordRightAccessory: React.ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={HIT_SLOP_5}
            onPress={togglePasswordVisibility}
            style={props.style}
          >
            <Icon
              icon={isAuthPasswordHidden ? "view" : "hidden"}
              color={colors.border.default}
              size={20}
            />
          </TouchableOpacity>
        )
      },
    [isAuthPasswordHidden],
  )

  useEffect(() => {
    if (__DEV__) {
      setEmail("testuser@example.com")
    }
    // TODO: This can be done in the login function [Good UX] maintenance
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    // setEmail("test@gmail.red")
    // setPassword("123456")
  }, [])

  return {
    authPasswordInput,
    email,
    error,
    focusPasswordInput,
    handleEmailChange,
    handleConfirmEmail,
    isAuthPasswordHidden,
    PasswordRightAccessory,
  }
}
