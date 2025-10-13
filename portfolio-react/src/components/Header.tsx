import { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { personalInfo } from '../constants';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const getIconColor = (name: string): string => {
	switch (name) {
		case 'Github':
			return '#333';
		case 'LinkedIn':
			return '#0077B5';
		case 'X':
			return '#000';
		default:
			return '#6B7280';
	}
};

const getWhatsAppLink = (phone: string): string => {
	const cleanNumber = phone
		.replace(/\s+/g, '')
		.replace(/[^\d+]/g, '');

	const message = encodeURIComponent(
		'¡Hola! Me interesa contactarte para un proyecto'
	);

	return `https://wa.me/${cleanNumber}?text=${message}`;
};

export const Header = () => {
	const {
		photoSrc,
		name,
		contactEmail,
		location,
		occupation,
		overview,
		phoneNumber,
		socialLinks,
	} = personalInfo;

	const [isActiveNotification, setIsActiveNotification] =
		useState(false);

	const handleContactClick = () => {
		navigator.clipboard.writeText(contactEmail);
		setIsActiveNotification(true);

		setTimeout(() => {
			setIsActiveNotification(false);
		}, 1500);
	};

	return (
		<>
			<div className='flex flex-col sm:flex-row gap-6 sm:gap-12'>
				{/* Foto */}
				<div className='self-center sm:self-start'>
					<img
						src={photoSrc}
						alt='Foto de Clark'
						className='size-36 sm:size-48 object-cover rounded-full shadow-lg'
					/>
				</div>

				{/* Información Personal */}
				<div className='flex flex-col gap-3 flex-1'>
					<h1 className='text-balance font-bold text-2xl sm:text-3xl'>
						{name}
					</h1>
					<p className='text-balance text-base sm:text-lg text-gray-600'>
						{occupation}
					</p>

					<div className='flex gap-10 items-center'>
						<div className='flex flex-col items-center'>
							<span className='font-bold text-xl sm:text-2xl'>
								15+
								
							</span>
							<span className='text-gray-600 text-sm sm:text-base'>
								Proyectos
							</span>
						</div>
						<div className='flex flex-col items-center'>
							<span className='font-bold text-xl sm:text-2xl'>
								8+
							</span>
							<span className='text-gray-600 text-sm sm:text-base'>
								Años Exp.
							</span>
						</div>
						<div className='flex flex-col items-center'>
							<span className='font-bold text-xl sm:text-2xl'>
								30+
							</span>
							<span className='text-gray-600 text-sm sm:text-base'>
								Tecnologías
							</span>
						</div>
					</div>

					<p className='text-balance text-gray-500 text-sm sm:text-base'>
						{overview}
					</p>

					<div className='flex items-center gap-3'>
						<IoLocationOutline size={22} />

						<span className='font-medium text-gray-600'>
							{location}
						</span>
					</div>

					<div className='flex items-center gap-8 mt-4'>
						{socialLinks.map(link => (
							<a
								href={link.url}
								key={link.id}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={link.name}
								title={link.name}
								style={{
									color: getIconColor(link.name),
								}}
							>
								{link.icon}
							</a>
						))}
					</div>

					<div className='flex gap-2 mt-4'>
						<a
							href={getWhatsAppLink(phoneNumber)}
							className='bg-black text-white rounded-md flex gap-1.5 items-center justify-center px-5 font-semibold'
							target='_blank'
							aria-label='Contactar por Whatsapp'
							title='Contactar por Whatsapp'
						>
							Contactar
							<FaWhatsapp size={22} />
						</a>

						<button
							className='bg-sky-500 p-3 rounded-md cursor-pointer'
							title='Copiar email'
							aria-label='Copiar email'
							onClick={handleContactClick}
						>
							<MdEmail className='text-white' size={22} />
						</button>
					</div>
				</div>
			</div>

			{isActiveNotification && (
				<div className='bg-green-500 rounded-md absolute bottom-4 right-4 p-3 shadow-lg transition-transform transform z-50'>
					<p className='text-white'>Email copiado</p>
				</div>
			)}
		</>
	);
};
