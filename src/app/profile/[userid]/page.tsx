export default function UserProfile({params}: any) {
    return (
        <div className="text-center text-3xl font-bold text-black bg-orange-500">
            {params.userid}
        </div>
    )
}