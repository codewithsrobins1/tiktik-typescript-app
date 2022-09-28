import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import { VideoCard } from '../../components/VideoCard';
import { NoResults } from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';
import { searchPostsQuery } from '../../utils/queries';

const Search = ({ videos }: { videos: Video[] }) => {
	const [isAccounts, setIsAccounts] = useState(false);
	const router = useRouter();
	const { searchTerm }: any = router.query;
	const { allUsers } = useAuthStore();
	const searchAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm));

	const accountStyles = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
	const videoStyles = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

	return (
		<div className="w-full">
			<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
				<p onClick={() => setIsAccounts(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${accountStyles}`}>Accounts</p>
				<p onClick={() => setIsAccounts(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${videoStyles}`}>Videos</p>
			</div>

			{isAccounts ? (
				<div className="md:mt-16">
					{searchAccounts.length > 0 ? (
						searchAccounts.map((user: IUser, idx: number) => (
							<Link href={`/profile/${user._id}`} key={idx}>
								<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
									<div>
									<Image
										src={user.image}
										width={50}
										height={50}
										className="rounded-full cursor-pointer"
										alt="user profile"
									/>
									</div>
									<div className="hidden md:block">
										<p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
											{user.userName.replaceAll(' ', '')}
											<GoVerified className="text-blue-400" />
										</p>
										<p className="capitalize text-gray-400 text-xs">
											{user.userName}
										</p>
									</div>
                      			</div>
                    		</Link>
						))
					): <NoResults text="No account exists" />
					}
				</div>
			) : <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
				{videos.length ? (
					videos.map((video: Video, idx) => (
						<VideoCard post={video} key={idx} />
					))
				):
					<NoResults text={`No video results for ${searchTerm}`} />
				}
			</div>
			}
		</div>
	)
}

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
	const response = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
	return {
		props: {
			videos: response.data
		}
	}
}

export default Search