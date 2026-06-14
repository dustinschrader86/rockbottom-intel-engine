<Stack.Navigator
  initialRouteName="Home"
  screenOptions={{
    headerShown: false,
  }}
>

  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Scan" component={ScanScreen} />
  <Stack.Screen name="Analysis" component={AnalysisScreen} />
  <Stack.Screen name="Results" component={ResultsScreen} />
  <Stack.Screen name="Dashboard" component={DashboardScreen} />
  <Stack.Screen name="Settings" component={SettingsScreen} />
  <Stack.Screen name="BlackNode" component={J3TM1BBlackNodeScreen} />

</Stack.Navigator>
