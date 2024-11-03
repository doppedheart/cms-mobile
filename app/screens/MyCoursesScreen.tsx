import React, { FC, useRef } from "react"
import { observer } from "mobx-react-lite"
import { Animated, TextStyle, View, ViewStyle } from "react-native"
import {
  CourseCard,
  ListView,
  ListViewProps,
  ListViewRef,
  Screen,
  Text,
  TextField,
} from "app/components"
import { colors, spacing, typography } from "app/theme"
import { TabScreenProps } from "app/navigators"

interface MyCoursesScreenProps extends TabScreenProps<"MyCourses"> {}

interface ListItem {
  type: "header" | "course" | "searchBar"
}

const renderSeparator = () => {
  return <View style={$separator} />
}

export const MyCoursesScreen: FC<MyCoursesScreenProps> = observer(function MyCoursesScreen() {
  // const { userStore } = useStores()
  const scrollY = useRef(new Animated.Value(0)).current
  const listRef = useRef<ListViewRef<ListItem>>(null)
  const username: string | undefined = undefined

  const renderItem: ListViewProps<ListItem>["renderItem"] = ({ item, index }) => {
    if (index === 0) {
      return (
        <View>
          {/* Add user avatar here */}
          <Text preset="subheading" style={$greeting} text={`Hi, ${username ?? "Hustler"}`} />
          <Text preset="heading" style={$heading} text="My Courses" />
        </View>
      )
    } else if (index === 1) {
      return (
        <View style={$searchBoxContainer}>
          <TextField
            inputWrapperStyle={$searchBox}
            style={$searchBarWrapper}
            placeholder="Search videos..."
          />
        </View>
      )
    } else {
      return <CourseCard />
    }
  }

  const data: ListItem[] = [
    { type: "header" },
    { type: "searchBar" },
    ...Array(5).fill({ type: "course" }),
  ]

  return (
    <Screen contentContainerStyle={$root} safeAreaEdges={["top"]}>
      <ListView
        ref={listRef}
        contentContainerStyle={$listContainer}
        data={data}
        estimatedItemSize={100}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => item.type + index.toString()}
      />
    </Screen>
  )
})
const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $greeting: TextStyle = {
  fontFamily: typography.primary.bold,
}

const $heading: TextStyle = {
  marginTop: spacing.md,
}

const $listContainer: ViewStyle = {
  paddingVertical: spacing.md,
}

const $separator: ViewStyle = {
  marginVertical: spacing.xs,
}

const $searchBarWrapper: ViewStyle = {
  backgroundColor: colors.background.primary,
}

const $searchBox: ViewStyle = {
  backgroundColor: colors.background.primary,
  marginVertical: spacing.xs,
}

const $searchBoxContainer: ViewStyle = {
  backgroundColor: colors.background.primary,
}
