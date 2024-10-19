import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AuthStackScreenProps, goBack } from "app/navigators"
import { Button, Header, Screen, Text, TextField } from "app/components"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { useForgotPassword } from "app/hooks/useForgotPassword"

interface ConfirmEmailScreenProps extends AuthStackScreenProps<"ConfirmEmail"> {}

export const ConfirmEmailScreen: FC<ConfirmEmailScreenProps> = observer(
  function ConfirmEmailScreen() {
    const { userStore } = useStores()
    const { email } = userStore
    const { error, handleEmailChange, focusPasswordInput, handleConfirmEmail } = useForgotPassword()

    return (
      <Screen style={$root} preset="auto">
        <Header
          backgroundColor={colors.background.primary}
          leftIcon="caretLeft"
          leftIconColor={colors.content.secondary}
          onLeftPress={goBack}
        />
        <Text text="Confirm Email" style={$heading} preset="heading" />
        <TextField
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          helper={error.email}
          keyboardType="email-address"
          onChangeText={handleEmailChange}
          onSubmitEditing={focusPasswordInput}
          label="Email Address / Phone no."
          placeholder="Enter Email Address / Phone no."
          status={error.email ? "error" : undefined}
          value={email}
        />

        <Button onPress={handleConfirmEmail} style={$button} text="Send Otp" />
        <View style={$footer}>
          <Text style={$helperText} text="Don't have an account?" preset="formHelper" />
          <Text style={$helperTextLink} text="Sign Up" />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  backgroundColor: colors.background.primary,
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $button: ViewStyle = {
  marginTop: spacing.xl,
  marginBottom: spacing.md,
}

const $footer: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  gap: spacing.xxs,
  justifyContent: "center",
}

const $heading: TextStyle = {
  marginVertical: 10,
}

const $helperText: TextStyle = {
  color: colors.content.secondary,
}

const $helperTextLink: TextStyle = {
  color: colors.content.brand,
}
