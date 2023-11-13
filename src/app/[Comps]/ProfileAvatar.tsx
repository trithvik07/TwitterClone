import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import placeholder from "../../../public/placeholder.png"
const ProfileAvatar = ({ image }: { image: string | null }) => {
  return (
    <Avatar>
      <AvatarImage src={image || placeholder} alt="profile" />
      <AvatarFallback>DP</AvatarFallback>
    </Avatar>
  )
}

export default ProfileAvatar