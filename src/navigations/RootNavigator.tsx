import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AnySvg, type IconName } from '@components/AnySvg';
import { colors } from '@theme/colors';
import { fontFamily, fontSize } from '@theme/fonts';
import { mvs } from '@theme/responsive';
import { AnimatedTabBarButton } from './components/AnimatedTabBarButton';
import PracticeDetail from '@screens/Main/PracticeDetail';
import PracticesList from '@screens/Main/PracticesList';
import Summary from '@screens/Main/Summary';
import type { PracticesStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const PracticesStack = createNativeStackNavigator<PracticesStackParamList>();

const tabIcon = (name: IconName) =>
  ({ color, size }: { color: string; size: number }) => (
    <AnySvg name={name} size={size} color={color} />
  );

const PracticesNavigator = () => (
  <PracticesStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.SURFACE },
      headerTitleStyle: {
        color: colors.TEXT_PRIMARY,
        fontFamily: fontFamily.MONTSERRAT_SEMIBOLD,
        fontSize: fontSize.FONT_16,
      },
      headerTintColor: colors.PRIMARY,
    }}
  >
    <PracticesStack.Screen
      name="PracticesList"
      component={PracticesList}
      options={{ title: 'Daily Practices' }}
    />
    <PracticesStack.Screen
      name="PracticeDetail"
      component={PracticeDetail}
      options={({ route }) => ({ title: route.params.title })}
    />
  </PracticesStack.Navigator>
);

export const RootNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.PRIMARY,
      tabBarInactiveTintColor: colors.TEXT_SECONDARY,
      tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
      tabBarLabelStyle: {
        fontFamily: fontFamily.MEDIUM,
        fontSize: fontSize.FONT_12,
      },
      tabBarStyle: {
        backgroundColor: colors.SURFACE,
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: mvs(84),
        paddingTop: mvs(6),
      },
    }}
  >
    <Tab.Screen
      name="PracticesTab"
      component={PracticesNavigator}
      options={{ title: 'Practices', tabBarIcon: tabIcon('meditation') }}
    />
    <Tab.Screen
      name="SummaryTab"
      component={Summary}
      options={{ title: 'Summary', tabBarIcon: tabIcon('chart') }}
    />
  </Tab.Navigator>
);
