import ProfileCard from "@/components/ProfileCard"
export const metadata = {
  title: "Mennar App - Mi perfil"
};

const Profile = () => {
  return (
    <>
      <h1 className="text-white text-center text-2xl font-bold">MI PERFIL</h1>
      <ProfileCard />
    </>
  )
}

export default Profile