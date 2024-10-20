import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AuthStackScreenProps, goBack } from "app/navigators"
import { Button, Header, Screen, Text, TextField } from "app/components"
import { colors, spacing } from "app/theme"
import { useForgotPassword } from "app/hooks/useForgotPassword"

interface ChangePasswordScreenProps extends AuthStackScreenProps<"ChangePassword"> {}

export const ChangePasswordScreen: FC<ChangePasswordScreenProps> = observer(
  function ChangePasswordScreen() {
    const {
      error,
      password,
      confirmPassword,
      handlePasswordChange,
      handleSubmitChangePassword,
      handleConfirmPasswordChange,
      authPasswordInput,
      PasswordRightAccessory,
      isAuthPasswordHidden,
    } = useForgotPassword()

    return (
      <Screen style={$root} preset="scroll">
        <Header
          backgroundColor={colors.background.primary}
          leftIcon="caretLeft"
          leftIconColor={colors.content.secondary}
          onLeftPress={goBack}
        />
        <Text text="Change Password" preset="heading" />
        <Text
          style={$subheading}
          text="Create a new secure password consisting of alpha numeric characters"
        />
        <TextField
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          helper={error.password}
          onChangeText={handlePasswordChange}
          onSubmitEditing={handleSubmitChangePassword}
          label="Password"
          placeholder="Enter Password"
          ref={authPasswordInput}
          RightAccessory={PasswordRightAccessory}
          secureTextEntry={isAuthPasswordHidden}
          status={error.password ? "error" : undefined}
          value={password}
          containerStyle={$passwordFieldContainer}
        />
        <TextField
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          helper={error.confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          onSubmitEditing={handleSubmitChangePassword}
          label="Confirm Password"
          placeholder="Re-Enter Password"
          ref={authPasswordInput}
          RightAccessory={PasswordRightAccessory}
          secureTextEntry={isAuthPasswordHidden}
          status={error.confirmPassword ? "error" : undefined}
          value={confirmPassword}
          containerStyle={$passwordFieldContainer}
        />
        <Button onPress={handleSubmitChangePassword} style={$button} text="Submit" />
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

const $subheading: TextStyle = {
  color: colors.content.secondary,
  marginBottom: spacing.md,
  marginTop: spacing.xxs,
}

const $passwordFieldContainer: ViewStyle = {
  marginTop: spacing.md,
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

const $helperText: TextStyle = {
  color: colors.content.secondary,
}

const $helperTextLink: TextStyle = {
  color: colors.content.brand,
}
