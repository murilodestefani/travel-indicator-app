import { View, Text, ImageBackground } from 'react-native';

export default function Home() {
	return (
		<View className='flex-1'>
			<ImageBackground
				source={require('../assets/paisagem.jpg')}
				className='flex-1 p-8'
			>
				<View className='flex-1 justify-end'>
					<View>
						<Text className='text-slate-50 text-xs tracking-widest text-center uppercase'>Meu App</Text>
						<Text className='text-slate-50 text-3xl font-bold tracking-tighter text-center uppercase'>Travel Indicator</Text>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}
