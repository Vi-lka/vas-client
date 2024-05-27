import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
    <main className="container mx-auto pt-28 flex items-center justify-center">
        <UserProfile path="/account" />
    </main>
);
  
export default UserProfilePage;