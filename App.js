import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Home } from './pages/Home';
import { Cadastro } from './pages/Cadastro';
import { Listagem } from './pages/Listagem';
import { Favoritos } from './pages/Favoritos';
import { createTables } from './lib/sqlite/queries';

createTables();

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Home') {
							iconName = focused ? 'ios-home' : 'ios-home-outline';
						} else if (route.name === 'Cadastro') {
							iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
						} else if (route.name === 'Listagem') {
							iconName = focused
								? 'ios-list-circle'
								: 'ios-list-circle-outline';
						} else if (route.name === 'Favoritos') {
							iconName = focused ? 'ios-heart' : 'ios-heart-outline';
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
				})}
			>
				<Tab.Screen name='Home' component={Home} />
				<Tab.Screen name='Cadastro' component={Cadastro} />
				<Tab.Screen name='Listagem' component={Listagem} />
				<Tab.Screen name='Favoritos' component={Favoritos} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
