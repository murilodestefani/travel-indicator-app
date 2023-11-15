import { View, Text, ImageBackground, Image } from 'react-native';

export function Home() {
	return (
		<View className='flex-1'>
			<ImageBackground
				source={require('../assets/paisagem.jpg')}
				className='flex-1'
			>
				<View className='flex-1 justify-between'>
					<View className='items-center mt-4'>
						<Image
							source={require('../assets/Travel-Indicator.png')}
							style={{
								width: '70%',
								height: '50%',
								resizeMode: 'contain',
							}}
						/>
						<Text className='text-slate-50 text-[9px] font-bold -mt-4'>
							Developed by Murilo Destefani
						</Text>
					</View>
					<View className='flex-row justify-between items-end w-screen p-8'>
						<View>
							<Text className='text-slate-50 text-xs text-start italic font-bold'>
								Desenvolvimento e Aplicações
							</Text>
							<Text className='text-slate-50 text-xs text-start italic font-bold'>
								para Dispositivos Móveis
							</Text>
						</View>

						<Text className='text-slate-50 text-xs text-end italic font-bold'>
							Prof. Renato Garcia
						</Text>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}
