import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Platform, StyleSheet, View } from "react-native"
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"

import { AuthStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { AUTO_COMPLETE_MAP, CELL_COUNT, RESEND_TIME, RouteName } from "app/constants"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"

interface VerifyOtpScreenProps extends AuthStackScreenProps<"VerifyOtp"> {}

export const VerifyOtpScreen: FC<VerifyOtpScreenProps> = observer(function VerifyOtpScreen() {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>("")
  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT })
  const [clearByFocusCellProperties, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  })
  const [resendOtpTimer, setResendOtpTimer] = useState<number>(RESEND_TIME)
  const navigation = useNavigation<any>()
  useEffect(() => {
    if (resendOtpTimer > 0) {
      setTimeout(() => {
        setResendOtpTimer((prev) => prev - 1)
      }, 1000)
    }
  }, [resendOtpTimer])

  const submitOtp = async (value: string) => {
    if (isSubmitLoading) {
      return
    }

    setIsSubmitLoading(true)
    setTimeout(() => {
      setIsSubmitLoading(false)

      // Prevent user from going back to previous screens after navigating to 'CreateProfile'
      // navigation.navigate(RouteName.Welcome)
      navigation.navigate(RouteName.ChangePassword)
    }, 3000)
  }

  const resendOtp = async () => {
    setIsResendLoading(true)
    setOtp("")

    setTimeout(() => {
      setIsResendLoading(false)
      setResendOtpTimer(RESEND_TIME)
    }, 3000)
  }

  const getResendOtpText = () => {
    if (isSubmitLoading) return "Verifying Otp..."
    if (isResendLoading) return "Sending Otp..."
    return `Resend Otp ${resendOtpTimer > 0 ? `in ${resendOtpTimer}s` : ""}`
  }

  return (
    <Screen style={styles.container} preset="auto">
      <View style={styles.OTPSection}>
        <View style={styles.OTPForm}>
          <Text style={styles.title}>Confirm it's you</Text>
          <Text style={styles.paragraph}>Enter OTP sent to</Text>
          <CodeField
            ref={ref}
            {...clearByFocusCellProperties}
            value={otp}
            onChangeText={(value) => {
              setOtp(value)
              if (value.length === CELL_COUNT) {
                submitOtp(value)
              }
            }}
            cellCount={CELL_COUNT}
            autoFocus={true}
            editable={!isResendLoading && !isSubmitLoading}
            keyboardType="numeric"
            textContentType="oneTimeCode"
            autoComplete={Platform.select(AUTO_COMPLETE_MAP)}
            rootStyle={styles.OTPRoot}
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[
                  { ...styles.OTPCellView, borderColor: colors.background.secondary },
                  isFocused && { borderColor: colors.background.brand },
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={{ ...styles.OTPCellText, color: colors.background.secondary }}>
                  {symbol === "" ? "•" : symbol}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.resendSection}>
          <Text
            onPress={resendOtp}
            // loading={isResendLoading || isSubmitLoading}
            disabled={resendOtpTimer > 0 || isResendLoading || isSubmitLoading}
          >
            {getResendOtpText()}
          </Text>
        </View>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.xxxl,
  },
  keyboardAvoidingContainer: {},
  OTPSection: {},
  OTPForm: {
    alignItems: "center",
  },
  title: {
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 8,
  },
  OTPRoot: {
    marginTop: 20,
    marginBottom: 20,
    gap: 8,
  },
  OTPCellView: {
    width: "15%",
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#00000030",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  OTPCellText: {
    fontSize: spacing.md,
  },
  resendSection: {
    alignItems: "center",
  },
  verifySection: {
    flex: 1,
    justifyContent: "flex-end",
  },
  verifyButton: {
    borderRadius: 4,
    paddingVertical: 5,
  },
})
